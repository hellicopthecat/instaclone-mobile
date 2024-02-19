import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "@/navigators/LoggedOutNav";
import {RouteProp} from "@react-navigation/native";
import AuthLayout from "@/components/AuthLayout";
import AuthBtnLayout from "@/components/AuthBtnLayout";
import {RefObject, useRef} from "react";
import AuthInput from "@/components/AuthInput";
import {Controller, useForm} from "react-hook-form";
import {Mutation, MutationCreateUserArgs} from "@/__generated__/graphql";
import {gql, useMutation} from "@apollo/client";

type JoinNav = StackNavigationProp<RootStackParamList, "CreateAccount">;
type JoinRoute = RouteProp<RootStackParamList, "CreateAccount">;
type JoinProps = {
  navigation: JoinNav;
  route: JoinRoute;
};

const CREATEUSER_MUTATION = gql`
  mutation CreateUser(
    $userName: String!
    $firstName: String!
    $email: String!
    $password: String!
    $lastName: String
  ) {
    createUser(
      userName: $userName
      firstName: $firstName
      email: $email
      password: $password
      lastName: $lastName
    ) {
      ok
      error
    }
  }
`;

const CreateAccount: React.FC<JoinProps> = ({navigation, route}) => {
  // Form
  const {control, handleSubmit, getValues} = useForm<MutationCreateUserArgs>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      userName: "",
    },
  });
  // onComplete Mutation
  const completeCreateUser = (data: Mutation) => {
    const {
      createUser: {ok},
    } = data;
    const {userName, password} = getValues();
    if (ok) {
      navigation.navigate("Login", {userName, password});
    }
  };
  // Mutation
  const [CreateUser, {loading: createUserLoading}] = useMutation(
    CREATEUSER_MUTATION,
    {onCompleted: completeCreateUser}
  );
  // Ref
  const lastNameRef: React.MutableRefObject<null> = useRef(null);
  const userNameRef: React.MutableRefObject<null> = useRef(null);
  const emailRef: React.MutableRefObject<null> = useRef(null);
  const passwordRef: React.MutableRefObject<null> = useRef(null);
  const onNext = (submitSection: RefObject<HTMLInputElement>): void => {
    submitSection?.current?.focus();
  };
  const onDone = (data: MutationCreateUserArgs) => {
    if (!createUserLoading) {
      CreateUser({
        variables: {
          ...data,
        },
      });
    }
  };

  return (
    <AuthLayout>
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <AuthInput
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            focus
            placeholder="First Name"
            returnKey="next"
            onSubmit={() => onNext(lastNameRef)}
          />
        )}
        name="firstName"
      />
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <AuthInput
            onBlur={onBlur}
            onChange={onChange}
            value={value || undefined}
            refName={lastNameRef}
            placeholder="Last Name"
            returnKey="next"
            onSubmit={() => onNext(userNameRef)}
          />
        )}
        name="lastName"
      />
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <AuthInput
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            refName={userNameRef}
            placeholder="User Name"
            returnKey="next"
            onSubmit={() => onNext(emailRef)}
          />
        )}
        name="userName"
      />
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <AuthInput
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            refName={emailRef}
            placeholder="E-mail"
            returnKey="next"
            onSubmit={() => onNext(passwordRef)}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <AuthInput
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            security
            refName={passwordRef}
            placeholder="Password"
            returnKey="done"
            onSubmit={handleSubmit(onDone)}
          />
        )}
        name="password"
      />

      <AuthBtnLayout
        btnTxt="Create Account"
        blueBtn
        pressFn={handleSubmit(onDone)}
        loading={createUserLoading}
      />
    </AuthLayout>
  );
};
export default CreateAccount;
