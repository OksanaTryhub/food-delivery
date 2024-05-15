import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import CartTotals from "../components/CartTotals";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  const handleBtnClick = (e) => {
    e.preventDefault();
    console.log("Click on PROCEED TO PAYMENT");
  };

  return (
    <div className='container flex flex-col max-w-6xl mx-auto p-3 pt-12'>
      <h1 className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-center sm:text-start pl-3 mb-4'>
        Delivery information
      </h1>
      <form className='flex flex-col sm:flex-row gap-4 md:gap-20'>
        <div className='flex flex-col gap-5 max-w-[500px] w-full sm:max-w-none mx-auto p-3'>
          <div className='flex gap-4'>
            <input
              type='text'
              placeholder='First Name'
              className='focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border w-full'
            />
            <input
              type='text'
              placeholder='Last Name'
              className='focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border w-full'
            />
          </div>
          <input
            type='email'
            placeholder='Email address'
            className='focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border w-full'
          />
          <input
            type='text'
            placeholder='Street'
            className='focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border w-full'
          />
          <div className='flex gap-4'>
            <input
              type='text'
              placeholder='City'
              className='focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border w-full'
            />
            <input
              type='text'
              placeholder='State'
              className='focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border w-full'
            />
          </div>
          <div className='flex gap-4'>
            <input
              type='text'
              placeholder='Zip code'
              className='focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border w-full'
            />
            <input
              type='text'
              placeholder='Country'
              className='focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border w-full'
            />
          </div>
          <input
            type='text'
            placeholder='Phone'
            className='focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border w-full'
          />
        </div>
        <CartTotals
          amount={getTotalCartAmount()}
          buttonText={"PROCEED TO PAYMENT"}
          onClick={handleBtnClick}
          className='sm:max-w-[500px]'
          classNameBtn='sm:self-end'
          classNameTitle='text-xl sm:text-2xl'
        />
      </form>
    </div>
  );
};

export default PlaceOrder;
