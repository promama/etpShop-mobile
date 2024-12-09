import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native";
import ProductImage from "../ProductImage";
import formatCurrency, { currencyFormat } from "../../utils/formatCurrency";

function CartItem(props) {
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
});

export default CartItem;
