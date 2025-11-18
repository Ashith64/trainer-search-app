import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Easing,
} from "react-native";

const { width, height } = Dimensions.get("window");

/*
  Single-file Matrix UI:
  - Matrix rain (animated columns)
  - Glitch + neon name
  - Typewriter intro
  - Pulsing glow
  - "ACCESS GRANTED" popup
  - Touch-based parallax (lightweight)
  - Rotating hacker/coding/cyberpunk quotes
  - No external assets; runs in Expo Go
*/

// -- Config
const NAME = "ASHITH";
const COLLEGE = "NIE MYSURU";
const USN = "4NI24IS025";
const QUOTES = [
  "The system is only as secure as its weakest node.",
  "Exploit the problem. Build the solution.",
  "In a world of ones and zeros, you are the anomaly.",
  "Hacks are temporary. Design is permanent.",
  "Break assumptions. Ship improvements.",
  "Privilege escalation: from ideas to execution.",
];

// small number of columns keeps it smooth on phones
const COLUMN_WIDTH = 20;
const NUM_COLUMNS = Math.floor(width / COLUMN_WIDTH);

export default function App() {
  // global rain animation progress
  const fall = useRef(new Animated.Value(0)).current;

  // parallax from touch
  const parallax = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  // typewriter progress (0..len)
  const [typeIndex, setTypeIndex] = useState(0);

  // access granted popup animation
  const popupAnim = useRef(new Animated.Value(0)).current;

  // glitch flicker control
  const glitchAnim = useRef(new Animated.Value(0)).current;

  // quote rotation index
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quoteOpacity = useRef(new Animated.Value(0)).current;

  // columns content (randomized strings)
  const [columnsData, setColumnsData] = useState(generateColumns());

  // Start looping rain animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(fall, {
        toValue: 1,
        duration: 3500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [fall]);

  // small periodic regeneration for variety (lightweight)
  useEffect(() => {
    const id = setInterval(() => {
      setColumnsData(generateColumns());
    }, 2200);
    return () => clearInterval(id);
  }, []);

  // Typewriter intro sequence + access popup + quote rotation + glitch
  useEffect(() => {
    // typewriter: increment letters
    const fullText = `${NAME} • ${COLLEGE} • ${USN}`;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTypeIndex(i);
      if (i >= fullText.length) {
        clearInterval(t);
        // after typing done, show access popup
        Animated.sequence([
          Animated.timing(popupAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.delay(900),
          Animated.timing(popupAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]).start();
        // start glitch flicker loop
        Animated.loop(
          Animated.sequence([
            Animated.timing(glitchAnim, {
              toValue: 1,
              duration: 80,
              useNativeDriver: true,
            }),
            Animated.timing(glitchAnim, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.delay(900),
          ])
        ).start();
        // start rotating quotes
        rotateQuotes();
      }
    }, 45); // typing speed
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Quote rotation function
  function rotateQuotes() {
    fadeInQuote(() => {
      // schedule next quote
      setTimeout(() => {
        fadeOutQuote(() => {
          setQuoteIndex((q) => (q + 1) % QUOTES.length);
          rotateQuotes();
        });
      }, 2200);
    });
  }

  function fadeInQuote(cb) {
    quoteOpacity.setValue(0);
    Animated.timing(quoteOpacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start(cb);
  }

  function fadeOutQuote(cb) {
    Animated.timing(quoteOpacity, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start(cb);
  }

  // touch parallax handlers (lightweight)
  function handleTouchMove(e) {
    const x = e.nativeEvent.locationX;
    const y = e.nativeEvent.locationY;
    // map center to small range
    const dx = (x - width / 2) / (width / 2); // -1..1
    const dy = (y - height / 2) / (height / 2);
    Animated.spring(parallax, {
      toValue: { x: dx * 8, y: dy * 8 },
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  }
  function handleTouchEnd() {
    Animated.spring(parallax, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  }

  // derived animations
  const translateY = fall.interpolate({
    inputRange: [0, 1],
    outputRange: [-height, height],
  });

  // popup transform
  const popupStyle = {
    opacity: popupAnim,
    transform: [
      {
        translateY: popupAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
      {
        scale: popupAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.95, 1],
        }),
      },
    ],
  };

  // glitch offset interpolation
  const glitchOffset = glitchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 6],
  });
  const glitchOpacity = glitchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.0, 0.9],
  });

  // pulsing glow on name
  const pulse = fall.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.8, 1.08, 0.8],
  });

  // typewriter reveal text
  const fullText = `${NAME}\n${COLLEGE}\n${USN}`;
  const typedPrimary = `${NAME}`.slice(0, Math.min(typeIndex, NAME.length));
  const typedRest =
    typeIndex > NAME.length ? `${COLLEGE} • ${USN}`.slice(0, typeIndex - NAME.length) : "";

  return (
    <TouchableWithoutFeedback
      onPressIn={handleTouchMove}
      onPressOut={handleTouchEnd}
      onPress={handleTouchEnd}
      onLongPress={handleTouchEnd}
      delayLongPress={200}
      onPressMove={handleTouchMove}
    >
      <View style={styles.container}>
        {/* matrix columns */}
        {columnsData.map((col, i) => {
          // slight parallax per column (further columns move less)
          const depth = (i % 4) / 4; // 0..0.75
          const left = i * COLUMN_WIDTH;
          return (
            <Animated.Text
              key={`c${i}`}
              style={[
                styles.column,
                {
                  left,
                  transform: [
                    { translateY },
                    {
                      translateX: parallax.x.interpolate({
                        inputRange: [-20, 20],
                        outputRange: [depth * -6, depth * 6],
                      }),
                    },
                    {
                      translateY: parallax.y.interpolate({
                        inputRange: [-20, 20],
                        outputRange: [depth * -4, depth * 4],
                      }),
                    },
                  ],
                  opacity: 0.18 + (i % 3) * 0.06,
                },
              ]}
              numberOfLines={Math.ceil(height / 18)}
            >
              {col}
            </Animated.Text>
          );
        })}

        {/* Access granted popup */}
        <Animated.View style={[styles.popup, popupStyle]}>
          <Text style={styles.popupText}>VERIFYING USER...</Text>
          <Text style={[styles.popupText, styles.popupGreen]}>ACCESS GRANTED ✔</Text>
        </Animated.View>

        {/* Center info area with parallax */}
        <Animated.View
          style={[
            styles.centerBox,
            {
              transform: [
                {
                  translateX: parallax.x.interpolate({
                    inputRange: [-20, 20],
                    outputRange: [-12, 12],
                  }),
                },
                {
                  translateY: parallax.y.interpolate({
                    inputRange: [-20, 20],
                    outputRange: [-8, 8],
                  }),
                },
                { scale: pulse },
              ],
            },
          ]}
        >
          {/* Glitch layers: base + 2 shifted colored layers that flash */}
          <View style={{ alignItems: "center" }}>
            {/* base */}
            <Text style={[styles.nameBase, styles.neonText]}>{typedPrimary}</Text>

            {/* colored glitch overlay left */}
            <Animated.Text
              style={[
                styles.nameGlitch,
                { color: "#00ff66", left: -glitchOffset, opacity: glitchOpacity },
              ]}
            >
              {typedPrimary}
            </Animated.Text>

            {/* colored glitch overlay right */}
            <Animated.Text
              style={[
                styles.nameGlitch,
                { color: "#66ffea", left: glitchOffset, opacity: glitchOpacity },
              ]}
            >
              {typedPrimary}
            </Animated.Text>
          </View>

          {/* college + usn (typewriter continuation) */}
          <Text style={styles.collegeText}>
            {typeIndex <= NAME.length ? "" : typedRest}
            {typeIndex <= NAME.length ? (typeIndex % 2 === 0 ? "▌" : "") : ""}
          </Text>

          {/* neon boxed ID card */}
          <Animated.View style={[styles.card, { transform: [{ translateY: 10 }] }]}>
            <Text style={styles.cardLine}>{COLLEGE}</Text>
            <Text style={styles.cardUSN}>{USN}</Text>
          </Animated.View>
        </Animated.View>

        {/* Quote area */}
        <Animated.View style={[styles.quoteBox, { opacity: quoteOpacity }]}>
          <Text style={styles.quoteText} numberOfLines={2}>
            {QUOTES[quoteIndex]}
          </Text>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

// helper: generate strings for columns
function generateColumns() {
  const rows = Math.ceil(height / 18);
  return Array.from({ length: NUM_COLUMNS }, () => {
    return Array.from({ length: rows })
      .map(() => (Math.random() > 0.55 ? "1" : "0"))
      .join("\n");
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    overflow: "hidden",
  },
  column: {
    position: "absolute",
    top: -120,
    fontSize: 14,
    lineHeight: 18,
    color: "#00ff00",
    textAlign: "center",
    includeFontPadding: false,
  },
  centerBox: {
    position: "absolute",
    top: "36%",
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  // base name appearance
  nameBase: {
    fontSize: 44,
    fontWeight: "800",
    color: "#00ff00",
    textShadowColor: "#00ff00",
    textShadowRadius: 18,
    letterSpacing: 2,
  },
  neonText: {
    // extra neon look via shadow (Android/iOS differences exist)
    textShadowOffset: { width: 0, height: 0 },
  },
  // glitch overlay
  nameGlitch: {
    position: "absolute",
    top: 0,
    fontSize: 44,
    fontWeight: "800",
    textShadowRadius: 12,
    opacity: 0,
    letterSpacing: 2,
  },

  collegeText: {
    marginTop: 12,
    fontSize: 18,
    color: "#9fffb2",
    opacity: 0.85,
    textAlign: "center",
  },

  card: {
    marginTop: 18,
    borderWidth: 1,
    borderColor: "#00ff66",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.25)",
    shadowColor: "#00ff66",
    shadowOpacity: 0.18,
    shadowRadius: 10,
  },
  cardLine: {
    color: "#00ff66",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  cardUSN: {
    marginTop: 6,
    color: "#7ef3b3",
    textAlign: "center",
    letterSpacing: 1,
  },

  popup: {
    position: "absolute",
    top: 72,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#00ff66",
    alignItems: "center",
  },
  popupText: {
    color: "#c7ffd9",
    fontSize: 12,
    fontWeight: "700",
  },
  popupGreen: {
    marginTop: 6,
    color: "#7bf78f",
    letterSpacing: 1,
  },

  quoteBox: {
    position: "absolute",
    bottom: 22,
    left: 12,
    right: 12,
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "rgba(0,0,0,0.28)",
    borderWidth: 1,
    borderColor: "rgba(0,255,130,0.08)",
  },
  quoteText: {
    color: "#8aff9f",
    fontSize: 13,
    textAlign: "center",
    fontWeight: "600",
  },
});


