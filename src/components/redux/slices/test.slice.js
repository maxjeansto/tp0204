import { createSlice } from "@reduxjs/toolkit";

export const testSlice = createSlice({
  name: "test",
  initialState: {
    
    dataBlog : [],
    nomEnfant : null
    ,
  },
  reducers: {
    setdataBlog  : (state, { payload }) => {
     console.log("Payload: ", payload);
       state.dataBlog = payload;
     },
    setNomEnfant  : (state, action) => {
     console.log("action: ", action);
       state.nomEnfant = action.payload;
     },

  },
});

// export quis servira pour mes fonctions
export const { setdataBlog, setNomEnfant } = testSlice.actions;

export const getDataBlog = (state) => { 
 // console.log("state***", state)
   return state.test.dataBlog
}
export const getNomEnfant = (state) => { 
 // console.log("state...", state)
   return state.test.nomEnfant
}

export default testSlice.reducer;
