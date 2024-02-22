import {Camera, CameraType, FlashMode} from "expo-camera";
import {useEffect, useRef, useState} from "react";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import {StatusBar} from "expo-status-bar";
import {StackNavigationProp} from "@react-navigation/stack";
import {UploadNavType} from "@/navigators/UploadNav";
import {createAlbumAsync, createAssetAsync} from "expo-media-library";
import {Alert, TouchableOpacity, useWindowDimensions} from "react-native";
import {useIsFocused} from "@react-navigation/native";
type ExtendUploadType = UploadNavType & {Tabs: undefined};
type TakePhotoProps = {
  navigation: StackNavigationProp<ExtendUploadType, "TakePhoto">;
};
const Container = styled.View`
  flex: 1;
`;
const TakenPhotoImg = styled.Image``;
const ActionCont = styled.View`
  flex: 0.2;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const TakePicBtn = styled.TouchableOpacity`
  flex: 1;
`;
const FlipCameraBtn = styled.TouchableOpacity`
  flex: 1;
`;
const SliderCont = styled.View`
  flex: 1;
`;
const FlashBtn = styled.TouchableOpacity`
  flex: 1;
`;
const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 15px;
`;
const TakePhoto = ({navigation}: TakePhotoProps) => {
  const cameraRef = useRef<Camera | null>(null);
  const {width} = useWindowDimensions();
  const [cameraReady, setCameraReady] = useState(false);
  const [takenPhoto, setTakenPhoto] = useState("");
  const [ok, setOk] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [type, setTpye] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const getPermissions = async () => {
    const {granted} = await Camera.requestCameraPermissionsAsync();
    setOk(granted);
  };
  useEffect(() => {
    getPermissions();
  }, []);
  const reverseCam = () => {
    if (CameraType.back === type) {
      setTpye(CameraType.front);
    } else {
      setTpye(CameraType.back);
    }
  };
  const onZoomValueChange = (e: number) => {
    setZoom(e);
  };
  const flashMode = () => {
    if (flash === FlashMode.off) {
      setFlash(FlashMode.on);
      console.log(flash);
    } else if (flash === FlashMode.on) {
      setFlash(FlashMode.auto);
      console.log(flash);
    } else {
      setFlash(FlashMode.off);
      console.log(flash);
    }
  };
  const actionClose = () => {
    navigation.navigate("Tabs");
  };
  const takePhoto = async () => {
    if (cameraRef.current && cameraReady) {
      const {uri} = await cameraRef.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      setTakenPhoto(uri);
    }
  };
  const defineCameraReady = () => setCameraReady(true);
  const cancelPhoto = () => setTakenPhoto("");
  const goToUpload = async (save: boolean) => {
    if (save) {
      const file = await createAssetAsync(takenPhoto);
      await createAlbumAsync("instaclone", file);
    }
  };
  const uploadPhoto = () => {
    Alert.alert("Save Photo?", "Save & Upload or just Uplod? ", [
      {text: "Save & Uplod", onPress: () => goToUpload(true)},
      {text: "Uplod", onPress: () => goToUpload(false)},
    ]);
  };
  const isFocused = useIsFocused();
  return (
    <Container>
      {isFocused ? <StatusBar hidden={true} /> : null}
      {takenPhoto === "" ? (
        <Camera
          ref={cameraRef}
          style={{flex: 1}}
          type={type}
          zoom={zoom}
          flashMode={flash}
          onCameraReady={defineCameraReady}
        />
      ) : (
        <TakenPhotoImg
          source={{uri: takenPhoto}}
          style={{flex: 1}}
          width={width}
        />
      )}
      {takenPhoto === "" ? (
        <ActionCont>
          <SliderCont>
            <Slider
              style={{width: 100, height: 40}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="cornflowerblue"
              maximumTrackTintColor="gray"
              onValueChange={onZoomValueChange}
            />
          </SliderCont>
          <TakePicBtn onPress={takePhoto}>
            <Ionicons name="radio-button-on" size={70} />
          </TakePicBtn>
          <FlipCameraBtn onPress={reverseCam}>
            <Ionicons name="reload" size={30} />
          </FlipCameraBtn>
          <FlashBtn onPress={flashMode}>
            <Ionicons
              name={
                flash === FlashMode.off
                  ? "flash-off"
                  : flash === FlashMode.auto
                  ? "flashlight"
                  : "flash"
              }
              size={30}
            />
          </FlashBtn>
        </ActionCont>
      ) : (
        <ActionCont>
          <TouchableOpacity>
            <Ionicons name="save" size={50} />
          </TouchableOpacity>
          <TouchableOpacity onPress={uploadPhoto}>
            <Ionicons name="cloud-upload" size={50} />
          </TouchableOpacity>
          <TouchableOpacity onPress={cancelPhoto}>
            <Ionicons name="close-circle-outline" size={50} />
          </TouchableOpacity>
        </ActionCont>
      )}
      <CloseBtn onPress={actionClose}>
        <Ionicons name="close" size={25} color={"white"} />
      </CloseBtn>
    </Container>
  );
};
export default TakePhoto;
