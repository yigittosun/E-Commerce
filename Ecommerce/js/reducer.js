import * as actionTypes from "./actions";

const initialState = {
  sidedrawerShow: false,
  categories: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case actionTypes.toggleSidedrawer:
      return {
        ...state,
        sidedrawerShow: !state.sidedrawerShow,
      };
    case actionTypes.fetchCategoriesRequest:
      return {
        ...state,
        loading: true,
      };
    case "FETCH_CATEGORIES_SUCCESS":
      console.log("siema");
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
  }
  return state;
};

export default reducer;
