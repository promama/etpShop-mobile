import { router, Slot } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchVerify, reset } from "../../slices/userSlice";

export default function DetailsLayout() {
  const dispatch = useDispatch();
  const allowAccess = useSelector((state) => state.user.allowAccess);
  const message = useSelector((state) => state.user.message);
  const token = useSelector((state) => state.user.token);
  const email = useSelector((state) => state.user.email);

  useEffect(() => {
    try {
      dispatch(fetchVerify({ access_token: token, email }));
    } catch (err) {
      alert(err.message);
      dispatch(reset());
    }
  }, [dispatch]);

  return (
    <View className=" bg-blue-100 flex-1">
      {allowAccess ? (
        <Slot></Slot>
      ) : (
        <View className="flex justify-center items-center text-center mt-100">
          <Text className="mt-56 items-center">You need to sign in</Text>
          <Pressable
            className="mt-2 p-4 bg-blue-400 rounded-md"
            onPress={() => router.push("/signin")}
          >
            <Text className="text-white">Sign in</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
