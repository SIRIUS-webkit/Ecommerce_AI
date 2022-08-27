/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Timeline, Power2 } from "gsap/gsap-core";
import allProducts from "../assests/data/all";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Notify from "./Notify";

function ProductDetails() {
  const param = useParams();
  const cartDatas = useSelector((state) => state.cartDatas);
  const product = allProducts.find((x) => x.id === param.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notify, setNotify] = useState(false);

  const image = useRef(null);
  const tl = new Timeline();

  useEffect(() => {
    tl.from(image.current, 1.4, {
      width: "0%",
      ease: Power2.easeInOut,
    });
  }, []);
  // add item
  const addItem = (product) => {
    let result = cartDatas;
    const ProductExitst = result.find((item) => item.id === product.id);
    if (ProductExitst) {
      const filter = result.filter((item) => {
        return item.id !== product.id;
      });
      ProductExitst.quantity += +1;
      result = [...filter, ProductExitst];
    } else {
      result.push({ ...product, quantity: 1 });
    }
    setNotify(true);
    dispatch({ type: "UPDATE_CARTITEM", data: result });
  };

  return (
    <>
      <Notify notify={notify} setNotify={setNotify} />
      <div id="main-container">
        <Header />

        <div className="max-w-[1200px] sm:mx-auto mx-[1.5rem] py-[5rem]">
          <div className="grid grid-cols-12 ">
            <div className="md:col-span-6 col-span-12 flex items-center justify-center ">
              <div className="img-container sm:w-[70%] sm:h-[400px] w-full h-[200px]">
                <img src={product.url} alt="product" ref={image} />
              </div>
            </div>
            <div className=" col-span-12 md:col-span-6 font-myfont mt-[1.5rem]">
              <div>
                <h2 className="text-[20px] sm:text-[1.5rem] font-bold">
                  {product.fullName}
                </h2>
                <p className="text-[18px] sm:text-[1.2rem] font-[600]">
                  $ {product.price}
                </p>
                <p className="text-[1rem] my-[2rem]">{product.description}</p>
                <div className="flex items-center space-x-5">
                  <button
                    type="button"
                    className="px-6 py-2.5 bg-[#666666] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#333333] hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => addItem(product)}
                  >
                    Add To Cart
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 border-[1px] border-[#666666] font-medium text-xs rounded hover:text-white hover:bg-[#333333] transition duration-150 ease-in-out"
                    onClick={() => navigate("/all")}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ProductDetails;
