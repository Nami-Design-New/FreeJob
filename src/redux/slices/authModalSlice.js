import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
  previousStep: null,
  formData: {},
  show: false,
};

const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.previousStep = state.currentStep;
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
      state.formData = {};
      state.previousStep = null;
      state.currentStep = 1;
    },
  },
});

export const { setStep, saveFormData, resetModal, openModal, closeModal } =
  authModalSlice.actions;
export default authModalSlice.reducer;
