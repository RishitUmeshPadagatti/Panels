import { ThemedView } from "@/components/ThemedView";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { LikedScreen } from "@/screens/LikedScreen";
import { LibraryScreen } from "@/screens/LibraryScreen";

const Tab = createMaterialTopTabNavigator();

export default function ForYouPage() {
  const currentTheme = useColorScheme() || "light";

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: Colors[currentTheme].text,
            tabBarStyle: {
              backgroundColor: Colors[currentTheme].background
            },
            tabBarIndicatorStyle: {
              backgroundColor: Colors[currentTheme].mkbhdOrange,
              height: 5,
              borderRadius: 5,
            },
            tabBarLabelStyle: {
              fontWeight: '600',
              textTransform: 'none',
              fontSize: 15,
            }
          }}
        >
          <Tab.Screen name="Liked" component={LikedScreen} />
          <Tab.Screen name="Library" component={LibraryScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    </ThemedView>
  );
}