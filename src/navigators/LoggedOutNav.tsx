import CreateAccount from "@/screens/CreateAccount";
import Login from "@/screens/Login";
import Welcome from "@/screens/Welcome";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";

export type RootStackParamList = {
  Welcome: undefined;
  Login: {userName: string; password: string};
  CreateAccount: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();
const screenOptions: StackNavigationOptions = {
  presentation: "card",
  headerMode: "float",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#123456",
    shadowOpacity: 0,
  },
};
const LoggedOutNav = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={screenOptions}>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
};
export default LoggedOutNav;
