import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  fetchConfirmAndBuy,
  fetchGetAllAddress,
  reset,
} from "../../slices/userSlice";
import { dropCart, showCartItemsFetch } from "../../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/Cart/CartItem";
import { currencyFormat } from "../../utils/formatCurrency";
import RNPickerSelect from "react-native-picker-select";
import CartListAddress from "../../components/Cart/CartListAddress";
import { router } from "expo-router";
import { productColorFetch, productFetch } from "../../slices/productsSlice";

function cart() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const orderId = useSelector((state) => state.cart.orderId);
  const cartItem = useSelector((state) => state.cart.cartItems);
  const amount = useSelector((state) => state.cart.cartTotalAmount);
  const addressInfos = useSelector((state) => state.user.addressInfos);
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    try {
      dispatch(showCartItemsFetch({ access_token: token }));
      dispatch(fetchGetAllAddress({ access_token: token }));
    } catch (err) {
      if (err?.message === "signin again") {
        dispatch(reset());
      }
    }
  }, [dispatch]);

  const handleConfirmAndBuy = async () => {
    try {
      alert("confirm");
      //socket confirm order
      const res = await dispatch(
        fetchConfirmAndBuy({ orderId, addressInfos, access_token: token })
      ).unwrap();
      alert(res.message);
      dispatch(dropCart());
    } catch (err) {
      alert(err.message);
      if (err.message === "signin again") {
        dispatch(reset());
        router.push("/signin");
      }
    }
  };

  const handleBackToProductDetail = (id) => {
    try {
      //const res = await dispatch(productColorFetch({ id: item._id })).unwrap();
      router.push(`/details/${id}`);
    } catch (err) {}
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView className="mt-10 ml-5 mr-5">
        <Text>cart page</Text>
        <Pressable
          onPress={() => {
            dispatch(reset());
            dispatch(dropCart());
          }}
        >
          <Text>log out</Text>
        </Pressable>

        {/* Cart id */}
        <View className="flex-row mb-2">
          <Text>Cart id:</Text>
          <Text className="ml-auto">{orderId}</Text>
        </View>

        <View className="mb-2">
          <CartListAddress></CartListAddress>
        </View>
        {/* 
        <Pressable onPress={() => alert(JSON.stringify(addressInfos))}>
          <Text>Show address Infos</Text>
        </Pressable> */}

        {/* Show list cart */}
        <View>
          {cartItem &&
            cartItem?.map((item) => {
              return (
                <Pressable key={item._id + item.color + item.size}>
                  <CartItem {...item}></CartItem>
                </Pressable>
              );
            })}
          {/* Total amount of cart */}
          <View className="ml-auto flex-row">
            <Text>Total: </Text>
            <Text style={{ color: "red" }}>{currencyFormat(amount)}</Text>
          </View>
        </View>
        <View className="ml-auto mt-2">
          {!isLoading ? (
            <Pressable
              className="border p-2"
              style={styles.btn_save}
              onPress={handleConfirmAndBuy}
            >
              <Text style={{ color: "blue" }}>Confirm & Buy</Text>
            </Pressable>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
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
  vertical_ruler: {
    marginLeft: 10,
    marginRight: 10,
    height: "100%",
    width: 1.2,
    backgroundColor: "#909090",
  },
  btn_save: {
    alignSelf: "flex-start",
    marginTop: 10,
    borderRadius: 10,
    borderColor: "blue",
  },
});

export default cart;
