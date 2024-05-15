import { useState } from "react";
import PropTypes from "prop-types";

const DraggableScroll = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const startDragging = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 2; // const walk = (x - startX) * 2; speed of scrolling
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      onMouseDown={startDragging}
      onMouseLeave={stopDragging}
      onMouseUp={stopDragging}
      onMouseMove={onDrag}
      className={`whitespace-nowrap overflow-x-scroll scrollbar-hide ${
        isDragging ? "cursor-grabbing" : "cursor-pointer"
      }`}
    >
      {children}
    </div>
  );
};

DraggableScroll.propTypes = {
  children: PropTypes.node,
};

export default DraggableScroll;
