import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, Text, View } from "react-native";

export default function AccountPage() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={{fontSize: 18}}>Developed by Rishit Umesh Padagatti</ThemedText>
      <ThemedText style={{fontSize: 15}}>using React Native + Expo</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
