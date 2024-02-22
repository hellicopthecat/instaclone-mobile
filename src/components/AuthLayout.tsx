import {ReactNode} from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyBoard from "./DismissKeyBoard";

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
  return (
    <DismissKeyBoard>
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
    </DismissKeyBoard>
  );
};
export default AuthLayout;
