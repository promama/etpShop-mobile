import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  email: "",
  status: "idle",
  token: "defau",
  message: "",
  phoneNumber: "",
  gender: "",
  dob: "",
  addresses: [],
  allowAccess: false,
  addressInfos: {},
  show: 0,
  isLoading: false,
  notificationList: [],
  unreadNotify: 0,
};

//normal internet
//const ip_address = "192.168.100.10";

//4G internet
//const ip_address = "192.168.184.142";

//render address
const base_url = "https://e-tpshop-backend.onrender.com";
// const base_url = "http://192.168.100.23:5000";

export const fetchReadNofication = createAsyncThunk(
  "user/fetchReadNofication",
  async (userInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${userInfos.access_token}`,
        },
        data: { email: userInfos.email, notiId: userInfos.notiId },
        method: "POST",
        // url: `http://${ip_address}:5000/user/verify`,
        url: `${base_url}/user/readNotify`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUnreadNotification = createAsyncThunk(
  "/user/fetchUnreadNotification",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
        method: "POST",
        url: `${base_url}/user/notification`,
        data: data,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchConfirmAndBuy = createAsyncThunk(
  "user/fetchConfirmAndBuy",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
        method: "POST",
        url: `${base_url}/user/confirmOder`,
        data: data,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUserDeleteAddress = createAsyncThunk(
  "user/fetchUserDeleteAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${addressId.access_token}`,
        },
        method: "DELETE",
        url: `${base_url}/user/deleteUserAddressById/${addressId._id}`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAddNewAddress = createAsyncThunk(
  "user/fetchAddNewAddress",
  async (userInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${userInfos.access_token}`,
        },
        method: "POST",
        url: `${base_url}/user/createNewAddress`,
        data: { ...userInfos },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUserSetDefaultAddress = createAsyncThunk(
  "user/fetchUserSetDefaultAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${addressId.access_token}`,
        },
        method: "POST",
        url: `${base_url}/user/setUserDefaultAddress/${addressId._id}`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchChangeUserProfile = createAsyncThunk(
  "user/fetchChangeUserProfile",
  async (userProfile, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${userProfile.access_token}`,
        },
        method: "POST",
        url: `${base_url}/user/editUserProfile`,
        data: { ...userProfile },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGetAllAddress = createAsyncThunk(
  "user/fetchGetAllAddress",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
        method: "POST",
        data: { email: token.email },
        // url: `http://${ip_address}:5000/user/getAllAddress`,
        url: `${base_url}/user/getAllAddress`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchVerify = createAsyncThunk(
  "user/fetchVerify",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
        method: "POST",
        data: { email: token.email },
        // url: `http://${ip_address}:5000/user/verify`,
        url: `${base_url}/user/verify`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async (userInfos, { rejectWithValue }) => {
    try {
      // const res = await axios.post(
      //   `http://${ip_address}:5000/user/login`,
      //   userInfos
      // );
      const res = await axios.post(`${base_url}/user/login`, userInfos);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchSignUp = createAsyncThunk(
  "user/fetchSignUp",
  async (userInfos, { rejectWithValue }) => {
    try {
      // const res = await axios.post(
      //   `http://${ip_address}:5000/user/createUser`,
      //   userInfos
      // );
      const res = await axios.post(`${base_url}/user/createUser`, userInfos);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.status = action.payload;
    },
    reset: (state, action) => {
      state.email = "";
      state.status = "idle";
      state.token = "";
      state.message = "";
      state.phoneNumber = 0;
      state.gender = "";
      state.dob = "";
      state.addresses = [];
      state.allowAccess = false;
      state.unreadNotify = 0;
      state.notificationList = [];
    },
    setOrderAddress: (state, action) => {
      state.addressInfos = action.payload.addressInfos;
    },
    setNotificaition: (state, action) => {
      state.notificationList = action.payload.notify;
      state.unreadNotify = action.payload.userUnreadNoti;
    },
  },
  extraReducers: (builder) => {
    //create new user account
    builder.addCase(fetchSignUp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSignUp.fulfilled, (state, action) => {
      state.status = "success";
      state.message = "create success!";
      state.isLoading = false;
    });
    builder.addCase(fetchSignUp.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });

    //sign in
    builder.addCase(fetchLogin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = "success";
      state.message = "login success!";
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.gender = action.payload.gender;
      state.dob = action.payload.birthDay;
      state.isLoading = false;
      state.allowAccess = true;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
      state.allowAccess = false;
    });

    //protected route
    builder.addCase(fetchVerify.pending, (state, action) => {
      state.allowAccess = true;
    });
    builder.addCase(fetchVerify.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.addresses = action.payload.address;
      state.token = action.payload.token;
      state.allowAccess = action.payload.success;
    });
    builder.addCase(fetchVerify.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.allowAccess = action.payload.success;
    });

    //get all user addresses
    builder.addCase(fetchGetAllAddress.fulfilled, (state, action) => {
      state.status = "success";
      state.addresses = action.payload.address;
      state.token = action.payload.token;
    });
    builder.addCase(fetchGetAllAddress.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
    });

    //change user profile
    builder.addCase(fetchChangeUserProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchChangeUserProfile.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.dob = action.payload.data.birthDay;
      state.gender = action.payload.data.sex;
      state.phoneNumber = action.payload.data.phoneNumber;
      state.token = action.payload.token;
      state.isLoading = false;
    });
    builder.addCase(fetchChangeUserProfile.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });

    //set new default address
    builder.addCase(fetchUserSetDefaultAddress.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserSetDefaultAddress.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.addresses = action.payload.address;
      state.token = action.payload.token;
      state.isLoading = false;
    });
    builder.addCase(fetchUserSetDefaultAddress.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });

    //add new user address
    builder.addCase(fetchAddNewAddress.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAddNewAddress.fulfilled, (state, action) => {
      state.status = "success";
      state.addresses = action.payload.address;
      state.token = action.payload.token;
      state.isLoading = false;
    });
    builder.addCase(fetchAddNewAddress.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });

    //delete address
    builder.addCase(fetchUserDeleteAddress.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserDeleteAddress.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.addresses = action.payload.address;
      state.token = action.payload.token;
      state.isLoading = false;
    });
    builder.addCase(fetchUserDeleteAddress.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });

    //confirm oder
    builder.addCase(fetchConfirmAndBuy.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchConfirmAndBuy.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.token = action.payload.token;
      state.addressInfos = {};
      state.isLoading = false;
    });
    builder.addCase(fetchConfirmAndBuy.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });

    //receive unread notification
    builder.addCase(fetchUnreadNotification.fulfilled, (state, action) => {
      state.status = "success";
      state.notificationList = action.payload.listNotification;
      state.unreadNotify = action.payload.unreadNoti;
    });

    //read notification
    builder.addCase(fetchReadNofication.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchReadNofication.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.notificationList = action.payload.listNotification;
      state.unreadNotify = action.payload.unreadNoti;
      state.isLoading = false;
    });
    builder.addCase(fetchReadNofication.rejected, (state, action) => {
      state.status = "fail";
      state.isLoading = false;
    });
  },
});
export const { setToken, reset, setOrderAddress, setNotificaition } =
  userSlice.actions;

export default userSlice.reducer;
