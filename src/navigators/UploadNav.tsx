import SelectPhoto from "@/screens/SelectPhoto";
import TakePhoto from "@/screens/TakePhoto";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import {FunctionComponent} from "react";

export type UploadNavType = {
  Select: undefined;
  TakePhoto: undefined;
  UploadForm: {file: string};
};
export type SelectUpload = {
  SelectPhoto: undefined;
};
const TopTab = createMaterialTopTabNavigator<UploadNavType>();
const Stack = createStackNavigator<SelectUpload>();

const UploadNav = () => {
  return (
    <TopTab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: {paddingBottom: 10, backgroundColor: "cornflowerblue"},
        tabBarIndicatorStyle: {top: 0},
      }}
    >
      <TopTab.Screen
        name="Select"
        children={() => (
          <Stack.Navigator
            screenOptions={{
              headerBackTitleVisible: false,
            }}
          >
            <Stack.Screen
              name="SelectPhoto"
              component={SelectPhoto as React.FC}
              options={{headerTitle: "Select Photo"}}
            />
          </Stack.Navigator>
        )}
      />
      <TopTab.Screen name="TakePhoto" component={TakePhoto} />
    </TopTab.Navigator>
  );
};
export default UploadNav;
