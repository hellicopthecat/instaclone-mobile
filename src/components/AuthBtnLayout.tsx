import {ActivityIndicator} from "react-native";
import styled from "styled-components/native";

interface IBtnLayout {
  pressFn?: () => void;
  blueBtn?: boolean;
  btnTxt: string;
  loading?: boolean;
}
const TouchOpacityBtn = styled.TouchableOpacity<{$bluebtn: boolean}>`
  background-color: ${(props) => (props.$bluebtn ? "#0095f6" : "inherit")};
  padding: ${(props) => (props.$bluebtn ? "15px 20px" : "0px")};
  border-radius: ${(props) => (props.$bluebtn ? "10px" : "0px")};
  width: 100%;
  text-align: center;
`;
const BtnText = styled.Text<{$bluebtn: boolean}>`
  color: ${(props) => props.theme.txtColor};
  text-align: center;
  font-weight: 500;
  margin-top: ${(props) => (!props.$bluebtn ? "10px" : "0px")};
`;
const AuthBtnLayout: React.FC<IBtnLayout> = ({
  pressFn,
  blueBtn = false,
  btnTxt,
  loading = false,
}) => {
  return (
    <TouchOpacityBtn onPress={pressFn} $bluebtn={blueBtn}>
      {loading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <BtnText $bluebtn={blueBtn}>{btnTxt}</BtnText>
      )}
    </TouchOpacityBtn>
  );
};
export default AuthBtnLayout;
