import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RecoilRoot } from "recoil";

export default function RootLayout() {
  return (
    <RecoilRoot>
      <GestureHandlerRootView>
        <Stack
          screenOptions={{ headerShown: false }}
        >

          <Stack.Screen
            name="(tabs)"
          />

          <Stack.Screen
            name="+not-found"
          />

        </Stack>
      </GestureHandlerRootView>
    </RecoilRoot>
  )
}
