import { MenuIcon, ShoppingCartIcon } from "@heroicons/react/outline";

const Header = () => {
  return (
    <div className="w-full p-[1.5em] font-myfont font-light md:p-[2.5em]">
      <div className="flex justify-between max-w-[1450px] mx-1 lg:max-w-[1550px] lg:mx-10">
        <div className="relative w-20 flex items-center">
          {/* <img className="w-full" src={logo} alt="instagram" layout="fill" /> */}
          <h1 className="font-lastfont font-bold leading-3 tracking-widest text-[1.2rem]">
            SAMA
          </h1>
        </div>
        <div className="flex items-center">
          <ul className="hidden justify-between space-x-5 md:flex">
            <li className="relative">
              <a className="navBtn" href="#products">
                Products
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
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <p className="hidden md:block">Login</p>
          <div className="relative">
            <ShoppingCartIcon className="h-5 w-5" />

            <span className="absolute -top-4 left-3 flex items-center text-black text-[16px]">
              0
            </span>
          </div>
          <MenuIcon className="h-5 w-5 md:hidden" />
        </div>
      </div>
    </div>
  );
};

export default Header;
