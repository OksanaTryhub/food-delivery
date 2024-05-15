import appStore from "../assets/images/app_store.png";
import playStore from "../assets/images/play_store.png";

const AppDownload = () => {
  return (
    <div id='app-download' className='container flex flex-col mb-10 mx-auto p-3'>
      <div className='text-center px-3'>
        <p className='md:text-lg lg:text-xl font-semibold pb-6'>
          For Better Experience Download <br /> FOOD Delivery App
        </p>
        <div className='flex justify-center gap-4'>
          <img
            src={playStore}
            alt='Play Store link'
            className='w-[120px] max-w-[180px] cursor-pointer hover:scale-105 transition-scale duration-300 ease-in-out'
          />
          <img
            src={appStore}
            alt='App Store link'
            className='w-[120px] max-w-[180px] cursor-pointer hover:scale-105 transition-scale duration-300 ease-in-out'
          />
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
