import useMe from "@/hooks/useMe";
import {StackNavMakerType} from "@/navigators/StackNavMaker";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {loggedOut} from "apollo";
import {useEffect} from "react";
import {Text, TouchableOpacity, View} from "react-native";
interface IMyProfile {
  navigation: StackNavigationProp<StackNavMakerType, "StackMyProfile">;
  route: RouteProp<StackNavMakerType, "StackMyProfile">;
}
const MyProfile: React.FC<IMyProfile> = ({navigation, route}) => {
  const {data} = useMe();
  useEffect(() => {
    if (data?.seeMyProfile) {
      navigation.setOptions({title: data.seeMyProfile.userName});
    }
  }, [data]);
  return (
    <View>
      <Text>this is MyProfile</Text>
      <TouchableOpacity onPress={() => loggedOut()}>
        <Text>sfs</Text>
      </TouchableOpacity>
    </View>
  );
};
export default MyProfile;
