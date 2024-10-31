import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

export default function TabLayout() {
    const currentTheme = useColorScheme() || "light";

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: Colors[currentTheme].mkbhdOrange,
                tabBarStyle: {
                    backgroundColor: Colors[currentTheme].background,
                    // paddingTop: 10,
                    // paddingBottom: 20,
                    borderTopWidth: 0,
                },
            }}
        >

            <Tabs.Screen
                name="foryou"
                options={{
                    title: 'For You',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={focused ? 33 : 28}  />
                    )
                }}
            />

            <Tabs.Screen
                name="index"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'albums' : 'albums-outline'} color={color} size={focused ? 33 : 28}  />
                    )
                }}
            />

            <Tabs.Screen
                name="account"
                options={{
                    title: 'Account',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={focused ? 33 : 28}  />
                    )
                }}
            />
        </Tabs>
    )
}