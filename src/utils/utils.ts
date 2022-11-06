import { initialFilter } from "../redux/slices/filterSlice";
import { ICartItem } from "../redux/slices/cartSlice";
import { sortOrderList } from "../components/Sort";

export const checkQueryParams = (params: any) => {
  // Check if query params have all properties from initialFilter state but without sort object
  Object.entries(initialFilter).forEach(([key, value]) => {
    if (
      typeof value !== "object" &&
      (!params.hasOwnProperty(key) || !params[key])
    ) {
      params[key] = value;
    }
  });

  // Check if query params have all properties from initialFilter sort object
  Object.entries(initialFilter.sort).forEach(([key, value]) => {
    if (key === "value" && params.sortBy) {
      const sort =
        sortOrderList.find((item) => item.sortBy === params.sortBy) ??
        sortOrderList[0];

      params[key] = sort.value;
    }

    if (!(key in params) || !params[key]) {
      params[key] = value;
    }
  });

  // debugger;

  return params;
};

export const findCartItem = (items: ICartItem[], data: ICartItem) => {
  return items.find(
    (item) =>
      item.productId == data.productId &&
      item.type == data.type &&
      item.size == data.size
  );
};
