import * as MediaLibrary from "expo-media-library";
import {useEffect, useState} from "react";
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {StackNavigationProp} from "@react-navigation/stack";
import {UploadNavType} from "@/navigators/UploadNav";
import {StatusBar} from "expo-status-bar";
import {RouteProp} from "@react-navigation/native";

export type ISelectPhoto = {
  navigation: StackNavigationProp<UploadNavType, "Select">;
  route: RouteProp<UploadNavType, "Select">;
};
const Container = styled.View`
  flex: 1;
`;
const Top = styled.View`
  flex: 1;
  background-color: black;
`;
const Bottom = styled.View`
  flex: 1;
`;
const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  right: 0;
  bottom: 0;
  margin-right: 5px;
  margin-bottom: 5px;
`;
const HeaderRigntText = styled.Text`
  color: cornflowerblue;
  font-size: 18px;
  font-weight: 600;
  margin-right: 10px;
`;
const SelectPhoto: React.FC<ISelectPhoto> = ({navigation, route}) => {
  const [ok, setOk] = useState(false);
  const [choosenPhoto, setChoosenPhoto] = useState("");
  const [photos, setPhotos] = useState([] as MediaLibrary.Asset[]);
  const [permissionsResponse, requestPermission] =
    MediaLibrary.usePermissions();

  const getPhotos = async () => {
    //   const albums = await MediaLibrary.getAlbumsAsync();
    await requestPermission();
    const {assets: loadedPhoto} = await MediaLibrary.getAssetsAsync();
    setPhotos(loadedPhoto);
    setChoosenPhoto(loadedPhoto[0]?.uri);
  };
  const getPermissions = async () => {
    const {status, canAskAgain} = await MediaLibrary.getPermissionsAsync();
    if (status === "granted" && canAskAgain) {
      const {status} = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        setOk(true);
        getPhotos();
      }
    } else if (status !== "granted") {
      setOk(true);
      getPhotos();
    }
  };
  useEffect(() => {
    getPermissions();
    getPhotos();
  }, []);
  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("UploadForm", {file: choosenPhoto})}
    >
      <HeaderRigntText>Next</HeaderRigntText>
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [choosenPhoto]);
  const {width, height} = useWindowDimensions();
  const choosePhoto = (uri: string) => {
    setChoosenPhoto(uri);
  };
  const renderItem = ({item}: ListRenderItemInfo<MediaLibrary.Asset>) => {
    return (
      <ImageContainer onPress={() => choosePhoto(item.uri)}>
        <Image
          source={{uri: item.uri}}
          style={{width: width / 4, height: 100}}
        />
        <IconContainer>
          <Ionicons
            name="checkmark-circle"
            color={item.uri === choosenPhoto ? "cornflowerblue" : "white"}
            size={20}
          />
        </IconContainer>
      </ImageContainer>
    );
  };

  return (
    <Container>
      <StatusBar hidden={false} style="dark" />
      <Top>
        {choosenPhoto !== "" ? (
          <Image
            source={{uri: choosenPhoto}}
            style={{width, height: height / 2}}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={4}
          keyExtractor={(item) => item.id}
          renderItem={(item) => renderItem(item)}
        />
      </Bottom>
    </Container>
  );
};
export default SelectPhoto;
