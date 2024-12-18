import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import ProductImage from "../ProductImage";
import formatCurrency, { currencyFormat } from "../../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { reset } from "../../slices/userSlice";
import { addToCartFetch, subtractToCartFetch } from "../../slices/cartSlice";

function CartItem(props) {
  const isLoading = useSelector((state) => state.cart.isLoading);
  const email = useSelector((state) => state.user.email);
  const access_token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  const addMoreToCart = async () => {
    try {
      const res = await dispatch(
        addToCartFetch({
          productId: { id: props.productId },
          color: props.color,
          size: props.size,
          quantity: 1,
          email,
          access_token,
        })
      ).unwrap();
      alert(res.message);
    } catch (err) {
      alert(err.message);
      if (err.message === "signin again") {
        dispatch(reset());
      }
    }
  };

  const subtractLessToCart = async () => {
    try {
      const res = await dispatch(
        subtractToCartFetch({
          productId: { id: props.productId },
          color: props.color,
          size: props.size,
          quantity: 1,
          email,
          access_token,
        })
      ).unwrap();
      alert(res.message);
    } catch (err) {
      alert(err.message);
      if (err.message === "signin again") {
        dispatch(reset());
      }
    }
  };

  const removeFromCart = async () => {
    try {
      const res = await dispatch(
        subtractToCartFetch({
          productId: { id: props.productId },
          color: props.color,
          size: props.size,
          quantity: props.quantity,
          email,
          access_token,
        })
      ).unwrap();
      alert(res.message);
    } catch (err) {
      alert(err.message);
      if (err.message === "signin again") {
        dispatch(reset());
      }
    }
  };

  return (
    <View>
      <View className="flex-row">
        {/* Item image */}
        <View style={{ width: 80, marginRight: 3 }}>
          <ProductImage url={props.url} />
        </View>
        {/* Item details */}
        <View>
          <View className="flex-row">
            {/* Item name */}
            <Text>{props.productName} </Text>
            {/* Item quantity */}
            <Text style={{ color: "gray" }}>x{props.quantity}</Text>
          </View>
          {/* Item price */}
          <Text>${props.price}</Text>
          {/* Item color */}
          <View
            style={{
              borderRadius: 10,
              width: 20,
              height: 20,
              backgroundColor: props.color.toString().toLowerCase(),
            }}
          ></View>
          {/* Item size */}
          <Text>size: {props.size}</Text>
        </View>
      </View>

      {/* show button add, subtract, removee here */}
      {!isLoading ? (
        <View className="ml-auto">
          <View className="flex flex-row">
            <Pressable
              className="border p-2 mr-2"
              style={styles.btn_add_subtract}
              onPress={() => subtractLessToCart()}
            >
              <Text style={{ color: "blue", textAlign: "center" }}>-</Text>
            </Pressable>
            <Pressable
              className="border p-2 mr-2"
              style={styles.btn_add_subtract}
              onPress={() => addMoreToCart()}
            >
              <Text style={{ color: "blue", textAlign: "center" }}>+</Text>
            </Pressable>
            <Pressable
              className="border p-2 mr-2"
              style={styles.btn_remove}
              onPress={() => removeFromCart()}
            >
              <Text
                style={{
                  color: "red",
                  textAlign: "center",
                }}
              >
                x
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <Text>Loading...!</Text>
      )}
      {/* Total amount of item */}
      <Text className="ml-auto">
        {currencyFormat(props.quantity * props.price)}
      </Text>
      <View style={styles.horizontal_ruler}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal_ruler: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  btn_add_subtract: {
    borderRadius: 10,
    width: 35,
    height: 35,
    borderColor: "blue",
  },
  btn_remove: {
    borderRadius: 10,
    width: 35,
    height: 35,
    borderColor: "red",
  },
});

export default CartItem;
