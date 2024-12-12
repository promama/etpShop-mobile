import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, TextInput } from "react-native";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { fetchChangeUserProfile, reset } from "../slices/userSlice";
import { router } from "expo-router";

function UserShortProfile() {
  const dispatch = useDispatch();

  const email = useSelector((state) => state.user.email);
  const phoneNumber = useSelector((state) => state.user.phoneNumber);
  const gender = useSelector((state) => state.user.gender);
  const dob = useSelector((state) => state.user.dob);
  const isLoading = useSelector((state) => state.user.isLoading);
  const token = useSelector((state) => state.user.token);

  const [enableEdit, setEnableEdit] = useState("none");
  const [number, setNumber] = useState(phoneNumber);
  const [genderValue, setGenderValue] = useState(gender);
  const [dateOfBirth, setDateOfBirth] = useState(dob);

  // date picker props
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Data for gender
  const genderData = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  // Toggle show or hide date picker
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  // handle set date
  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        setDateOfBirth(formatDate(currentDate));
        // setDateOfBirth(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  // formating date
  const formatDate = (rawDate) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${day}/${month}/${year}`;
  };

  // handle allow update or not
  const handleUpdateProfile = () => {
    if (enableEdit == "none") {
      setEnableEdit("auto");
    } else {
      setEnableEdit("none");
    }
  };

  // handle save update
  const handleSubmit = async () => {
    // alert(
    //   JSON.stringify({
    //     phone: phoneNumber,
    //     gender: genderValue,
    //     dob:
    //       parseInt(dateOfBirth.split("/")[0]) +
    //       "/" +
    //       parseInt(dateOfBirth.split("/")[1]) +
    //       "/" +
    //       dateOfBirth.split("/")[2],
    //     access_token: token,
    //   })
    // );
    try {
      const res = await dispatch(
        fetchChangeUserProfile({
          phone: number,
          gender: genderValue,
          dob:
            parseInt(dateOfBirth.split("/")[0]) +
            "/" +
            parseInt(dateOfBirth.split("/")[1]) +
            "/" +
            dateOfBirth.split("/")[2],
          access_token: token,
          email,
        })
      ).unwrap();
      setEnableEdit("none");
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
    <View>
      {/* Profile detail */}
      <Text style={styles.header}>My profile:</Text>
      {/* Profile email UNCHANGEABLE */}
      <View className="flex-row mt-2" pointerEvents={enableEdit}>
        <Text>Email:</Text>
        <TextInput className="ml-auto" editable={false}>
          {email}
        </TextInput>
      </View>
      <View style={styles.horizontal_ruler}></View>
      {/* Phone number */}
      <View className="flex-row  mt-2" pointerEvents={enableEdit}>
        <Text>Phone number:</Text>
        <TextInput
          className="ml-auto"
          keyboardType="phone-pad"
          editable={enableEdit == "none" ? false : true}
          onChangeText={(value) => {
            setNumber(value);
          }}
        >
          {number}
        </TextInput>
      </View>
      <View style={styles.horizontal_ruler}></View>
      {/* Gender */}
      <View className="flex-row items-center mt-2" pointerEvents={enableEdit}>
        <Text>Gender:</Text>
        <View className="ml-auto w-36">
          {/* react native picker select */}
          <RNPickerSelect
            key={email}
            items={genderData}
            value={genderValue}
            placeholder={{ label: genderValue }}
            onValueChange={(value) => {
              setGenderValue(value);
            }}
          ></RNPickerSelect>
        </View>
      </View>
      <View style={styles.horizontal_ruler}></View>
      {/* Date of birth */}
      <View className="flex-row  mt-2" pointerEvents={enableEdit}>
        <Text>Date of birth:</Text>
        {/* Date picker */}
        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChange}
            maximumDate={new Date("2010-12-31")}
            minimumDate={new Date("1900-1-1")}
          />
        )}

        {!showPicker && (
          <Pressable className="ml-auto" onPress={toggleDatePicker}>
            <TextInput editable={false}>{dateOfBirth}</TextInput>
          </Pressable>
        )}
      </View>
      <View style={styles.horizontal_ruler}></View>
      {/* Buttons */}
      {enableEdit == "none" ? (
        // Button edit
        <View>
          <Pressable
            className="border p-2 mr-2"
            style={styles.btn_update}
            onPress={() => handleUpdateProfile()}
          >
            <Text style={{ color: "green" }}>Update</Text>
          </Pressable>
        </View>
      ) : (
        <View className="flex-row">
          {/* Button cancel */}
          <Pressable
            className="border p-2 mr-2"
            style={styles.btn_cancel}
            onPress={() => {
              handleUpdateProfile();
              setDateOfBirth(dob);
            }}
          >
            <Text style={{ color: "red" }}>Cancel</Text>
          </Pressable>
          {/* Button Save */}
          <Pressable
            className="border p-2 mr-2"
            style={styles.btn_save}
            onPress={() => handleSubmit()}
          >
            <Text style={{ color: "blue" }}>Save change</Text>
          </Pressable>
        </View>
      )}
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
  btn_update: {
    alignSelf: "flex-start",
    marginTop: 10,
    borderRadius: 10,
    borderColor: "green",
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

export default UserShortProfile;
