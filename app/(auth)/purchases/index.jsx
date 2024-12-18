import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { reset } from "../../../slices/userSlice";
import { dropCart, showAllOrder } from "../../../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Purchases from "../../../components/Purchases/Purchases";
import { router } from "expo-router";

function purchases() {
  const dispatch = useDispatch();

  const listOrders = useSelector((state) => state.cart.orders);
  const listStatusCount = useSelector((state) => state.cart.listStatusCount);
  const isLoading = useSelector((state) => state.cart.isLoading);
  const token = useSelector((state) => state.user.token);
  const email = useSelector((state) => state.user.email);

  const [showing, setShowing] = useState([1, 0, 0, 0, 0]); //default show all
  const [showPurchasesType, setShowPurchasesType] = useState("");

  useEffect(() => {
    try {
      dispatch(showAllOrder({ access_token: token, email })).unwrap();
    } catch (err) {
      if (err.message === "signin again") {
        dispatch(reset());
      }
    }
  }, [dispatch]);

  //Change show by change array
  const handleChangeShowCartType = (index) => {
    const newShowing = showing.map((value, i) => {
      if (i === index) {
        return 1;
      } else {
        return 0;
      }
    });
    setShowing(newShowing);
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView className="mt-10 ml-5 mr-5">
        <Text>Purchases page</Text>
        <Pressable onPress={() => alert(listStatusCount[0])}>
          <Text>show listStatus</Text>
        </Pressable>
        {/* Create horizontial scroll for purchases type */}
        <ScrollView
          className="flex mt-2"
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View className="flex-row justify-between">
            {/* All purchases */}
            <Text
              style={showing[0] ? styles.show_order : styles.order}
              onPress={() => {
                handleChangeShowCartType(0);
                setShowPurchasesType("");
              }}
            >
              All purchases ({listStatusCount[0]})
            </Text>

            {/* Waiting approve */}
            <Text
              style={showing[1] ? styles.show_order : styles.order}
              onPress={() => {
                handleChangeShowCartType(1);
                setShowPurchasesType("Waiting approve");
              }}
            >
              Waiting approve ({listStatusCount[1]})
            </Text>

            {/* Delivering */}
            <Text
              style={showing[2] ? styles.show_order : styles.order}
              onPress={() => {
                handleChangeShowCartType(2);
                setShowPurchasesType("Delivering");
              }}
            >
              Delivering ({listStatusCount[2]})
            </Text>

            {/* Cancel */}
            <Text
              style={showing[3] ? styles.show_order : styles.order}
              onPress={() => {
                handleChangeShowCartType(3);
                setShowPurchasesType("Cancelled");
              }}
            >
              Cancel ({listStatusCount[3]})
            </Text>

            {/* Finish */}
            <Text
              style={showing[4] ? styles.show_order : styles.order}
              onPress={() => {
                handleChangeShowCartType(4);
                setShowPurchasesType("Finish");
              }}
            >
              Finish ({listStatusCount[4]})
            </Text>
          </View>
        </ScrollView>
        {listOrders && showPurchasesType === ""
          ? // Show all purchases
            listOrders
              ?.slice(0)
              .reverse()
              .map((order) => {
                return (
                  <View key={order.orderId}>
                    <Pressable
                      onPress={() => router.push(`purchases/${order.orderId}`)}
                    >
                      <Purchases orders={order} />
                    </Pressable>
                  </View>
                );
              })
          : // Show purchases by status
            listOrders
              ?.slice(0)
              .reverse()
              .map((order) => {
                if (order.status === showPurchasesType) {
                  return (
                    <View key={order.orderId}>
                      <Pressable
                        onPress={() =>
                          router.push(`purchases/${order.orderId}`)
                        }
                      >
                        <Purchases orders={order} />
                      </Pressable>
                    </View>
                  );
                }
              })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  show_order: {
    marginRight: 10,
    marginLeft: 10,
    color: "red",
    fontSize: 18,
  },
  order: {
    marginRight: 10,
    marginLeft: 10,
    color: "black",
    fontSize: 18,
  },
});

export default purchases;
