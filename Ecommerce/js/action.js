export const toggleSidedrawer = () => {
    return {
      type: "TOGGLE_SIDEDRAWER",
    };
  };
  
  export const fetchCategoriesRequest = () => {
    return {
      type: "FETCH_CATEGORIES_REQUEST",
    };
  };
  
  export const fetchCategoriesSuccess = (categories) => {
    return {
      type: "FETCH_CATEGORIES_SUCCESS",
      payload: categories,
    };
  };
  
  export const fetchCategories = () => {
    return (dispatch) => {
      dispatch(fetchCategoriesRequest);
      fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(json => dispatch(fetchCategoriesSuccess(json)))
        .then(json => console.log(json))
        .catch(err => console.log(err));
    };
  };