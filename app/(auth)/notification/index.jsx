import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

function index() {
  const listNotify = useSelector((state) => state.user.notificationList);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView className="mt-10 ml-5 mr-5">
        <Text>notification page</Text>
        {listNotify
          .slice(0)
          .reverse()
          .map((noti) => {
            let backgroundColor = "blue-100";
            let textColor = "black";
            let message = "";
            if (noti.isRead === false) {
              backgroundColor = "#e1f5ef";
            }
            if (noti.status === "Finish") {
              message = " is completed";
              textColor = "green";
            } else if (noti.status === "Waiting approve") {
              message = " is waiting for approve";
              textColor = "#ff6500";
            } else if (noti.status === "Delivering") {
              message = " is delivering to you, please check your phone";
              textColor = "#00f6ff";
            }
            return (
              <Pressable
                key={noti._id}
                onPress={() => router.push(`purchases/${noti.orderId}`)}
              >
                <View
                  className="flex"
                  style={{ backgroundColor: backgroundColor, marginTop: 2 }}
                >
                  <Text>Your order {noti.orderId}</Text>
                  <Text style={{ color: textColor }}>{message}</Text>
                  <View className="ml-auto">
                    <Text>{noti.last_update}</Text>
                  </View>
                  <View style={styles.horizontal_ruler}></View>
                </View>
              </Pressable>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal_ruler: {
    marginTop: 10,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default index;
