import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  makeVar,
} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {offsetLimitPagination} from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isLoggedIn = makeVar(false);
export const userToken = makeVar("");

export const loginUserToken = async (token: string) => {
  await AsyncStorage.setItem("TOKEN", token);
  isLoggedIn(true);
};
export const loggedOut = async () => {
  await AsyncStorage.clear();
  isLoggedIn(false);
  userToken("");
};

// uri: "http://localhost:4000/graphql",
const httpLink = createHttpLink({
  uri: "https://1cd8-58-227-141-22.ngrok-free.app/graphql",
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeFeed: offsetLimitPagination(),
      },
    },
  },
});

const authLink = setContext(async (_, {headers}) => {
  const token = await AsyncStorage.getItem("TOKEN");
  return {
    headers: {
      ...headers,
      token: token ?? "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default client;
