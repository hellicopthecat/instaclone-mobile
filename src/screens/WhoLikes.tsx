import {Maybe, Query, User} from "@/__generated__/graphql";
import ScreenLayout from "@/components/ScreenLayout";
import UserRow from "@/components/UserRow";
import {StackNavMakerType} from "@/navigators/StackNavMaker";
import {gql, useQuery} from "@apollo/client";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useState} from "react";
import {FlatList, Text, View} from "react-native";
interface IWhoLikes {
  navigation: StackNavigationProp<StackNavMakerType, "WhoLikes">;
  route: RouteProp<StackNavMakerType, "WhoLikes">;
}
const SEE_WHO_LIKE_PHOTO_QUERY = gql`
  query seePhotoLikes($seePhotoLikesId: Int!) {
    seePhotoLikes(id: $seePhotoLikesId) {
      id
      avatar
      userName
      isMe
      isFollowing
    }
  }
`;
const WhoLikes: React.FC<IWhoLikes> = ({navigation, route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const {data, loading, refetch} = useQuery<Query>(SEE_WHO_LIKE_PHOTO_QUERY, {
    variables: {seePhotoLikesId: route.params.photoId},
    skip: !route.params.photoId,
  });
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const showWhoLikes = ({
    item,
  }: {
    item: Maybe<
      Pick<User, "id" | "avatar" | "userName" | "isMe" | "isFollowing">
    >;
  }) => {
    return (
      <UserRow
        id={item?.id as number}
        avatar={item?.avatar + ""}
        username={item?.userName + ""}
        isMe={item?.isMe as boolean}
        isFollowing={item?.isFollowing as boolean}
      />
    );
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        data={data?.seePhotoLikes}
        keyExtractor={(likes) => likes?.id + ""}
        renderItem={(likes) => showWhoLikes(likes)}
        refreshing={refreshing}
        onRefresh={refresh}
        ItemSeparatorComponent={() => (
          <View
            style={{borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,0.1)"}}
          />
        )}
      />
    </ScreenLayout>
  );
};
export default WhoLikes;
