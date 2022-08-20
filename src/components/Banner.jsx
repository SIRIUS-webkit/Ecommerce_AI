import Button from "./Button";
import bannerImage from "../assests/hero-banner.png";

const Banner = () => {
  const shopnow = "Shop Now";
  const sellnow = "Sell Now";
  return (
    <div className="max-w-[1450px] mx-7 lg:max-w-[1550px] lg:mx-[9em] h-full ">
      <div className="mt-[50px] md:grid grid-cols-12 gap-[3em] md:mt-[80px] ">
        <div className="col-span-6 font-myfont w-full ">
          <div className="leading-[50px] md:leading-[80px] lg:leading-[100px] font-bold">
            <h1 className="text-[3rem] text-left  md:text-[5rem] lg:text-[6rem] ">
              <span>New Era of</span>
            </h1>
            <h1 className="text-[3rem] text-left  md:text-[5rem] lg:text-[6rem]">
              <span>eCommerce</span>
            </h1>
          </div>
          <p className="text-left text-[15px] mt-10 max-w-[900px] mx-auto  font-secondaryfont font-[400]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
            similique et obcaecati delectus deserunt architecto omnis natus
            molestiae iure id iste in ut quam consequuntur, vero ratione rerum
            exercitationem odio.
          </p>
          <div className="flex space-x-5 mt-10 items-center justify-center float-left ">
            <Button target="primary" title={shopnow} />
            <Button target="secondary" title={sellnow} />
          </div>
        </div>
        <div className="col-span-6">
          <div className="w-full h-full">
            <img src={bannerImage} alt="banner" className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
