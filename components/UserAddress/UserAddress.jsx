import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddNewAddress,
  fetchGetAllAddress,
  reset,
} from "../../slices/userSlice";
import UserSingleAddress from "./UserSingleAddress";
import { router } from "expo-router";

function UserAddress() {
  const dispatch = useDispatch();

  const addresses = useSelector((state) => state.user.addresses);
  const message = useSelector((state) => state.user.message);
  const token = useSelector((state) => state.user.token);

  const [addNewAddress, setAddNewAddress] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    try {
      dispatch(fetchGetAllAddress({ access_token: token }));
    } catch (err) {
      alert(message);
      if (message === "signin again") {
        dispatch(reset());
      }
    }
  }, [dispatch]);

  // handle add new address
  const handleAddNewAddress = async () => {
    setAddNewAddress(!addNewAddress);
    try {
      const res = await dispatch(
        fetchAddNewAddress({
          name,
          phoneNumber,
          address,
          access_token: token,
        })
      ).unwrap();
      alert(res.message);
    } catch (err) {
      alert(err.message);
      if (err.message === "signin again") {
        dispatch(reset());
        router.push("/signin");
      }
    }
  };

  return (
    <View className="mt-5">
      <Text style={styles.header}>My address:</Text>
      <View style={styles.horizontal_ruler}></View>
      {addresses &&
        addresses?.map((address) => {
          return (
            <View
              key={
                address._id +
                address.name +
                address.phoneNumber +
                address.address
              }
            >
              {/* Single address */}
              <UserSingleAddress
                name={address.name}
                phoneNumber={address.phoneNumber}
                address={address.address}
                isDefault={address.isDefault}
                id={address._id}
                key={address.name + address.phoneNumber + address._id}
              />
            </View>
          );
        })}
      <View>
        {addNewAddress ? (
          <View>
            {/* Name */}
            <View className="flex-row items-center mt-2">
              <Text>Name: </Text>
              <TextInput
                onChangeText={(value) => setName(value)}
                placeholder="Enter your name"
                style={styles.input}
              >
                {name}
              </TextInput>
            </View>

            {/* Phone number */}
            <View className="flex-row items-center mt-2">
              <Text>Phone number: </Text>
              <TextInput
                onChangeText={(value) => setPhonenumber(value)}
                keyboardType="phone-pad"
                placeholder="Enter your phone number"
                style={styles.input}
              >
                {phoneNumber}
              </TextInput>
            </View>

            {/* Address */}
            <View className="flex-row items-center mt-2">
              <Text>Address: </Text>
              <TextInput
                onChangeText={(value) => setAddress(value)}
                placeholder="Enter your address"
                style={styles.input}
                multiline={true}
                numberOfLines={3}
              >
                {address}
              </TextInput>
            </View>
            {/* Buttons */}
            <View className="flex-row mt-1 flex justify-center">
              {/* Discard create */}
              <Pressable
                className="border p-2 mr-2"
                style={styles.btn_cancel}
                onPress={() => {
                  setAddNewAddress(!addNewAddress);
                }}
              >
                <Text style={{ color: "red" }}>Discard</Text>
              </Pressable>
              {/* Create address */}
              <Pressable
                className="border p-2"
                style={styles.btn_save}
                onPress={handleAddNewAddress}
              >
                <Text style={{ color: "blue" }}>Create</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          // Button show form address to create
          <Pressable
            className="border p-2 "
            style={{
              alignSelf: "center",
              marginTop: 10,
              borderRadius: 10,
              borderColor: "blue",
            }}
            onPress={() => {
              setAddNewAddress(!addNewAddress);
            }}
          >
            <Text style={{ color: "blue" }}>Create new address</Text>
          </Pressable>
        )}
      </View>
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
  input: {
    backgroundColor: "white",
    flex: 1,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
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
export default UserAddress;
