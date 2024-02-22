import Feed from "@/screens/Feed";
import MyProfile from "@/screens/MyProfile";
import Notifications from "@/screens/Notifications";
import PhotoScreen from "@/screens/PhotoScreen";
import Profile from "@/screens/Profile";
import Search from "@/screens/Search";
import WhoLikes from "@/screens/WhoLikes";
import {createStackNavigator} from "@react-navigation/stack";
import {Image} from "react-native";
export type StackNavMakerType = {
  StackFeed: undefined;
  StackSearch: undefined;
  StackNotifications: undefined;
  StackMyProfile: undefined;
  Profile?: {id: number; username: string};
  PhotoScreen: {photoId: number};
  WhoLikes: {photoId: number};
};
type StackNameDefs = {
  stackName: "Feed" | "Search" | "Notifications" | "MyProfile";
};
const Stack = createStackNavigator<StackNavMakerType>();
const StackNavMaker: React.FC<StackNameDefs> = ({stackName}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerBackTitle: "",
      }}
    >
      {stackName === "Feed" ? (
        <Stack.Screen
          name="StackFeed"
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                source={require("assets/logo.png")}
                style={{maxWidth: 40, maxHeight: 40}}
              />
            ),
          }}
        />
      ) : null}
      {stackName === "Search" ? (
        <Stack.Screen name="StackSearch" component={Search} />
      ) : null}
      {stackName === "Notifications" ? (
        <Stack.Screen name="StackNotifications" component={Notifications} />
      ) : null}
      {stackName === "MyProfile" ? (
        <Stack.Screen name="StackMyProfile" component={MyProfile} />
      ) : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="PhotoScreen" component={PhotoScreen} />
      <Stack.Screen name="WhoLikes" component={WhoLikes} />
    </Stack.Navigator>
  );
};
export default StackNavMaker;
