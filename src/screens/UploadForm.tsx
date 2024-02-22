import DismissKeyBoard from "@/components/DismissKeyBoard";
import {ILoggendIn} from "@/navigators/LoggedInNav";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import {ActivityIndicator, Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import styled from "styled-components/native";

interface IUploadForm {
  navigation: StackNavigationProp<ILoggendIn, "UploadForm">;
  route: RouteProp<ILoggendIn, "UploadForm">;
}

const Container = styled.View`
  flex: 1;
`;
const Photo = styled.Image`
  height: 400px;
`;
const CaptionContainer = styled.View`
  flex: 1;
`;
const Caption = styled.TextInput`
  background-color: rgb(208, 208, 208);
`;
const HeaderRightTxt = styled.Text`
  color: cornflowerblue;
  font-weight: 700;
  margin-right: 20px;
`;
const UploadForm: React.FC<IUploadForm> = ({navigation, route}) => {
  const {control, handleSubmit} = useForm({defaultValues: {uploadInput: ""}});
  const HeaderRight = () => (
    <TouchableOpacity>
      <HeaderRightTxt>OK</HeaderRightTxt>
    </TouchableOpacity>
  );
  const HeaderRigntLoading = () => (
    <ActivityIndicator
      size={"small"}
      color={"blue"}
      style={{marginRight: 20}}
    />
  );
  useEffect(() => {
    navigation.setOptions({headerRight: HeaderRight});
  }, []);
  const onValid = ({uploadInput}: {uploadInput: string}) => {
    console.log(uploadInput);
  };
  return (
    <DismissKeyBoard>
      <Container>
        <Photo source={{uri: route.params.file}} resizeMode="contain" />
        <CaptionContainer>
          <Controller
            control={control}
            render={({field: {onBlur, onChange, value}}) => (
              <Caption
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="내용을 작성하세요."
                placeholderTextColor={"black"}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onValid)}
              />
            )}
            name="uploadInput"
          />
        </CaptionContainer>
      </Container>
    </DismissKeyBoard>
  );
};
export default UploadForm;
