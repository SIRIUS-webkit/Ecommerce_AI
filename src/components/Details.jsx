import React, { useEffect, useRef, useState } from "react";
import { details } from "../components/data/details";
import FeatureSlide from "./FeatureSlide";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

function Details() {
  gsap.registerPlugin(ScrollTrigger);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const featuredLeftDetails = useRef(null);
  const featuredRightDetails = useRef(null);

  useEffect(() => {
    smoothscroll("#main-container");
    function stopTrigger() {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: featuredRightDetails.current,
          start: "top top",
          end: () => `+=${featuredLeftDetails.current.offsetHeight}`,

          scrub: true,
          pin: true,
        },
      });
      return tl;
    }

    const master = gsap.timeline();
    master.add(stopTrigger());

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
  }, []);

  return (
    <div
      ref={featuredLeftDetails}
      id="featuredLeftId"
      className="grid grid-cols-2 mt-[8.1rem] "
    >
      <div className="">
        {details.map((detail, index) => {
          return (
            <FeatureSlide
              key={index}
              title={detail.title}
              content={detail.content}
              index={index}
              updateActiveImage={setActiveFeatureIndex}
            />
          );
        })}
      </div>
      <div
        ref={featuredRightDetails}
        className=" h-[100vh] relative overflow-hidden"
        id="featuredRightId"
      >
        {details.map(({ imageUrl }, index) => {
          return (
            <img
              className={
                activeFeatureIndex === index
                  ? "featuredactive featuredimg"
                  : "featuredimg"
              }
              key={index}
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Details;
