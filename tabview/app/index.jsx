import { View, Text, StyleSheet, Image, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";

export default function Home() {
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: "https://files.ash.s-ul.eu/ai-profile.png" }}
        style={[
          styles.logo,
          { opacity: fade, transform: [{ translateY: slide }] }
        ]}
      />

      <Animated.Text
        style={[
          styles.title,
          { opacity: fade, transform: [{ translateY: slide }] }
        ]}
      >
        Hello, I'm Ashith 👋
      </Animated.Text>

      <Animated.Text
        style={[
          styles.subtitle,
          { opacity: fade, transform: [{ translateY: slide }] }
        ]}
      >
        Software Developer • AI/ML Learner • Builder
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 170,
    height: 170,
    borderRadius: 90,
    marginBottom: 25,
    borderWidth: 2,
    borderColor: "#4da6ff",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#ccc",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});
