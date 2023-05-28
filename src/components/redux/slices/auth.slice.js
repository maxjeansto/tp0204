import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {

    fetchAuth: {
      id:"",
      email: "",
      password: "",
      token: "",
      pseudo: "",
    },

  },
  reducers: {
    setAuth: (state, { payload }) => {
      // console.log("Payload: ", payload);
      state.fetchAuth = payload;
    },

  },
});

// export quis servira pour mes fonctions
export const { setAuth, } = authSlice.actions;

export const getAuth = (state) => {
  // console.log("state in redux", state.auth.fetchAuth)
  return state.auth.fetchAuth
}

export const getPseudo = (state) => {
  // console.log("state in redux", state.auth.fetchAuth)
  return state.auth.fetchAuth.pseudo
}

export const getToken = (state) => {
  // console.log("state in redux", state.auth.fetchAuth)
  return state.auth.fetchAuth.token
}


export default authSlice.reducer;
