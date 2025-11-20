import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";

export default function Projects() {
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  const projects = [
    {
      title: "Weather App",
      details: "Real-time weather data with clean UI.",
    },
    {
      title: "Expense Tracker",
      details: "Tracks expenses & visualizes spending patterns.",
    },
    {
      title: "Portfolio App",
      details: "A personal portfolio built using Expo.",
    },
  ];

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.header, { opacity: fade }]}>
        My Projects 🚀
      </Animated.Text>

      <ScrollView>
        {projects.map((p, index) => (
          <Animated.View
            key={index}
            style={[styles.card, { opacity: fade }]}
          >
            <Text style={styles.title}>{p.title}</Text>
            <Text style={styles.details}>{p.details}</Text>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    padding: 20,
  },
  header: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#1a1a1a",
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
  },
  title: {
    color: "#4da6ff",
    fontSize: 20,
    fontWeight: "bold",
  },
  details: {
    color: "#ccc",
    marginTop: 8,
  },
});
