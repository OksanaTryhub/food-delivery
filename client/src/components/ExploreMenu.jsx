import menuList from "./../data/menuList";
import DraggableScroll from "./DraggableScroll";

import PropTypes from "prop-types";

const ExploreMenu = ({ category, setCategory }) => {
  const handleMenuClick = (name) => {
    setCategory((prev) => (prev === name ? "All" : name));
  };

  return (
    <div id='explore-menu' className='container flex flex-col mx-auto p-3'>
      <div className='px-3'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold mb-4'>Explore our menu</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae ipsum, qui rem
          consequuntur vel impedit laudantium sed nulla ut quaerat, doloribus autem repellat
          commodi, numquam laborum ex culpa necessitatibus nobis?
        </p>
      </div>
      <DraggableScroll>
        <ul className='flex items-center gap-2 py-6 '>
          {menuList.map((item, index) => (
            <li
              key={index}
              className='w-[200px] shrink-0 flex flex-col gap-2 text-lg font-semibold items-center'
              onClick={() => handleMenuClick(item.menuName)}
            >
              <div
                className={`w-[150px] rounded-full overflow-hidden ${
                  category === item.menuName ? "border-4 border-accent-1 " : ""
                }`}
              >
                <img
                  src={item.menuImg}
                  alt='Menu image'
                  className={`w-[150px] rounded-full transition-scale duration-200 ease-in-out ${
                    category === item.menuName ? "scale-90" : "scale-100"
                  }`}
                />
              </div>
              <p>{item.menuName}</p>
            </li>
          ))}
        </ul>
      </DraggableScroll>
      <hr className='h-[2px] bg-[#e2e2e2] rounded-full' />
    </div>
  );
};

ExploreMenu.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default ExploreMenu;
