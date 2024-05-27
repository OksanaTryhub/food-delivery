export const getAdmin = ({ authAdmin }) => authAdmin.admin;
export const getToken = ({ authAdmin }) => authAdmin.success;
export const isSuccess = ({ authAdmin }) => authAdmin.success;
export const isAdminLogin = ({ authAdmin }) => authAdmin.isLogin;
export const isLoading = ({ authAdmin }) => authAdmin.loading;
export const isError = ({ authAdmin }) => authAdmin.error;
