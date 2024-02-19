import {TextInput} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "@/navigators/LoggedOutNav";
import {RouteProp} from "@react-navigation/native";
import AuthLayout from "@/components/AuthLayout";
import AuthInput from "@/components/AuthInput";
import AuthBtnLayout from "@/components/AuthBtnLayout";
import {RefObject, useRef} from "react";
import {useForm, Controller} from "react-hook-form";
import {gql, useMutation} from "@apollo/client";
import {Mutation} from "@/__generated__/graphql";
import {isLoggedIn, loginUserToken} from "apollo";
type LoginNav = StackNavigationProp<RootStackParamList, "Login">;
type LoginRoute = RouteProp<RootStackParamList, "Login">;
type LoginProps = {
  navigation: LoginNav;
  route: LoginRoute;
};
interface ILogin {
  userID: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login: React.FC<LoginProps> = ({navigation, route: {params}}) => {
  // Complete Mutation
  const onCompleteLogin = async (data: Mutation) => {
    const {
      login: {ok, token, error},
    } = data;
    if (ok) {
      await loginUserToken(token + "");
    }
  };
  // Mutation
  const [LoginMutation, {loading: loginLoading}] = useMutation(LOGIN_MUTATION, {
    onCompleted: onCompleteLogin,
  });
  // Form
  const {control, handleSubmit, setValue} = useForm<ILogin>({
    defaultValues: {
      userID: params?.userName,
      password: params?.password,
    },
  });
  // Ref
  const passwordRef: React.MutableRefObject<null> = useRef(null);
  // Login Submit
  const loginSubmit = (data: ILogin) => {
    if (loginLoading) {
      return;
    }
    LoginMutation({
      variables: {
        userName: data.userID,
        password: data.password,
      },
    });
  };
  // else Func
  const goCreateAccount = () => navigation.navigate("CreateAccount");
  const clickNext = (ref: RefObject<TextInput>) => ref.current?.focus();
  return (
    <AuthLayout>
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <AuthInput
            focus
            placeholder="ID"
            returnKey="next"
            onBlur={onBlur}
            onChange={onChange}
            value={params?.userName ? params.userName : value}
            onSubmit={() => clickNext(passwordRef)}
          />
        )}
        name="userID"
      />
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <AuthInput
            refName={passwordRef}
            placeholder="Password"
            returnKey="done"
            onBlur={onBlur}
            onChange={onChange}
            value={params?.password ? params.password : value}
            onSubmit={handleSubmit(loginSubmit)}
            security
          />
        )}
        name="password"
      />

      <AuthBtnLayout
        btnTxt="Log IN"
        blueBtn
        pressFn={handleSubmit(loginSubmit)}
        loading={loginLoading}
      />
      <AuthBtnLayout btnTxt="Create Account" pressFn={goCreateAccount} />
    </AuthLayout>
  );
};
export default Login;
