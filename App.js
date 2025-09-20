import React from "react";
import { ScrollView } from "react-native";
import CounterApp from "./CounterApp";
import ColorChangerApp from "./ColorChangerApp";

export default function App() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <CounterApp />
      <ColorChangerApp />
    </ScrollView>
  );
}
