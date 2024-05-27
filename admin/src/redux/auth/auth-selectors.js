export const getAdmin = (store) => store.authAdmin.admin;
export const getToken = (store) => store.authAdmin.success;
export const isSuccess = (store) => store.authAdmin.success;
export const isAdminLogin = (store) => store.authAdmin.isLogin;
export const isLoading = (store) => store.authAdmin.loading;
export const isError = (store) => store.authAdmin.error;
