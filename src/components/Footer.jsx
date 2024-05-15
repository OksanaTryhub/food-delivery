import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaPhone, FaTelegramPlane } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { IoIosMail } from "react-icons/io";
import logo from "../assets/images/logo-tr.png";

const Footer = () => {
  return (
    <footer id='footer' className='bg-dark-1 shadow-top text-light-1'>
      <div className='container flex flex-col gap-5 items-center mx-auto px-3 pt-10 pb-4'>
        <div className='flex flex-col sm:grid grid-cols-footer gap-10 sm:gap-14'>
          <div className='flex flex-col gap-5 px-3 lg:pr-8 xl:pr-14'>
            <Link to='/'>
              <img src={logo} alt='logo' className='min-w-[100px] max-w-[100px] sm:max-w-[120px]' />
            </Link>
            <p className='text-xs '>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque ipsam velit porro
              alias. Sint, optio pariatur. Pariatur officia harum ab. Quas placeat quia ipsa quo
              nihil possimus eius dolores neque! Lorem ipsum, dolor sit amet consectetur adipisicing
            </p>

            <div className='flex gap-4 sm:hidden'>
              <div className='p-4 border rounded-full cursor-pointer hover:border-accent-1'>
                <FaFacebookF className='text-xl md:text-2xl' />
              </div>
              <div className='p-4 border rounded-full cursor-pointer hover:border-accent-1'>
                <FaLinkedinIn className='text-xl md:text-2xl' />
              </div>
              <div className='p-4 border rounded-full cursor-pointer hover:border-accent-1'>
                <TbBrandGithubFilled className='text-xl md:text-2xl' />
              </div>
            </div>
          </div>

          <div className='flex flex-col px-3 md:pl-8 '>
            <h2 className='text-lg font-bold mb-4'>COMPANY</h2>
            <ul className='flex flex-col gap-1 sm:gap-2 text-sm md:text-base'>
              <li className='cursor-pointer hover:text-accent-1'>Home</li>
              <li className='cursor-pointer hover:text-accent-1'>About us</li>
              <li className='cursor-pointer hover:text-accent-1'>Delivery</li>
              <li className='cursor-pointer hover:text-accent-1'>Privacy policy</li>
            </ul>
          </div>

          <div className='flex flex-col gap-4 px-3 md:pl-8'>
            <h2 className='text-lg font-bold '>GET IN TOUCH</h2>
            <ul className='flex flex-col gap-1 sm:gap-2 text-sm md:text-base'>
              <li className='cursor-pointer group'>
                <a href='tel:+380974173310' className='flex gap-2 items-center'>
                  <FaPhone className='text-base group-hover:text-accent-1' />
                  +38-097-417-33-10
                </a>
              </li>
              <li className='cursor-pointer group'>
                <a
                  href='https://t.me/mlle_soleil'
                  target='_blank'
                  rel='noopener noreferrer nofollow'
                  className='flex gap-2 items-center'
                >
                  <FaTelegramPlane className='text-base group-hover:text-accent-1' />
                  @mlle_soleil
                </a>
              </li>
              <li className='cursor-pointer group'>
                <a href='mailto:ksanatrigub@gmail.com' className='flex gap-2 items-center'>
                  <IoIosMail className='text-base group-hover:text-accent-1' />{" "}
                  ksanatrigub@gmail.com
                </a>
              </li>
            </ul>
            <ul className='hidden sm:flex gap-4'>
              <li className='p-4 border rounded-full cursor-pointer hover:border-accent-1'>
                <a
                  href='https://www.facebook.com'
                  target='_blank'
                  rel='noopener noreferrer nofollow'
                >
                  <FaFacebookF className='text-xl md:text-2xl' />
                </a>
              </li>
              <li className='p-4 border rounded-full cursor-pointer hover:border-accent-1'>
                <a
                  href='https://www.linkedin.com/in/oksana-tryhub/'
                  target='_blank'
                  rel='noopener noreferrer nofollow'
                >
                  <FaLinkedinIn className='text-xl md:text-2xl' />
                </a>
              </li>
              <li className='p-4 border rounded-full cursor-pointer hover:border-accent-1'>
                <a
                  href='https://github.com/OksanaTryhub'
                  target='_blank'
                  rel='noopener noreferrer nofollow'
                >
                  <TbBrandGithubFilled className='text-xl md:text-2xl' />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className='w-full h-[1px] bg-[#e2e2e2] rounded-full' />
        <p className='text-center text-xs '>
          Copyright 2024 &#169; FOOD DELIVERY - All Right Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
