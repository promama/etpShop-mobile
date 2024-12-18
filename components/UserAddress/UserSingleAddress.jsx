import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddNewAddress,
  fetchUserDeleteAddress,
  fetchUserSetDefaultAddress,
  reset,
} from "../../slices/userSlice";
import { router } from "expo-router";

function UserSingleAddress(props) {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const email = useSelector((state) => state.user.email);

  const [enableEdit, setEnableEdit] = useState(false);
  const [name, setName] = useState(props.name);
  const [phoneNumber, setPhonenumber] = useState(props.phoneNumber);
  const [address, setAddress] = useState(props.address);

  const handleAddNewAddress = async () => {
    setEnableEdit(!enableEdit);
    try {
      const res = await dispatch(
        fetchAddNewAddress({
          name,
          phoneNumber,
          address,
          addressId: props.id,
          access_token: token,
          email,
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
    <View className="mt-2">
      <View className="flex-row">
        {/* Name */}
        <TextInput
          editable={enableEdit}
          onChangeText={(value) => setName(value)}
        >
          {name}
        </TextInput>
        <View style={styles.vertical_ruler}></View>

        {/* Phone number */}
        <TextInput
          editable={enableEdit}
          onChangeText={(value) => setPhonenumber(value)}
          keyboardType="phone-pad"
        >
          {phoneNumber}
        </TextInput>
      </View>
      <View style={{ marginTop: 10 }}>
        {/* Address */}
        <TextInput
          editable={enableEdit}
          onChangeText={(value) => setAddress(value)}
        >
          {address}
        </TextInput>
      </View>

      {/* CRUD */}
      {props.isDefault ? (
        // Default address
        <View>
          {/* label default */}
          <Text className="border pl-2 pr-2" style={styles.txt_default}>
            Default
          </Text>
          {/* Buttons */}
          {enableEdit ? (
            <View className="flex-row">
              {/* Button cancel */}
              <Pressable
                className="border p-2 mr-2"
                style={styles.btn_cancel}
                onPress={() => {
                  setEnableEdit(!enableEdit);
                  setName(props.name);
                  setPhonenumber(props.phoneNumber);
                  setAddress(props.address);
                }}
              >
                <Text style={{ color: "red" }}>Cancel</Text>
              </Pressable>
              {/* button save update*/}
              <Pressable
                className="border p-2 mr-2"
                style={styles.btn_save}
                onPress={handleAddNewAddress}
              >
                <Text style={{ color: "blue" }}>Save change</Text>
              </Pressable>
            </View>
          ) : (
            // Button update
            <Pressable
              className="border p-2 mr-2"
              style={styles.btn_update}
              onPress={() => {
                setEnableEdit(!enableEdit);
              }}
            >
              <Text style={{ color: "green" }}>Update</Text>
            </Pressable>
          )}
        </View>
      ) : (
        // Not default address
        <View className="flex-row">
          {/* Buttons */}
          {enableEdit ? (
            <View className="flex-row">
              {/* Button cancel */}
              <Pressable
                className="border p-2 mr-2"
                style={styles.btn_cancel}
                onPress={() => {
                  setEnableEdit(!enableEdit);
                  setName(props.name);
                  setPhonenumber(props.phoneNumber);
                  setAddress(props.address);
                }}
              >
                <Text style={{ color: "red" }}>Cancel</Text>
              </Pressable>
              {/* Button save edit */}
              <Pressable
                className="border p-2 mr-2"
                style={styles.btn_save}
                onPress={handleAddNewAddress}
              >
                <Text style={{ color: "blue" }}>Save change</Text>
              </Pressable>
            </View>
          ) : (
            // Button update
            <Pressable
              className="border p-2 mr-2"
              style={styles.btn_update}
              onPress={() => {
                setEnableEdit(!enableEdit);
              }}
            >
              <Text style={{ color: "green" }}>Update</Text>
            </Pressable>
          )}

          {/* hide wnen editing */}
          {/* button set default address */}
          {!enableEdit && (
            // Button set address as default
            <Pressable
              className="border p-2 mr-2"
              style={styles.btn_default}
              onPress={() =>
                Alert.alert(
                  "Set this address as default?",
                  name + " - " + phoneNumber + " - " + address,
                  [
                    { text: "Cancel" },
                    {
                      text: "Confirm",
                      onPress: async () => {
                        dispatch(
                          fetchUserSetDefaultAddress({
                            _id: props.id,
                            access_token: token,
                            email,
                          })
                        );
                      },
                    },
                  ]
                )
              }
            >
              <Text style={{ color: "purple" }}>Set default</Text>
            </Pressable>
          )}

          {/* hide when editing */}
          {/* button delete address */}
          {!enableEdit && (
            // Button delete address
            <Pressable
              className="border p-2"
              style={styles.btn_delete}
              onPress={() =>
                Alert.alert(
                  "Delete this address?",
                  name + " - " + phoneNumber + " - " + address,
                  [
                    { text: "Cancel" },
                    {
                      text: "Delete",
                      onPress: async () => {
                        dispatch(
                          fetchUserDeleteAddress({
                            _id: props.id,
                            access_token: token,
                            email,
                          })
                        );
                      },
                    },
                  ]
                )
              }
            >
              <Text style={{ color: "orange" }}>Delete</Text>
            </Pressable>
          )}
        </View>
      )}
      <View style={styles.horizontal_ruler}></View>
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
  txt_default: {
    marginTop: 10,
    alignSelf: "flex-start",
    borderColor: "red",
    color: "red",
  },
  btn_update: {
    alignSelf: "flex-start",
    marginTop: 10,
    borderRadius: 10,
    borderColor: "green",
  },
  btn_default: {
    marginTop: 10,
    borderRadius: 10,
    borderColor: "purple",
  },
  btn_delete: {
    marginTop: 10,
    borderRadius: 10,
    borderColor: "orange",
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

export default UserSingleAddress;
