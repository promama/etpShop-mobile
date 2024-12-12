import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductImage from "../ProductImage";
import { currencyFormat } from "../../utils/formatCurrency";
import StarRating from "react-native-star-rating-widget";
import { reset } from "../../slices/userSlice";
import { fetchRatingProduct } from "../../slices/cartSlice";

function SingleOrder(props) {
  const isLoading = useSelector((state) => state.user.isLoading);
  const token = useSelector((state) => state.user.token);
  const email = useSelector((state) => state.user.email);
  const dispatch = useDispatch();

  const [value, setValue] = useState(parseInt(props.product.rating) || 0);

  // Rate product stars
  const handleRatingProduct = async () => {
    try {
      alert("rating");
      await dispatch(
        fetchRatingProduct({
          _id: props.product._id,
          productId: props.product.productId,
          rating: value,
          access_token: token,
          email,
        })
      ).unwrap();
      alert("Rating success");
    } catch (err) {
      alert(err.message);
      if (err.message === "signin again") {
        dispatch(reset());
        navigate("/login");
      }
    }
  };
  return (
    <View>
      <View className="flex-row items-center">
        {/* Product image */}
        <View style={{ width: 80, marginRight: 3 }}>
          <ProductImage url={props.product?.url} />
        </View>
        {/* Product details */}
        <View>
          <View className="flex-row">
            {/* Product name */}
            <Text>{props.product?.productName} </Text>
            {/* Product quantity */}
            <Text style={{ color: "gray" }}>x{props.product?.quantity}</Text>
          </View>
          {/* Product price */}
          <Text>{currencyFormat(props.product?.price)}</Text>
          {/* Product color */}
          <View
            style={{
              borderRadius: 10,
              width: 20,
              height: 20,
              backgroundColor: props.product.color.toString().toLowerCase(),
            }}
          ></View>
          {/* Product size */}
          <Text>size: {props.product?.size}</Text>
        </View>
        {/* Product total amount */}
        <Text className="ml-auto">
          {currencyFormat(props.product?.quantity * props.product?.price)}
        </Text>
      </View>
      {/* Check if product is finished and avalible to rate */}
      <View className="mt-2">
        {props.product?.status === "Finish" &&
          (!isLoading ? (
            <>
              <View pointerEvents={props.product.allowRating ? "auto" : "none"}>
                <StarRating
                  rating={value}
                  onChange={setValue}
                  enableHalfStar={false}
                />
              </View>
              {props.product.allowRating && (
                <Pressable
                  className="border p-2 mt-1 mr-auto rounded-lg border-blue-800"
                  onPress={() => handleRatingProduct()}
                >
                  <Text className="text-blue-800">Submit rating</Text>
                </Pressable>
              )}
            </>
          ) : (
            <Text>Loading...</Text>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    width: 100,
  },
});

export default SingleOrder;
