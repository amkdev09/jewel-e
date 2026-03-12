import api from "../utils/axios";

const authService = {
  register: async (data) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },
  login: async (data) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },
  sendOtp: async (data) => {
    const response = await api.post("/auth/send-otp", data);
    return response.data;
  },
  verifyOtp: async (data) => {
    const response = await api.post("/auth/verify-otp", data);
    return response.data;
  },
  resendOtp: async (data) => {
    const response = await api.post("/auth/send-otp", data);
    return response.data;
  },
};

export default authService;