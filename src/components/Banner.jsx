import Button from "./Button";

const Banner = () => {
  const shopnow = "Shop Now";
  const sellnow = "Sell Now";
  return (
    <div className="max-w-[1450px] mx-7 lg:max-w-[1550px] lg:mx-12 h-full ">
      <div className="mt-[50px] md:flex md:items-center md:mt-[80px] ">
        <div className="font-myfont w-full ">
          <div className="leading-[50px] md:leading-[80px] lg:leading-[100px]">
            <h1 className="text-[3rem] text-left md:text-center md:text-[5rem] lg:text-[6rem] ">
              <span>Buy Everything</span>
            </h1>
            <h1 className="text-[3rem] text-left md:text-center md:text-[5rem] lg:text-[6rem]">
              <span>&</span>
            </h1>
            <h1 className="text-[3rem] text-left md:text-center md:text-[5rem] lg:text-[6rem]">
              <span>Sell Proucts</span>
            </h1>
          </div>
          <p className="text-left text-[15px] mt-10 max-w-[900px] mx-auto md:text-center font-secondaryfont font-[400]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
            similique et obcaecati delectus deserunt architecto omnis natus
            molestiae iure id iste in ut quam consequuntur, vero ratione rerum
            exercitationem odio.
          </p>
          <div className="flex space-x-5 mt-10 items-center justify-center float-left md:float-none ">
            <Button target="primary" title={shopnow} />
            <Button target="secondary" title={sellnow} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
