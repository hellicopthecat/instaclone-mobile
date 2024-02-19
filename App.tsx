import {useCallback, useEffect, useState} from "react";
import {StyleSheet, Text, View, useColorScheme} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  PontanoSans_400Regular,
} from "@expo-google-fonts/pontano-sans";
import LoggedOutNav from "@/navigators/LoggedOutNav";
import {NavigationContainer} from "@react-navigation/native";
import {ThemeProvider} from "styled-components/native";
import {darkTheme, lightTheme} from "@/styles/color";
import {ApolloProvider, useReactiveVar} from "@apollo/client";
import client, {isLoggedIn, userToken, cache} from "apollo";
import LoggedInNav from "@/navigators/LoggedInNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StatusBar} from "expo-status-bar";
import {AsyncStorageWrapper, persistCache} from "apollo3-cache-persist";

export default function App() {
  const loggedIn = useReactiveVar(isLoggedIn);
  const [appReady, setAppReady] = useState(false);
  const [fontLoaded] = useFonts({
    pontano: PontanoSans_400Regular,
  });
  const isDark = useColorScheme() === "dark";

  useEffect(() => {
    const prepare = async () => {
      try {
        const token = await AsyncStorage.getItem("TOKEN");
        if (token) {
          isLoggedIn(true);
          userToken(token);
        }
        await persistCache({
          cache,
          storage: new AsyncStorageWrapper(AsyncStorage),
        });
        client.resetStore();

        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.log(e);
      } finally {
        setAppReady(true);
      }
    };
    prepare();
  }, []);

  useCallback(async () => {
    if (appReady && fontLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady || !fontLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          {loggedIn ? <LoggedInNav /> : <LoggedOutNav />}
          <StatusBar style="auto" />
        </NavigationContainer>
      </ThemeProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: "pontano",
  },
});
