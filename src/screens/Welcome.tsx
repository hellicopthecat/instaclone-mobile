import React from "react";
import {RootStackParamList} from "@/navigators/LoggedOutNav";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import AuthLayout from "@/components/AuthLayout";
import AuthBtnLayout from "@/components/AuthBtnLayout";

type WelcomeNav = StackNavigationProp<RootStackParamList, "Welcome">;
type WelcomeRoute = RouteProp<RootStackParamList, "Welcome">;
type WelcomeProps = {
  navigation: WelcomeNav;
  route: WelcomeRoute;
};

const Welcome: React.FC<WelcomeProps> = ({navigation, route}) => {
  const goCreateAccount = () => navigation.navigate("CreateAccount");
  const goLogin = () => navigation.navigate("Login");
  return (
    <AuthLayout>
      <AuthBtnLayout
        pressFn={goCreateAccount}
        btnTxt="Create Account"
        blueBtn
      />
      <AuthBtnLayout pressFn={goLogin} btnTxt="Log In" />
    </AuthLayout>
  );
};
export default Welcome;
