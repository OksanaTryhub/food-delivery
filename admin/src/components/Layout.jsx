import PropTypes from "prop-types";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="container min-h-screen xs:grid grid-cols-layout mx-auto p-3">
      <Sidebar />
      <div>{children}</div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
