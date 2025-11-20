import { Tabs } from "expo-router";
import { Animated, Easing } from "react-native";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#0d0d0d" },
        headerTintColor: "#fff",
        tabBarStyle: { backgroundColor: "#0d0d0d", borderTopColor: "#222" },
        tabBarActiveTintColor: "#4da6ff",
        tabBarInactiveTintColor: "#888",
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="contact" options={{ title: "Contact" }} />
      <Tabs.Screen name="projects" options={{ title: "Projects" }} />
    </Tabs>
  );
}
