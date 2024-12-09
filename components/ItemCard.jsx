import { router } from "expo-router";
import { useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import ProductImage from "./ProductImage";
import { useDispatch } from "react-redux";
import { pickColor } from "../slices/productsSlice";
import { currencyFormat } from "../utils/formatCurrency";

function ItemCard(props) {
  const url = props.productInfos.url;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          router.push(`details/${props.productInfos._id}`);
        }}
      >
        {/* Product main image */}
        <ProductImage url={url} />

        {/* Product Name */}
        <Text style={styles.name}>{props.productInfos.name}</Text>

        {/* Product price and sold */}
        <View style={styles.price_sold_container}>
          <Text style={styles.price}>
            {currencyFormat(props.productInfos.price)}
          </Text>
          <Text>{props.productInfos.sold}-sold</Text>
        </View>

        {/* Product stars */}
        <StarRatingDisplay
          starSize={20}
          rating={
            props.productInfos.totalPoint / props.productInfos.numberOfRate
          }
        />
      </Pressable>
    </View>
  );
}

//styling
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    margin: "5%",
    width: "40%",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  name: {
    fontSize: 12,
  },
  price_sold_container: {
    flexDirection: "row",
  },
  price: {
    flex: 1,
    color: "red",
  },
});

export default ItemCard;
