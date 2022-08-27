import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { gsap, Power4 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import useWindowDimensions from "../components/hooks/useWindowDimensions";
import { StoriesData } from "../assests/data/details";

function Stories() {
  gsap.registerPlugin(ScrollTrigger);
  const { width } = useWindowDimensions(); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (width > 560) {
      smoothscroll("#main-container");
    }

    function smoothscroll(content, viewport, smoothness) {
      gsap.registerPlugin(ScrollTrigger);
      content = gsap.utils.toArray(content)[0];
      smoothness = smoothness || 1;

      gsap.set(viewport || content.parentNode, {
        overflow: "hidden",
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
    const tl = gsap.timeline();
    tl.staggerFrom(".hidetext", 1.5, { y: 200, ease: Power4.easeOut }, 0.35);
  }, []);

  return (
    <div id="main-container">
      <Header />
      <div className="max-w-[1300px] 2xl:mx-auto md:mx-[3rem] mx-[1.5rem] py-[5rem]">
        <div className="md:my-[8rem] mb-[4rem]">
          <h1 className="font-bold lg:text-[6rem] md:text-[5rem] text-[35px] font-headerFont  relative overflow-hidden w-full md:h-[200px] h-[60px]">
            <span className="absolute z-[200] hidetext"> STORIES</span>
          </h1>
        </div>
        <div className="grid grid-cols-12 lg:gap-[5rem] gap-[1rem] font-myfont">
          {StoriesData.map((data) => (
            <div
              className="relative md:col-span-6 col-span-12 w-full h-full overflow-hidden"
              key={data.id}
            >
              <img
                src={data.imageUrl}
                alt="stories"
                className="w-full lg:h-[650px] md:h-[530px] h-[350px] object-cover hover:scale-[1.2] ease duration-500 transition-all cursor-pointer"
              />
              <p className="absolute text-white top-[1rem] left-[1rem] text-[1rem] uppercase">
                {data.title}
              </p>
              <p className="absolute text-white top-[1rem] right-[1rem] text-[1rem] uppercase">
                {data.date}
              </p>
              <p className="absolute text-white bottom-[1rem] left-[1rem] text-[1rem]">
                {data.footerTitle}
              </p>
            </div>
          ))}

          {/* <div className="relative col-span-6 w-full h-[60%] overflow-hidden">
            <img
              src="https://cdn.shopify.com/s/files/1/0564/0830/9941/articles/image0_1_cf413d18-9be6-4b04-ad09-22871ec760d6_1000x1000.jpg?v=1636113235"
              alt=""
              className="w-full h-full object-cover hover:scale-[1.2] ease duration-500 transition-all cursor-pointer"
            />
            <p className="absolute text-white top-[1rem] left-[1rem] text-[1rem]">
              STORY
            </p>
            <p className="absolute text-white top-[1rem] right-[1rem] text-[1rem]">
              AUG 2019
            </p>
            <p className="absolute text-white bottom-[1rem] left-[1rem] text-[1rem]">
              Best Seller Ecommerece
            </p>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Stories;
