import {ReactNode} from "react";
import {Keyboard, Platform, TouchableWithoutFeedback} from "react-native";

const DismissKeyBoard = ({children}: {children: ReactNode}) => {
  const keyboardOff = () => Keyboard.dismiss();
  return (
    <TouchableWithoutFeedback
      onPress={keyboardOff}
      style={{flex: 1}}
      disabled={Platform.OS === "web"}
    >
      {children}
    </TouchableWithoutFeedback>
  );
};
export default DismissKeyBoard;
