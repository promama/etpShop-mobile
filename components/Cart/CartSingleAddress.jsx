import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { setOrderAddress } from "../../slices/userSlice";

function CartSingleAddress(props) {
  const dispatch = useDispatch();

  const [name, setName] = useState(props.address.name);
  const [phoneNumber, setPhonenumber] = useState(props.address.phoneNumber);
  const [address, setAddress] = useState(props.address.address);

  return (
    <View className="mb-2">
      <Pressable
        onPress={() => {
          try {
            props.parentCallback({
              isShow: false,
              chosenAddress: props.address,
            });
            dispatch(setOrderAddress({ addressInfos: props.address }));
          } catch (err) {}
        }}
      >
        <View className="flex-row">
          {/* Name */}
          <TextInput editable={false} onChangeText={(value) => setName(value)}>
            {name}
          </TextInput>
          <View style={styles.vertical_ruler}></View>

          {/* Phone number */}
          <TextInput
            editable={false}
            onChangeText={(value) => setPhonenumber(value)}
            keyboardType="phone-pad"
          >
            {phoneNumber}
          </TextInput>
        </View>
        <View style={{ marginTop: 10 }}>
          {/* Address */}
          <TextInput
            editable={false}
            onChangeText={(value) => setAddress(value)}
          >
            {address}
          </TextInput>
        </View>
        <View style={styles.horizontal_ruler}></View>
      </Pressable>
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
});

export default CartSingleAddress;
