import { router, useLocalSearchParams } from "expo-router";
import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  changePrice,
  changeSize,
  changeStock,
  createSizesData,
  productColorFetch,
  productFetch,
} from "../../slices/productsSlice";
import ProductImage from "../../components/ProductImage";
import RNPickerSelect from "react-native-picker-select";
import { addToCartFetch } from "../../slices/cartSlice";
import { reset } from "../../slices/userSlice";

function detailPage() {
  const params = useLocalSearchParams();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.products.isLoading);
  const product = useSelector((state) => state.products.singleItem);
  const productColors = useSelector((state) => state.products.item_Props);
  const productSizes = useSelector((state) => state.products.productSizes);
  const size = useSelector((state) => state.products.size);
  const color = useSelector((state) => state.products.color);
  const baseColor = useSelector((state) => state.products.color);
  const rawSizeData = useSelector((state) => state.products.sizeData);
  const price = useSelector((state) => state.products.choosenPrice);
  const stock = useSelector((state) => state.products.choosenQuantity);
  const choosenSize = useSelector((state) => state.products.choosenSize);
  const token = useSelector((state) => state.user.token);

  const [choosenColor, setChoosenColor] = useState(color);
  // const [choosenSize, setChoosenSize] = useState(0);

  const [mainImage, setMainImage] = useState("");
  const [subImage0, setSubImage0] = useState("");
  const [subImage1, setSubImage1] = useState("");
  const [subImage2, setSubImage2] = useState("");
  const [subImage3, setSubImage3] = useState("");
  const [sizes, setSizes] = useState(size);
  const [num, setNum] = useState(1);
  const [sizeData, setSizeData] = useState(rawSizeData);
  const [buyingQuantity, setBuyingQuantity] = useState(1);

  //check if color matched
  function isMatchColor(targetColor) {
    if (
      color.toString().toLowerCase() === targetColor.toString().toLowerCase()
    ) {
      return true;
    } else {
      return false;
    }
  }

  //display big image
  function displayMainImage(url) {
    if (mainImage === "") {
      return url;
    } else {
      return mainImage;
    }
  }

  function isBuyable() {
    if (product.remain === 0 || product.remain === null) {
      return false;
    } else {
      return true;
    }
  }

  //regex for number only
  function handleChangeQuantity(e) {
    const regex = /(?<!-)(?<!\d)[1-9][0-9]*/;
    if (e === "" || regex.test(e)) {
      setBuyingQuantity(e);
    }
  }

  function handleAddQuantity(stock) {
    const regex = /(?<!-)(?<!\d)[1-9][0-9]*/;
    const buying = parseInt(buyingQuantity) + 1;
    if (!choosenSize) {
      alert("Please choose size first");
    } else if (buying > stock) {
      alert("You can not order more than currently have");
    } else if (buying === "" || regex.test(buying)) {
      setBuyingQuantity(buying);
    }
  }

  function handleSetBuyingQuantity(e) {
    const regex = /(?<!-)(?<!\d)[1-9][0-9]*/;
    if (!choosenSize) {
      alert("Please choose size first");
    } else if (e > stock) {
      alert("You can not order more than currently have");
      setBuyingQuantity(stock);
    } else if (e < 1 && e != "") {
      alert("Quantity can not below 1");
    } else if (e === "" || regex.test(e)) {
      setBuyingQuantity(e);
    }
  }

  function handleSubtractQuantity() {
    const regex = /(?<!-)(?<!\d)[1-9][0-9]*/;
    const buying = buyingQuantity - 1;
    if (!choosenSize) {
      alert("Please choose size first");
    } else if (buying < 1) {
      alert("Quantity can not below 1");
    } else if (buying === "" || regex.test(buying)) {
      setBuyingQuantity(buying);
    }
  }

  //change size, change price
  function handleBoxChange(e) {
    setChoosenSize(e);
    setSizes(e.toString());

    productSizes?.map((products) => {
      if (isMatchColor(products.productColor) && products.productSize === e) {
        setPrice(products.price);
        setStock(products.quantity);
      }
    });
    //dispatch(changeSize(sizes));
  }

  const addToCart = async () => {
    try {
      const res = await dispatch(
        addToCartFetch({
          productId: params,
          color: choosenColor,
          size: choosenSize,
          quantity: buyingQuantity,
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

  //load product detail
  useEffect(() => {
    dispatch(productFetch(params));
    dispatch(productColorFetch(params));
    dispatch(createSizesData(color));
    setSizeData(rawSizeData);
  }, [dispatch, color]);

  return (
    <ScrollView>
      <Pressable
        onPress={() => {
          alert(JSON.stringify(productColors));
        }}
      >
        <Text>checking</Text>
      </Pressable>

      {/* View main image and 4 images below */}
      {productColors?.map((product) => {
        return (
          isMatchColor(product.productColor) && (
            <View key={product.url}>
              <View style={styles.container}>
                <ProductImage url={displayMainImage(product.url)} />
              </View>
              <View
                className="flex flex-row"
                style={styles.small_image_container}
              >
                <Pressable
                  onPress={() => {
                    setMainImage(subImage0);
                  }}
                >
                  <ProductImage
                    style={styles.small_image}
                    url={subImage0 ? subImage0 : product.url}
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    setMainImage(subImage1);
                  }}
                >
                  <ProductImage
                    style={styles.small_image}
                    url={subImage1 ? subImage1 : product.url1}
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    setMainImage(subImage2);
                  }}
                >
                  <ProductImage
                    style={styles.small_image}
                    url={subImage2 ? subImage2 : product.url2}
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    setMainImage(subImage3);
                  }}
                >
                  <ProductImage
                    style={styles.small_image}
                    url={subImage3 ? subImage3 : product.url3}
                  />
                </Pressable>
              </View>
            </View>
          )
        );
      })}

      {/* Choose color of product  */}
      <View style={styles.color_container}>
        <View className="flex flex-row">
          {productColors?.map((color) => {
            return (
              <Pressable
                key={color.productColor + color._id}
                style={{
                  width: 50,
                  height: 50,
                  margin: 5,
                  backgroundColor: color.productColor.toString().toLowerCase(),
                }}
                onPress={() => {
                  setMainImage(color.url);
                  setSubImage0(color.url);
                  setSubImage1(color.url1);
                  setSubImage2(color.url2);
                  setSubImage3(color.url3);
                  dispatch(createSizesData(color.productColor));
                  setChoosenColor(color.productColor);
                  dispatch(changeSize(0));
                }}
              ></Pressable>
            );
          })}
        </View>
      </View>

      {/* Choose size of color */}
      <View>
        <View style={styles.horizontal_ruler} />
        <MyPickerSelect sizeData={sizeData} />
        <View style={styles.horizontal_ruler} />
      </View>

      {/* View price of size  */}
      <View>
        <Text className="font-bold text-red-500 text-lg">Price: ${price}</Text>
      </View>

      {/* Choose quantity to buy */}
      <View>
        <Text className="text-gray-400">Stock: {stock}</Text>
        <View className="flex-row items-center">
          <Text>quantity</Text>
          <View className="flex-row ml-auto pl-5 pr-5 content-evenly items-center">
            <Pressable
              className="pl-3 pr-3"
              style={{ borderRadius: 5 }}
              onPress={() => handleSubtractQuantity()}
            >
              <Text className="text-lg font-bold">-</Text>
            </Pressable>
            <TextInput
              className="ml-3"
              onChangeText={(e) => handleSetBuyingQuantity(e)}
              inputMode="decimal"
            >
              {buyingQuantity || 1}
            </TextInput>
            <Pressable
              className="pl-3 pr-3"
              style={{ borderRadius: 5 }}
              onPress={() => handleAddQuantity(stock)}
            >
              <Text className="text-lg font-bold">+</Text>
            </Pressable>
          </View>
        </View>
        <Text className="ml-auto mr-3 mt-3 font-bold text-lg">
          Total: ${buyingQuantity * price}
        </Text>
      </View>

      {/* Button add product to cart */}
      <View>
        <Pressable
          className="border p-2 mb-2 bg-blue-500"
          style={{
            alignSelf: "center",
            marginTop: 10,
            borderRadius: 10,
            borderColor: "yellow",
          }}
          onPress={addToCart}
        >
          <Text style={{ color: "white" }}>Add to cart</Text>
        </Pressable>
      </View>

      {/* View product description */}
      <View>
        <Text>Description: {product.description}</Text>
      </View>

      {/* Testing area */}
      <Button
        title="go back to Home page"
        onPress={() => router.push("/")}
      ></Button>
      <Text>Detail page {params.id}</Text>
      <Text>current Color {choosenColor}</Text>
      <Text>current size: {choosenSize}</Text>
      <Text>Buying quantity: {buyingQuantity}</Text>
    </ScrollView>
  );
}

function MyPickerSelect(sizeData) {
  const dispatch = useDispatch();

  //choosenSize, color fromt store
  const choosenSize = useSelector((state) => state.products.choosenSize);
  const color = useSelector((state) => state.products.color);
  const productSizes = useSelector((state) => state.products.productSizes);
  const sizeData1 = useSelector((state) => state.products.sizeData);
  return (
    <RNPickerSelect
      // items={sizeData.sizeData}
      items={sizeData1}
      value={choosenSize}
      onValueChange={(value) => {
        dispatch(changeSize(value));
        productSizes?.map((products) => {
          if (
            color === products.productColor &&
            products.productSize === value
          ) {
            dispatch(changePrice(products.price));
            dispatch(changeStock(products.quantity));
          }
        });
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  small_image_container: {
    display: "flex",
    alignItems: "center",
    width: "25%",
    height: 100,
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  small_image: {
    width: 100,
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
  color_container: {
    display: "flex",
    alignItems: "baseline",
    width: "100%",
  },
  square: {
    width: 50,
    height: 50,
    margin: 5,
  },
  horizontal_ruler: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default detailPage;
