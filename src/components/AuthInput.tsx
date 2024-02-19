import {ReturnKeyType, TextInput} from "react-native";
import styled from "styled-components/native";
interface IAuthInput {
  focus?: boolean;
  refName?: React.MutableRefObject<null>;
  placeholder: string;
  returnKey: ReturnKeyType;
  onSubmit: () => void;
  onChange?: () => void;
  onBlur?: () => void;
  value?: string;
  security?: boolean;
}

const AuthTextInput = styled(TextInput)`
  padding: 15px 20px;
  width: 100%;
  background-color: #4a4b5d;
  color: ${(props) => props.theme.txtColor};
  border-radius: 10px;
  margin-bottom: 5px;
`;

const AuthInput: React.FC<IAuthInput> = ({
  focus = false,
  refName,
  placeholder,
  returnKey,
  onSubmit,
  onChange,
  onBlur,
  value,
  security = false,
}) => {
  return (
    <AuthTextInput
      autoFocus={focus}
      ref={refName}
      placeholder={placeholder}
      returnKeyType={returnKey}
      onSubmitEditing={onSubmit}
      placeholderTextColor={"white"}
      onBlur={onBlur}
      secureTextEntry={security}
      onChangeText={onChange}
      value={value}
      autoCapitalize="none"
    />
  );
};
export default AuthInput;
