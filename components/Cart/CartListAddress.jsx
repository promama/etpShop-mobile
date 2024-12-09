import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import CartSingleAddress from "./CartSingleAddress";

function CartListAddress() {
  const addresses = useSelector((state) => state.user.addresses);

  const [isShow, setIsShow] = useState(false);
  const [chosenAddress, setChosenAddress] = useState({});

  const handleReceive = (childData) => {
    setIsShow(childData.isShow);
    setChosenAddress(childData.chosenAddress);
  };

  return (
    <View>
      <Text className="mb-2">Deliver to: </Text>
      {!isShow && chosenAddress.address && (
        <CartSingleAddress address={chosenAddress} isChosen={true} />
      )}
      {isShow &&
        addresses &&
        addresses.map((address) => {
          return (
            <CartSingleAddress
              address={address}
              isChosen={false}
              parentCallback={handleReceive}
              key={address.name + address.phoneNumber + address.address}
            ></CartSingleAddress>
          );
        })}
      {isShow ? (
        <Pressable
          className="border p-2"
          style={styles.btn_cancel}
          onPress={() => setIsShow(!isShow)}
        >
          <Text style={{ color: "red" }}>Cancel</Text>
        </Pressable>
      ) : (
        <Pressable
          className="border p-2"
          style={styles.btn_save}
          onPress={() => setIsShow(!isShow)}
        >
          <Text style={{ color: "blue" }}>
            {chosenAddress.address
              ? "Choose another address"
              : "Choose an address"}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btn_cancel: {
    alignSelf: "flex-start",
    marginTop: 10,
    borderRadius: 10,
    borderColor: "red",
  },
  btn_save: {
    alignSelf: "flex-start",
    marginTop: 10,
    borderRadius: 10,
    borderColor: "blue",
  },
});

export default CartListAddress;
