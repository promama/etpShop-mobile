import React from "react";
import { Text, View, StyleSheet } from "react-native";
import SingleOrder from "./SingleOrder";
import { currencyFormat } from "../../utils/formatCurrency";

function Purchases(props) {
  return (
    <View className="mt-3">
      {/* Purchases infos */}
      <View className="flex-row mb-2">
        {/* Purchases Id */}
        <Text>Id: {props.orders.orderId}</Text>
        {/* Purchases status */}
        <Text
          className="ml-auto"
          style={{ color: checkStatus(props.orders.status) }}
        >
          {props.orders.status}
        </Text>
      </View>
      {/* Show each product in purchases */}
      {props.orders.productInOrder &&
        props.orders.productInOrder.map((product) => {
          return (
            <View className="mb-3" key={product._id + product.orderId}>
              <SingleOrder product={product} />
            </View>
          );
        })}
      {/* Total amount */}
      <View className="ml-auto flex-row">
        <Text>Total: </Text>
        <Text style={{ color: "red" }}>
          {currencyFormat(props.orders?.total)}
        </Text>
      </View>
      <View style={styles.horizontal_ruler}></View>
    </View>
  );
}

export function checkStatus(status) {
  if (status === "In cart") {
    return "blue";
  } else if (status === "Waiting approve") {
    return "#ff6500";
  } else if (status === "Delivering") {
    return "#00f6ff";
  } else if (status === "Finish") {
    return "#1bff00";
  } else return "#ff2525";
}

const styles = StyleSheet.create({
  horizontal_ruler: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Purchases;
