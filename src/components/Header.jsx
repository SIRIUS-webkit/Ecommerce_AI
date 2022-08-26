import React, { useEffect, useState } from "react";
import { MenuIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ itemCount }) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(0);
  const cartDatas = useSelector((state) => state.cartDatas);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/all") {
      setIsActive(1);
    }
  }, [location]);

  return (
    <>
      <div className="w-full p-[1.5em] font-myfont font-light md:p-[2.5em]">
        <div className="flex justify-between max-w-[1450px] mx-1 lg:max-w-[1550px] lg:mx-10">
          <div className="relative w-20 flex items-center">
            <h1 className="font-lastfont font-bold leading-3 tracking-widest text-[1.2rem]">
              <Link to="/">SAMA</Link>
            </h1>
          </div>
          <div
            className={`md:flex md:items-center md:relative fixed mt-[-25px] md:mt-0 md:bg-white bg-[#eeeeee] md:w-auto md:h-auto w-full h-full z-[300] right-0  ${
              isMenuOpen
                ? "translate-x-0 block"
                : "translate-x-[1200px] md:translate-x-0 hidden md:block"
            }`}
          >
            <ul className=" justify-between md:space-x-5 md:flex md:flex-row flex flex-col space-y-[2rem] md:space-y-0 mt-[8rem] md:mt-0 items-center">
              <li className="relative">
                <a
                  href="/"
                  className={`navBtn ${isActive === 1 ? "font-bold" : ""} `}
                >
                  <Link to="/all">Products</Link>
                </a>
              </li>
              <li className="relative">
                <a className="navBtn" href="#stories">
                  Stories
                </a>
              </li>
              <li className="relative">
                <a className="navBtn" href="#mission">
                  Mission
                </a>
              </li>
              <div
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                role="presentation"
                className="absolute right-[2rem] top-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 md:hidden "
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="absolute left-[2rem] top-0 md:hidden">
                <h1 className="font-lastfont font-bold leading-3 tracking-widest text-[1.2rem]">
                  <Link to="/">SAMA</Link>
                </h1>
              </div>
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <p className="hidden md:block">Login</p>
            <div className="relative cursor-pointer">
              <Link to="/order">
                <ShoppingCartIcon className="h-5 w-5" />

                <div className="w-[20px] h-[20px] rounded-full bg-[#dedcdb] absolute -top-4 left-3 flex items-center justify-center text-black text-[16px]">
                  <span className="">{cartDatas.length}</span>
                </div>
              </Link>
            </div>
            <MenuIcon
              className="h-5 w-5 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
