import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";
import StackNavMaker from "@/navigators/StackNavMaker";
import {View} from "react-native";
type ITabsNav = {
  Feed: undefined;
  Search: undefined;
  camera: undefined;
  Notifications: undefined;
  MyProfile: undefined;
};
const Tabs = createBottomTabNavigator<ITabsNav>();
const TabsNav = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: "#123456"},
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="Feed"
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
        children={() => <StackNavMaker stackName="Feed" />}
      />
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
        children={() => <StackNavMaker stackName="Search" />}
      />
      <Tabs.Screen
        name="camera"
        component={View}
        listeners={({navigation, route}) => {
          return {
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("Upload");
            },
          };
        }}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="camera-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Notifications"
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
        children={() => <StackNavMaker stackName="Notifications" />}
      />
      <Tabs.Screen
        name="MyProfile"
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
        children={() => <StackNavMaker stackName="MyProfile" />}
      />
    </Tabs.Navigator>
  );
};
export default TabsNav;
