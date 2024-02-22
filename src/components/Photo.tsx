import {MutationResponse, Photo} from "@/__generated__/graphql";
import {StackNavMakerType} from "@/navigators/StackNavMaker";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {Image, Text, TouchableOpacity, useWindowDimensions} from "react-native";
import styled from "styled-components/native";
import {Ionicons} from "@expo/vector-icons";
import {ApolloCache, FetchResult, gql, useMutation} from "@apollo/client";

const Container = styled.View``;
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;

const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 25px;
  background-color: red;
`;
const Username = styled.Text`
  font-weight: 600;
`;
const File = styled.Image``;
const ExtraCont = styled.View`
  padding: 10px;
`;
const Actions = styled.View`
  flex-direction: row;
`;
const Action = styled.TouchableOpacity`
  margin: 0px 5px;
`;
const Likes = styled.TouchableOpacity`
  margin: 5px 0px;
  font-weight: 600;
`;
const Caption = styled.View`
  flex-direction: row;
  align-items: center;
`;
const CaptionText = styled.Text`
  margin-left: 10px;
`;

const TOGGLE_LIKE_MUTATION = gql`
  mutation ToggleLike($toggleLikePhotoId: Int!) {
    toggleLikePhoto(id: $toggleLikePhotoId) {
      ok
    }
  }
`;
const PhotoComp = ({
  id,
  user,
  caption,
  file,
  isLiked,
  totalLikes,
}: Pick<
  Photo,
  "id" | "user" | "caption" | "file" | "isLiked" | "totalLikes"
>) => {
  const updateToggleLike = (
    cache: ApolloCache<any>,
    result: FetchResult<{toggleLikePhoto: MutationResponse}>
  ) => {
    const {data} = result;
    if (data?.toggleLikePhoto.ok) {
      const fragmentId = `Photo:${id}`;
      cache.modify({
        id: fragmentId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          totalLikes(prev) {
            if (isLiked) {
              return prev - 1;
            } else {
              return prev + 1;
            }
          },
        },
      });
    }
  };
  const [ToggleLike] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {toggleLikePhotoId: id},
    update: updateToggleLike,
  });
  const navigation: NavigationProp<StackNavMakerType> = useNavigation();
  const {width, height} = useWindowDimensions();
  const [imgHeight, setImgHeight] = useState(height - 500);
  useEffect(() => {
    Image.getSize(file, (width, height) => {
      setImgHeight(height / 2);
    });
  }, [file]);

  return (
    <Container>
      <Header
        onPress={() =>
          navigation.navigate("Profile", {id: user.id, username: user.userName})
        }
      >
        <UserAvatar resizeMode="contain" source={{uri: user.avatar + ""}} />
        <Username>{user.userName}</Username>
      </Header>

      <File
        resizeMode="contain"
        style={{width: width, height: imgHeight}}
        source={{uri: file}}
      />

      <ExtraCont>
        <Actions>
          <Action onPress={() => ToggleLike()}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={isLiked ? "red" : "black"}
            />
          </Action>
          <Action>
            <Ionicons name="chatbox-outline" size={24} color="black" />
          </Action>
        </Actions>
        <Likes onPress={() => navigation.navigate("WhoLikes", {photoId: id})}>
          <Text>{totalLikes === 1 ? `1 Like` : `${totalLikes} Likes`}</Text>
        </Likes>
        <Caption>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Profile", {
                id: user.id,
                username: user.userName,
              })
            }
          >
            <Username>{user.userName}</Username>
          </TouchableOpacity>
          <CaptionText>{caption}</CaptionText>
        </Caption>
      </ExtraCont>
    </Container>
  );
};
export default PhotoComp;
