import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { socket } from "../components/socket";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnreadNotification, setNotificaition } from "../slices/userSlice";

function MyNavBar() {
  const params = useLocalSearchParams();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);
  const listNotify = useSelector((state) => state.user.notificationList);
  const unreadNotify = useSelector((state) => state.user.unreadNotify || 0);

  useEffect(() => {
    dispatch(fetchUnreadNotification({ email: email }));
  }, [dispatch, email]);

  useEffect(() => {
    //connect to socket server
    socket.on("connect");

    //user join a room
    socket.emit("user:join", { room: email });

    //confirming order
    socket.on("server:confirmed-order", (message) => {
      dispatch(setNotificaition(message.notify));
      alert(message.message);
    });

    //listen to manager confirm order change status to delivering
    socket.on("server:manager-approved-order", (message) => {
      dispatch(setNotificaition(message));
      alert(message.message);
    });

    //finish order
    socket.on("server:finish-order", (message) => {
      dispatch(setNotificaition(message));
      alert(message.message);
    });

    //deliver take order
    socket.on("user:order-taken", (message) => {
      dispatch(setNotificaition(message));
      alert(message.message);
    });

    //deliver finish order
    socket.on("user:deliver-finish-order", (message) => {
      dispatch(setNotificaition(message));
      alert(message.message);
    });

    //deliver cancel order
    socket.on("user:deliver-cancel-order", (message) => {
      dispatch(setNotificaition(message));
      alert(message.message);
    });
  });
  return (
    <View className="items-center justify-around flex flex-row bg-blue-100 pb-2">
      {/* Nav Home */}
      <Pressable className="items-center" onPress={() => router.push("/")}>
        <MaterialCommunityIcons
          style={{ fontSize: 30 }}
          name="home"
          color="blue"
        ></MaterialCommunityIcons>
        <Text>Home</Text>
      </Pressable>
      {/* Nav Cart */}
      <Pressable className="items-center" onPress={() => router.push("/cart")}>
        <MaterialCommunityIcons
          style={{ fontSize: 30 }}
          name="cart"
          color="blue"
        ></MaterialCommunityIcons>
        <Text>Cart</Text>
      </Pressable>
      {/* Nav Notification */}
      <Pressable
        className="items-center"
        onPress={() => router.push("/notification")}
      >
        <MaterialCommunityIcons
          style={{ fontSize: 30 }}
          name="bell"
          color="blue"
        ></MaterialCommunityIcons>
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: "red",
          }}
        >
          <Text className="text-white items-center">{unreadNotify}</Text>
        </View>
        <Text>Notify</Text>
      </Pressable>
      {/* Nav Purchases */}
      <Pressable
        className="items-center"
        onPress={() => router.push("/purchases")}
      >
        <MaterialCommunityIcons
          style={{ fontSize: 30 }}
          name="list-status"
          color="blue"
        ></MaterialCommunityIcons>
        <Text>Purchases</Text>
      </Pressable>
      {/* Nav Profile */}
      <Pressable
        className="items-center"
        onPress={() => router.push("/profile")}
      >
        <MaterialCommunityIcons
          style={{ fontSize: 30 }}
          name="account"
          color="blue"
        ></MaterialCommunityIcons>
        <Text>Me</Text>
      </Pressable>
    </View>
  );
}

export default MyNavBar;
