import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { reset } from "../../slices/userSlice";
import { dropCart } from "../../slices/cartSlice";
import UserShortProfile from "../../components/UserShortProfile";
import UserAddress from "../../components/UserAddress/UserAddress";

function profile() {
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView className="mt-10 ml-5 mr-5">
        <Text>profile page</Text>
        <Pressable
          onPress={() => {
            dispatch(reset());
            dispatch(dropCart());
          }}
        >
          <Text>log out</Text>
        </Pressable>
        {/* Show Profile */}
        <UserShortProfile />
        {/* Show Address */}
        <UserAddress />
      </ScrollView>
    </View>
  );
}

export default profile;
