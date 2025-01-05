import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
  formData: {},
  show: false,
};

const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
    saveFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetModal: (state) => {
      state.currentStep = 1;
      state.formData = {};
    },
    openModal: (state) => {
      state.show = true;
    },
    closeModal: (state) => {
      state.show = false;
    },
  },
});

export const { setStep, saveFormData, resetModal, openModal, closeModal } =
  authModalSlice.actions;
export default authModalSlice.reducer;
