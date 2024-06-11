export const getCartItems = ({ cart }) => cart.cart ?? {};
export const isCartLoading = ({ cart }) => cart.loading;
export const isCartError = ({ cart }) => cart.error;
