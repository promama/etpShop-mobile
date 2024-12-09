import { Slot } from "expo-router";
import { View } from "react-native";

export default function DetailsLayout() {
  return (
    <View className="mt-10 bg-blue-100 flex-1">
      <Slot></Slot>
    </View>
  );
}
