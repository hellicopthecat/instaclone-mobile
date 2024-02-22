import {Query, User} from "@/__generated__/graphql";
import PhotoComp from "@/components/Photo";
import ScreenLayout from "@/components/ScreenLayout";
import {COMMENT_FRAGMENT} from "@/fragments";
import {StackNavMakerType} from "@/navigators/StackNavMaker";
import {gql, useQuery} from "@apollo/client";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useState} from "react";
import {RefreshControl, ScrollView, Text, View} from "react-native";
interface IPhotoScreen {
  navigation: StackNavigationProp<StackNavMakerType, "PhotoScreen">;
  route: RouteProp<StackNavMakerType, "PhotoScreen">;
}
const SEE_PHOTO_QUERY = gql`
  query SeePhoto($seePhotoId: Int!) {
    seePhoto(id: $seePhotoId) {
      id
      caption
      file
      isLiked
      owner
      totalLikes
      totalComments
      createAt
      comments {
        ...CommentFragment
      }
      hashtags {
        hashtag
        id
      }
      user {
        id
        avatar
        userName
      }
    }
  }
  ${COMMENT_FRAGMENT}
`;

const PhotoScreen: React.FC<IPhotoScreen> = ({navigation, route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const {data, loading, refetch} = useQuery<Query>(SEE_PHOTO_QUERY, {
    variables: {
      seePhotoId: route?.params?.photoId as number,
    },
  });
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={refresh} refreshing={refreshing} />
        }
      >
        <PhotoComp
          id={data?.seePhoto?.id as number}
          user={data?.seePhoto?.user as User}
          caption={data?.seePhoto?.caption as string}
          file={data?.seePhoto?.file as string}
          isLiked={data?.seePhoto?.isLiked as boolean}
          totalLikes={data?.seePhoto?.totalLikes as number}
        />
      </ScrollView>
    </ScreenLayout>
  );
};

export default PhotoScreen;
