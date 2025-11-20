import { View, Text, StyleSheet, TouchableOpacity, Linking, Animated, Easing } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useEffect, useRef } from "react";

export default function Contact() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true
      })
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.header,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}
      >
        Connect with Ashith
      </Animated.Text>

      {/* GitHub */}
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => Linking.openURL("https://github.com/ashith-dev")}
        >
          <FontAwesome name="github" size={28} color="#fff" />
          <Text style={styles.text}>GitHub</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* LinkedIn */}
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => Linking.openURL("https://www.linkedin.com/in/ashith-profile")}
        >
          <Entypo name="linkedin" size={28} color="#4da6ff" />
          <Text style={styles.text}>LinkedIn</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Email */}
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => Linking.openURL("mailto:ashithnaren9@gmail.com")}
        >
          <Entypo name="mail" size={28} color="#ff6666" />
          <Text style={styles.text}>Email</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#0d0d0d",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#ffffff",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    padding: 18,
    borderRadius: 15,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#333",
  },
  text: {
    fontSize: 19,
    marginLeft: 15,
    fontWeight: "600",
    color: "#e6e6e6",
  },
});

