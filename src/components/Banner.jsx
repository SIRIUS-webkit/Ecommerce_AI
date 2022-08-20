const Banner = () => {
  return (
    <div className="max-w-[1450px] mx-7 lg:max-w-[1550px] lg:mx-[9em] h-full ">
      <div className="mt-[50px] md:grid grid-cols-12 gap-[3em] md:mt-[80px] ">
        <div className="col-span-12 font-featured w-full ">
          <div className="leading-[40px] sm:leading-[80px] md:leading-[90px] lg:leading-[130px] font-bold">
            <h1 className="text-[30px] sm:text-[3rem] text-left  md:text-[4rem] lg:text-[6rem] ">
              <span>NEW ERA </span>
            </h1>
            <h1 className="text-[30px] sm:text-[3rem] text-left  md:text-[4rem] lg:text-[6rem]">
              <span>OF ECOMMERCE</span>
            </h1>
            <h1 className="text-[30px] sm:text-[3rem] text-left  md:text-[4rem] lg:text-[6rem]">
              <span>WITH MODERN AI TECH</span>
            </h1>
          </div>
          {/* <p className="text-left text-[15px] mt-10 max-w-[900px] mx-auto  font-secondaryfont font-[400]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
            similique et obcaecati delectus deserunt architecto omnis natus
            molestiae iure id iste in ut quam consequuntur, vero ratione rerum
            exercitationem odio.
          </p> */}
          {/* <div className="flex space-x-5 mt-10 items-center justify-center float-left ">
            <Button target="primary" title={shopnow} />
            <Button target="secondary" title={sellnow} />
          </div> */}
        </div>
        {/* <div className="col-span-6">
          <div className="w-full h-full">
            <img src={bannerImage} alt="banner" className="w-full h-full" />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Banner;
