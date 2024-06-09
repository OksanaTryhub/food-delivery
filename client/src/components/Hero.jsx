const Hero = () => {
  return (
    <div className="container flex flex-col mx-auto p-3">
      <div className=" bg-hero bg-cover bg-center  rounded-xl">
        <div className="px-10 lg:pl-28 pt-28 pb-10 md:w-[500px] lg:w-[700px] animate-fadeIn">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold text-white lg:leading-snug mb-4">
            Order your favourite food here
          </h1>
          <p className="text-sm font-semibold text-white pb-8">
            Choose from diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our
            mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>
          <a
            href="#explore-menu"
            className="inline-flex px-8 py-3 bg-white rounded-full text-sm font-semibold"
          >
            View menu
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
