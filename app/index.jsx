import { Link, router, Stack } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { allProductsFetch } from "../slices/productsSlice";
import ItemCard from "../components/ItemCard";
import { reset, setToken } from "../slices/userSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import io from "socket.io-client";
import { socket } from "../components/socket";

function index() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items) || "";
  const isLoading = useSelector((state) => state.products.isLoading);
  const status = useSelector((state) => state.user.status);
  const email = useSelector((state) => state.user.email);

  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(allProductsFetch());
  }, [dispatch]);

  const filteredProduct = useMemo(() => {
    return products.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
  }, [products, query]);

  //socket thing
  const [chatMessage, setChatMessage] = useState("asdfasdf");
  const [responseMessage, setResponseMessage] = useState("waiting response");

  useEffect(() => {
    //connect to socket server
    socket.on("connect");

    //listen to "server saying: "
    try {
      socket.on("server saying: ", (message) => {
        setResponseMessage(message);
      });
    } catch {}
  });

  function submitSendMessage() {
    //send message to server
    socket.emit("user:join", { room: email });
    setChatMessage("");
  }

  return (
    <View className="bg-blue-100 flex-1">
      <Text className="mt-10 mb-2 ml-2" style={{ fontSize: 23, color: "blue" }}>
        Home page
      </Text>
      {/* Search bar */}
      <TextInput
        onChangeText={(e) => setQuery(e)}
        className="bg-white ml-2 mr-2"
      ></TextInput>

      {/* Show all products */}
      {!isLoading ? (
        <FlatList
          className="flex flex-col"
          data={filteredProduct}
          renderItem={({ item }) => <ItemCard productInfos={item} />}
          keyExtractor={(item) => item.name}
          numColumns={2}
        ></FlatList>
      ) : (
        <ActivityIndicator size="large" color="blue"></ActivityIndicator>
      )}
    </View>
  );
}

export default index;
