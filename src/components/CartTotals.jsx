import PropTypes from "prop-types";

const CartTotals = ({ amount, buttonText, onClick, className, classNameBtn, classNameTitle }) => {
  const deliveryFee = (amount) => {
    return amount === 0 ? 0 : 2;
  };

  return (
    <div
      className={`flex flex-col gap-5 max-w-[500px] w-full sm:max-w-none mx-auto p-3 ${className}`}
    >
      <h2 className={`text-2xl font-semibold text-center sm:text-start ${classNameTitle}`}>
        Cart Totals
      </h2>
      <div>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>${amount}</p>
        </div>
        <hr className='my-2' />
        <div className='flex justify-between'>
          <p>Delivery Fee</p>
          <p>${deliveryFee(amount)}</p>
        </div>
        <hr className='my-2' />
        <div className='flex justify-between text-lg font-semibold'>
          <p>Total</p>
          <p>${amount + deliveryFee(amount)}</p>
        </div>
      </div>
      <button
        onClick={onClick}
        className={`self-center sm:self-start px-6 py-2 border rounded-full bg-light-1 hover:border-accent-1 transition-colors duration-300 ease-in-out ${classNameBtn}`}
      >
        {buttonText}
      </button>
    </div>
  );
};

CartTotals.propTypes = {
  amount: PropTypes.number.isRequired,
  buttonText: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  classNameBtn: PropTypes.string,
  classNameTitle: PropTypes.string,
};
export default CartTotals;
