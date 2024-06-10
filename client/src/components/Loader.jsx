import PropTypes from "prop-types";
import { RotatingLines } from "react-loader-spinner";

const Loader = ({ size, color }) => {
  const defaultSize = "24";
  const actualSize = size || defaultSize;
  const defaultColor = "#ea2324";
  const actualColor = color || defaultColor;

  return (
    <div className="flex items-center justify-center">
      <RotatingLines
        visible={true}
        height={actualSize}
        width={actualSize}
        strokeColor={actualColor}
        strokeWidth="3"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

export default Loader;
