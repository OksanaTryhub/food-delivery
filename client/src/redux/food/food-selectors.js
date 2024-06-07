export const getFood = (state) => state.food.food ?? [];
export const isLoading = (state) => state.food.loading;
export const isError = (state) => state.food.error;
export const isSuccess = (state) => state.food.success;
