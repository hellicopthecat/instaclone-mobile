import {StackNavMakerType} from "@/navigators/StackNavMaker";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useEffect} from "react";
import {Text, View} from "react-native";
interface IProfile {
  navigation: StackNavigationProp<StackNavMakerType, "Profile">;
  route: RouteProp<StackNavMakerType, "Profile">;
}
const Profile: React.FC<IProfile> = ({navigation, route}) => {
  const {
    params: {id, username},
  } = route;
  useEffect(() => {
    if (username) {
      navigation.setOptions({title: username});
    }
  }, []);

  return (
    <View>
      <Text>this is Profile</Text>
    </View>
  );
};
export default Profile;
