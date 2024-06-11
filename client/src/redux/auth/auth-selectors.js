export const getUser = ({ authUser }) => authUser.user;
export const getUserToken = ({ authUser }) => authUser.token;
export const isUserLogin = ({ authUser }) => authUser.isLogin;
export const isUserLoading = ({ authUser }) => authUser.loading;
export const isUserError = ({ authUser }) => authUser.error;
