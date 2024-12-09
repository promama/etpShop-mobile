import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  cartTotalQuantities: 0,
  cartTotalAmount: 0,
  status: "",
  message: "",
  showOffCanvas: false,
  orderId: "",
  orders: [],
  isLoading: false,
  listStatusCount: [],
  singleOrderDetail: {},
};

//normal internet
//const ip_address = "192.168.100.10";

//4G internet
//const ip_address = "192.168.184.142";

//render address
const base_url = "https://e-tpshop-backend.onrender.com";

export const addToCartFetch = createAsyncThunk(
  "cart/addToCartFetch",
  async (productInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${productInfos.access_token}`,
        },
        method: "POST",
        url: `${base_url}/cart/addToCart`,
        data: { ...productInfos },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchRatingProduct = createAsyncThunk(
  "user/fetchRatingProduct",
  async (productInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${productInfos.access_token}`,
        },
        method: "POST",
        url: `${base_url}/user/rateProduct`,
        data: { ...productInfos },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const showAllOrder = createAsyncThunk(
  "cart/showAllOrder",
  async (productInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${productInfos.access_token}`,
        },
        method: "POST",
        // url: `http://${ip_address}:5000/cart/allOrder`,
        url: `${base_url}/cart/allOrder`,
        data: { ...productInfos },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const showCartItemsFetch = createAsyncThunk(
  "cart/showCartItems",
  async (productInfos, { rejectWithValue }) => {
    try {
      console.log(productInfos);
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${productInfos.access_token}`,
        },
        method: "POST",
        // url: `http://${ip_address}:5000/cart/getCartItems`,
        url: `${base_url}/cart/getCartItems`,
        data: { ...productInfos },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartListItem: (state, action) => {
      state.cartItems = action.payload.products;
      state.cartTotalAmount = action.payload.cart.total;
      state.cartTotalQuantities = action.payload.cart.quantity;
      state.orderId = action.payload.orderId;
    },
    dropCart: (state, action) => {
      state.cartItems = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantities = 0;
      state.message = "";
      state.status = "";
    },
    searchOrder: (state, action) => {
      state.orders.map((order) => {
        if (order.orderId === action.payload) {
          state.singleOrderDetail = order;
        }
      });
    },
  },
  extraReducers: (builder) => {
    //show item in cart
    builder.addCase(showCartItemsFetch.fulfilled, (state, action) => {
      state.status = "success";
      state.cartItems = action.payload.cart;
      state.cartTotalAmount = action.payload.total;
      state.cartTotalQuantities = action.payload.quantity;
    });
    builder.addCase(showCartItemsFetch.rejected, (state, action) => {
      state.status = "fail";
    });

    //show all orders
    builder.addCase(showAllOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(showAllOrder.fulfilled, (state, action) => {
      state.status = "success";
      state.orders = action.payload.listOrder;
      state.isLoading = false;
      state.listStatusCount = action.payload.listStatus;
    });
    builder.addCase(showAllOrder.rejected, (state, action) => {
      state.status = "fail";
      state.isLoading = false;
    });

    //rating product
    builder.addCase(fetchRatingProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRatingProduct.fulfilled, (state, action) => {
      state.status = "success";
      state.orders = action.payload.listOrder;
      state.isLoading = false;
    });
    builder.addCase(fetchRatingProduct.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });

    //add item to cart
    builder.addCase(addToCartFetch.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addToCartFetch.fulfilled, (state, action) => {
      state.status = "success";
      state.message = "add to cart successfully";
      state.cartItems = action.payload.cart;
      state.cartTotalAmount = action.payload.total;
      state.cartTotalQuantities = action.payload.quantity;
      state.orderId = action.payload.orderId;
      state.isLoading = false;
    });
    builder.addCase(addToCartFetch.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });
  },
});

export const { cartListItem, dropCart, searchOrder } = cartSlice.actions;

export default cartSlice.reducer;
