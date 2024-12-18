import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  singleItem: {},
  status: "",
  backend: 0,
  item_Props: [],
  color: "",
  size: "",
  productSizes: [],
  isLoading: false,
  choosenColor: "",
  choosenSize: 0,
  choosenPrice: 0,
  choosenQuantity: 0,
  sizeData: [{ label: "none", value: "5" }],
};

//normal internet
//const ip_address = "192.168.100.10";

//4G internet
//const ip_address = "192.168.184.142";

//render address
// const base_url = "https://e-tpshop-backend.onrender.com";
// const base_url = "http://192.168.184.142:5000";
const base_url = "http://192.168.100.13:5000";

export const allProductsFetch = createAsyncThunk(
  "products/allProductsFetch",
  async () => {
    try {
      // const res = await axios.get(`http://${ip_address}:5000/product/getAll`);
      const res = await axios.get(`${base_url}/product/getAll`);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const productFetch = createAsyncThunk(
  "products/productFetch",
  async (productId) => {
    try {
      // const res = await axios.get(
      //   `http://${ip_address}:5000/product/findProduct/${productId.id}`
      // );
      const res = await axios.get(
        `${base_url}/product/findProduct/${productId.id}`
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const productColorFetch = createAsyncThunk(
  "products/productColorFetch",
  async (productId) => {
    try {
      // const res = await axios.get(
      //   `http://${ip_address}:5000/product/findColor/${productId.id}`
      // );
      const res = await axios.get(
        `${base_url}/product/findColor/${productId.id}`
      );
      return res.data;
    } catch (err) {
      alert(err);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    pickColor: (state, action) => {
      state.choosenColor = action.payload;
    },
    createSizesData: (state, action) => {
      if (state.sizeData && state.sizeData.length) {
        state.sizeData = [];
      }
      state.productSizes.map((size) => {
        if (size.productColor === action.payload) {
          state.sizeData.push({
            label: size.productSize.toString(),
            value: size.productSize,
          });
        }
      });
    },
    changeSize: (state, action) => {
      state.choosenSize = action.payload;
    },
    changePrice: (state, action) => {
      state.choosenPrice = action.payload;
    },
    changeStock: (state, action) => {
      state.choosenQuantity = action.payload;
    },
  },
  extraReducers: (builder) => {
    //Get all product
    builder.addCase(allProductsFetch.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(allProductsFetch.fulfilled, (state, action) => {
      state.status = "success";
      state.items = action.payload.products;
      state.isLoading = false;
    });
    builder.addCase(allProductsFetch.rejected, (state, action) => {
      state.isLoading = false;
      state.status = "fail";
      state.items = [];
    });

    //Get product details
    builder.addCase(productFetch.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(productFetch.fulfilled, (state, action) => {
      state.status = "success";
      state.singleItem = action.payload.product[0];
      state.color = action.payload.color;
      state.isLoading = false;
    });

    //Get product images by color
    builder.addCase(productColorFetch.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(productColorFetch.fulfilled, (state, action) => {
      state.status = "success";
      state.item_Props = action.payload.color;
      state.productSizes = action.payload.size;
      state.isLoading = false;
    });
  },
});

export const {
  pickColor,
  createSizesData,
  changeSize,
  changePrice,
  changeStock,
} = productsSlice.actions;

export default productsSlice.reducer;
