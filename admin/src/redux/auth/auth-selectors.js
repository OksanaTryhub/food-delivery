export const getAdmin = ({ authAdmin }) => authAdmin.admin;
export const getToken = ({ authAdmin }) => authAdmin.token;
export const isAdminLogin = ({ authAdmin }) => authAdmin.isLogin;
export const isLoading = ({ authAdmin }) => authAdmin.loading;
export const isError = ({ authAdmin }) => authAdmin.error;
