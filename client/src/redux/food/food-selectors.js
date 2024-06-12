export const getFood = ({ food }) => food.food || [];
export const isLoading = ({ food }) => food.loading;
export const isError = ({ food }) => food.error;
export const isSuccess = ({ food }) => food.success;
