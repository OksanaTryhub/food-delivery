import { Link } from "react-router-dom";
import emptyCart from "../assets/images/empty-cart.png";

const EmptyList = () => {
  return (
    <div className='flex flex-col items-center gap-10'>
      <img src={emptyCart} />
      <div className='flex flex-col gap-2 text-center'>
        <p className='text-accent-1 text-xl font-semibold'>OOPS, THERE&apos;S NOTHING!</p>
        <p className='text-xl font-semibold'>
          Your list is empty, add first{" "}
          <Link to='/add' className='cursor-pointer text-accent-1 hover:underline underline-custom'>
            Item
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EmptyList;
