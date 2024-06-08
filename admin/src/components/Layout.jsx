import PropTypes from "prop-types";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="container min-h-screen mx-auto p-3 pt-28">
      <Sidebar />
      <div className="pt-16 xs:pt-0 xs:pl-[60px] md:pl-[120px]">{children}</div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
