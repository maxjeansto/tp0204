import { createSlice } from "@reduxjs/toolkit";

export const articleSlice = createSlice({
  name: "article",
  initialState: {

    fetchArticle: [],
    articleSelected : null

  },
  reducers: {
    setArticle: (state, { payload }) => {
     console.log("Payload: ", payload);
      state.fetchArticle = payload;
    },

  },
});

// export quis servira pour mes fonctions
export const { setArticle } = articleSlice.actions;

export const getArticle = (state) => {
  // console.log("state in redux", state.auth.fetchAuth)
  return state.article.fetchArticle
}


export default articleSlice.reducer;
