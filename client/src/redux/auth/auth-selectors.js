export const getUser = ({ authUser }) => authUser.user;
export const getToken = ({ authUser }) => authUser.success;
export const isSuccess = ({ authUser }) => authUser.success;
export const isUserLogin = ({ authUser }) => authUser.isLogin;
export const isLoading = ({ authUser }) => authUser.loading;
export const isError = ({ authUser }) => authUser.error;
