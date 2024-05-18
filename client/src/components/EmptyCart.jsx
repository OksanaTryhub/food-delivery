import { Link } from "react-router-dom";
import emptyCart from "../assets/images/empty-cart.png";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center gap-10">
      <img src={emptyCart} />
      <div className="flex flex-col gap-2 text-center">
        <p className="text-accent-1 text-xl font-semibold">
          OOPS, THERE&apos;S NOTHING!
        </p>
        <p className="text-xl font-semibold">
          Your cart is empty, add something from the{" "}
          <Link to="/" className="cursor-pointer hover:text-accent-1">
            Menu
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EmptyCart;
