import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  token: null,
  refreshToken: null,
};

const userAuthSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.userData = null;
      state.token = null;
      state.refreshToken = null;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    getUserData: async (state, action) => {
      const response = await authService.getUserData();
      if (response.success) {
        state.userData = response.data.user;
      }
    },
  },
});

export const { clearUser, registerUser, loginUser, getUserData } = userAuthSlice.actions;
export default userAuthSlice.reducer;
