import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import useWindowDimensions from "../components/hooks/useWindowDimensions";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Order() {
  // testing
  const cartDatas = useSelector((state) => state.cartDatas);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { width } = useWindowDimensions(); // eslint-disable-line react-hooks/exhaustive-deps
  let [cardItems, setCardItems] = useState(cartDatas);
  const containerRef = useRef(null);

  useEffect(() => {
    if (width > 560) {
      smoothscroll("#main-container");
    }

    function smoothscroll(content, viewport, smoothness) {
      gsap.registerPlugin(ScrollTrigger);
      content = gsap.utils.toArray(content)[0];
      smoothness = smoothness || 1;

      gsap.set(viewport || content.parentNode, {
        overflow: "auto",
        position: "fixed",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      });
      gsap.set(content, { overflow: "visible", width: "100%" });

      let getProp = gsap.getProperty(content),
        setProp = gsap.quickSetter(content, "y", "px"),
        setScroll = ScrollTrigger.getScrollFunc(window),
        removeScroll = () => (content.style.overflow = "visible"),
        killScrub = (trigger) => {
          let scrub = trigger.getTween
            ? trigger.getTween()
            : gsap.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
          scrub && scrub.kill();
          trigger.animation.progress(trigger.progress);
        },
        height,
        isProxyScrolling;

      function refreshHeight() {
        console.log(containerRef.current.clientHeight, content.clientHeight);
        height = content.clientHeight;
        content.style.overflow = "visible";
        document.body.style.height = height + "px";
        return height - document.documentElement.clientHeight;
      }

      ScrollTrigger.addEventListener("refresh", () => {
        removeScroll();
        requestAnimationFrame(removeScroll);
      });
      ScrollTrigger.defaults({ scroller: content });
      ScrollTrigger.prototype.update = (p) => p; // works around an issue in ScrollTrigger 3.6.1 and earlier (fixed in 3.6.2, so this line could be deleted if you're using 3.6.2 or later)

      ScrollTrigger.scrollerProxy(content, {
        scrollTop(value) {
          if (arguments.length) {
            isProxyScrolling = true; // otherwise, if snapping was applied (or anything that attempted to SET the scroll proxy's scroll position), we'd set the scroll here which would then (on the next tick) update the content tween/ScrollTrigger which would try to smoothly animate to that new value, thus the scrub tween would impede the progress. So we use this flag to respond accordingly in the ScrollTrigger's onUpdate and effectively force the scrub to its end immediately.
            setProp(-value);
            setScroll(value);
            return;
          }
          return -getProp("y");
        },
        scrollHeight: () => document.body.scrollHeight,
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });

      return ScrollTrigger.create({
        animation: gsap.fromTo(
          content,
          { y: 0 },
          {
            y: () => document.documentElement.clientHeight - height,
            ease: "none",
            onUpdate: ScrollTrigger.update,
          }
        ),
        scroller: window,
        invalidateOnRefresh: true,
        start: 0,
        end: refreshHeight,
        refreshPriority: -999,
        scrub: smoothness,
        onUpdate: (self) => {
          if (isProxyScrolling) {
            killScrub(self);
            isProxyScrolling = false;
          }
        },
        onRefresh: killScrub, // when the screen resizes, we just want the animation to immediately go to the appropriate spot rather than animating there, so basically kill the scrub.
      });
    }
  }, [width]);

  useEffect(() => {
    dispatch({ type: "UPDATE_CARTITEM", data: cardItems });
  }, [cardItems, dispatch]);

  let totalprice = cardItems.reduce(
    (price, item) => price + item.quantity * Number(item.price),
    0
  );
  totalprice = totalprice
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // add item
  const addItem = (product) => {
    const ProductExitst = cardItems.find((item) => item.id === product.id);
    if (ProductExitst) {
      setCardItems(
        cardItems.map((item) =>
          item.id === product.id
            ? {
                ...ProductExitst,
                quantity: ProductExitst.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCardItems([...cardItems, { ...product, quantity: 1 }]);
    }
  };

  // remove Item
  const removeItem = (product) => {
    const ProductExitst = cardItems.find((item) => item.id === product.id);
    if (ProductExitst.quantity === 1) {
      setCardItems(cardItems.filter((item) => item.id !== product.id));
    } else {
      setCardItems(
        cardItems.map((item) =>
          item.id === product.id
            ? {
                ...ProductExitst,
                quantity: ProductExitst.quantity - 1,
              }
            : item
        )
      );
    }
  };

  // delete item
  const deleteItem = (product) => {
    setCardItems(cardItems.filter((item) => item.id !== product.id));
  };

  return (
    <div id="main-container" ref={containerRef}>
      <Header />
      <div className="max-w-[1000px] 2xl:mx-auto md:mx-[5rem] mx-[1.5rem] py-[5rem] font-myfont">
        {cartDatas.length === 0 ? (
          <div className="mb-[8rem]">
            <h1 className="text-[3rem] font-[400] ">Cart</h1>
            <h1 className="text-[1rem] mt-[2rem] mb-[1rem]">No Order Yet!</h1>
            <button
              type="button"
              className="px-6 py-2.5 bg-[#666666] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#333333] hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
              onClick={() => navigate("/all")}
            >
              Shop Now
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-[3rem] font-[400] mb-[3rem]">Cart</h1>
            <div className="grid grid-cols-12 px-[1rem] py-[1rem] border-b-[2px] border-[#eeeeee] font-bold md:text-[1rem] text-[12px]">
              <div className="col-span-5">
                <h1>PRODUCT</h1>
              </div>
              <div className="col-span-4">
                <h1>QUANTITY</h1>
              </div>
              <div className="col-span-3">
                <h1>AMOUNT</h1>
              </div>
            </div>
            {cartDatas.map((data) => {
              let result = (data.quantity * data.price).toFixed(2);
              result = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              return (
                <div
                  className="grid grid-cols-12 px-[1rem] py-[1rem] border-b-[2px] border-[#eeeeee] items-center"
                  key={data.id}
                >
                  <div className="col-span-5 flex space-x-2 items-center">
                    <div className="w-[80px] h-[80px]">
                      <img
                        src={data.url}
                        alt="product"
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <p className="hidden md:block">{data.fullName}</p>
                  </div>
                  <div className="col-span-4">
                    <div className="flex justify-around items-center w-[90%] md:w-[40%] h-[30px] rounded-md  text-[1rem]">
                      <span
                        className="text-[14px] md:text-[1.2rem] cursor-pointer w-[20px] h-[20px] bg-gray-500 flex items-center justify-center rounded-full text-white"
                        onClick={() => removeItem(data)}
                      >
                        -
                      </span>
                      <h3>{data.quantity}</h3>
                      <span
                        className="text-[14px] md:text-[1.2rem] cursor-pointer w-[20px] md:w-[40px h-[20px]  bg-gray-500 flex items-center justify-center rounded-full text-white"
                        onClick={() => addItem(data)}
                      >
                        +
                      </span>
                    </div>
                  </div>
                  <div className="col-span-3 mt-[1rem]">
                    <h1 className="text-[12px] md:text-[1rem]">$ {result}</h1>
                    <div className="text-right">
                      <button
                        type="button"
                        className="underline text-red-500 text-[10px] md:text-[1rem]"
                        onClick={() => deleteItem(data)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="text-right mt-[2rem]">
              <div className="mb-[2rem]">
                <h1 className="font-bold md:text-[1.2rem] text-[14px]">
                  Total
                </h1>
                <p>$ {totalprice}</p>
              </div>
              <button
                type="button"
                className=" inline-block px-6 py-2.5 bg-[#666666] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#333333] hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
              >
                Check Out
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Order;
