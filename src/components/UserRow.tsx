import {NavigationProp, useNavigation} from "@react-navigation/native";
import {Text} from "react-native";
import styled from "styled-components/native";
interface IUserRow {
  id: number;
  avatar: string;
  username: string;
  isMe: boolean;
  isFollowing: boolean;
}
const Container = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Column = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  background-color: red;
  margin-right: 10px;
`;
const Username = styled.Text`
  font-weight: 600;
`;
const FollowingBtn = styled.TouchableOpacity`
  background-color: #00c3ff;
  padding: 5px 10px;
  border-radius: 10px;
`;
const FollowingTxt = styled.Text``;

const UserRow: React.FC<IUserRow> = ({
  id,
  avatar,
  username,
  isMe,
  isFollowing,
}) => {
  const navigator: NavigationProp<{Profile: {id: number; username: string}}> =
    useNavigation();
  return (
    <Container>
      <Column onPress={() => navigator.navigate("Profile", {id, username})}>
        <Avatar source={{uri: avatar}} />
        <Username>{username}</Username>
      </Column>

      {!isMe ? (
        <FollowingBtn>
          <FollowingTxt>{isFollowing ? "UnFollow" : "Follow"}</FollowingTxt>
        </FollowingBtn>
      ) : null}
    </Container>
  );
};
export default UserRow;
