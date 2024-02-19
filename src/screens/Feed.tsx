import {Maybe, Photo, Query, User} from "@/__generated__/graphql";
import PhotoComp from "@/components/Photo";
import ScreenLayout from "@/components/ScreenLayout";
import {COMMENT_FRAGMENT, PHOTO_FRAGMENT} from "@/fragments";
import {gql, useQuery} from "@apollo/client";
import {useState} from "react";
import {FlatList} from "react-native";
const FEED_QUERY = gql`
  query SeeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        avatar
        userName
      }
      comments {
        ...CommentFragment
      }
      hashtags {
        id
        hashtag
      }
    }
  }
  ${COMMENT_FRAGMENT}
  ${PHOTO_FRAGMENT}
`;
const Feed = () => {
  const {data, loading, refetch, fetchMore} = useQuery<Query>(FEED_QUERY, {
    variables: {offset: 0},
  });
  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const renderPhoto = ({
    item,
  }: {
    item: Maybe<
      Pick<Photo, "id" | "user" | "caption" | "file" | "isLiked" | "totalLikes">
    >;
  }) => {
    return (
      <PhotoComp
        id={item?.id as number}
        user={item?.user as User}
        caption={item?.caption as string}
        file={item?.file as string}
        isLiked={item?.isLiked as boolean}
        totalLikes={item?.totalLikes as number}
      />
    );
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{width: "100%"}}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={(feed) => feed?.id + ""}
        renderItem={(feed) => renderPhoto(feed)}
        refreshing={refreshing}
        onRefresh={refresh}
        onEndReached={() =>
          fetchMore({variables: {offset: data?.seeFeed?.length}})
        }
        onEndReachedThreshold={0.1}
      />
    </ScreenLayout>
  );
};
export default Feed;
