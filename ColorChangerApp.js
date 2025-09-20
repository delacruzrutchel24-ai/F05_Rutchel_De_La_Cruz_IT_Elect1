import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";

export default function App() {
  const [bgColor, setBgColor] = useState("white");

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.button}>
        <Button title="White" onPress={() => setBgColor("white")} />
      </View>
      <View style={styles.button}>
        <Button title="Blue" onPress={() => setBgColor("lightblue")} />
      </View>
      <View style={styles.button}>
        <Button title="Green" onPress={() => setBgColor("lightgreen")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginVertical: 10, // spacing between buttons
    width: 150,         // optional uniform width
  },
});
