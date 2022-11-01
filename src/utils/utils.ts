import { initialFilter } from '../redux/slices/filterSlice';

export const checkQueryParams = (params) => {
  const mergedInitStates = {
    currentCategory: initialFilter.currentCategory,
    currentPage: initialFilter.currentPage,
    ...initialFilter.sort,
  };

  for (const key in mergedInitStates) {
    if (!params.hasOwnProperty(key) || !params[key]) {
      params[key] = mergedInitStates[key];
    }
  }

  return params;
};

export const findCartItem = (items, data) => {
  return items.find(
    (item) =>
      item.productId == data.productId &&
      item.type == data.type &&
      item.size == data.size
  );
};
