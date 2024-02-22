import {createStackNavigator} from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
import UploadForm from "@/screens/UploadForm";

export type ILoggendIn = {
  Tabs: undefined;
  Upload: undefined;
  UploadForm: {file: string};
};
const Stack = createStackNavigator<ILoggendIn>();

const LoggedInNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabsNav}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Upload"
        component={UploadNav}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UploadForm"
        component={UploadForm}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default LoggedInNav;
