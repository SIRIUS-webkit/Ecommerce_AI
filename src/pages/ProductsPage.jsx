import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Products from "../components/Products";
import SearchBar from "../components/SearchBar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import useWindowDimensions from "../components/hooks/useWindowDimensions";
import allProducts from "../data/all";

function ProductsPage() {
  gsap.registerPlugin(ScrollTrigger);
  const { width } = useWindowDimensions(); // eslint-disable-line react-hooks/exhaustive-deps
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
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

  // search result
  const handleSearch = (input) => {
    input = input.toLowerCase().trim();
    setSearch(input);
    const arr = input.split(" ");
    let all = [];
    var exact = allProducts?.filter((found) => {
      var temp =
        found.fullName + " " + found.id + " " + found.brand + " " + found.color;
      temp = temp.toLowerCase();
      return (
        arr.every((item) => temp.includes(item)) ||
        found.url.toLowerCase().includes(input.replace("http", ""))
      );
    });
    all.push(...exact);

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].length < 2 || arr[i] === "I" || arr[i] === "to") {
        // all = [];
        continue;
      }

      var similar = allProducts?.filter((found) => {
        return (
          found.fullName.toLowerCase().includes(arr[i]) ||
          found.color.toLowerCase().includes(arr[i]) ||
          found.id.toLowerCase().includes(arr[i]) ||
          found.brand.toLowerCase().includes(arr[i]) ||
          found.url.toLowerCase().includes(input.replace("http", ""))
        );
      });
      all.push(...similar);
    }

    all = [...new Set(all)];
    // shuffle(all);
    setResult([...all]);
  };
  return (
    <div id="main-container">
      <Header />
      <SearchBar search={handleSearch} />
      <Products
        products={search?.length === 0 ? allProducts : result}
        input={search}
      />
      <Footer />
    </div>
  );
}

export default ProductsPage;
