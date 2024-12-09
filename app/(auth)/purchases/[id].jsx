import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { searchOrder } from "../../../slices/cartSlice";
import Purchases, {
  checkStatus,
} from "../../../components/Purchases/Purchases";

function purchasesDetail(props) {
  const params = useLocalSearchParams();
  const singleOrderDetail = useSelector(
    (state) => state.cart.singleOrderDetail
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchOrder(params.id));
  }, [dispatch]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView className="mt-10 ml-5 mr-5">
        <Text>Purchases detail page</Text>

        <Text>Delivery information</Text>

        {/* Items in purchases */}
        <Purchases orders={singleOrderDetail} />

        <Text>Delivery to: </Text>
        <View className="flex-row mt-2">
          {/* Name */}
          <Text>{singleOrderDetail.name}</Text>
          <View style={styles.vertical_ruler}></View>

          {/* Phone number */}
          <Text>{singleOrderDetail.phoneNumber}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          {/* Address */}
          <Text>{singleOrderDetail.address}</Text>
        </View>
        {/*
        <Pressable onPress={() => alert(JSON.stringify({ singleOrderDetail }))}>
          <Text>testing</Text>
        </Pressable> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 23,
    color: "blue",
  },
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
});

export default purchasesDetail;
