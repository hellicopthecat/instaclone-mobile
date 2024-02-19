import {ReactNode} from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";

const AuthLayoutCont = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
  padding: 0px 40px;
`;
const Logo = styled.Image`
  max-width: 100px;
  max-height: 100px;
`;
const AuthLayout: React.FC<{children: ReactNode}> = ({children}) => {
  const dismissKeyboard = () => Keyboard.dismiss();

  return (
    <TouchableWithoutFeedback
      style={{flex: 1}}
      onPress={dismissKeyboard}
      disabled={Platform.OS === "web"}
    >
      <AuthLayoutCont>
        <KeyboardAvoidingView
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        >
          <Logo source={require("assets/logo.png")} resizeMode="contain" />
          {children}
        </KeyboardAvoidingView>
      </AuthLayoutCont>
    </TouchableWithoutFeedback>
  );
};
export default AuthLayout;
