import React, { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin.js";
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";
import { TextPlugin } from "gsap/TextPlugin.js";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

//without this line, PixiPlugin and MotionPathPlugin may get dropped by your bundler (tree shaking)...
gsap.registerPlugin(PixiPlugin, MotionPathPlugin);
gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  // target p element for gsap animation
  const p = document.querySelector("p");
  const pElement = useRef(null);
  const p2Element = useRef(null);

  const navBtnOne = useRef(null);
  const navBtnTwo = useRef(null);
  const navBtnThree = useRef(null);

  const figure1 = useRef(null);
  const figure2 = useRef(null);
  const figure2_scroll_trigger = useRef(null);

  let tl = gsap.timeline();

  // get width
  useEffect(() => {
    const handleResize = () => {
      let width = window.innerWidth;
      console.log("w", width);
      if (width > 360) {
        navBtnThree.current.classList.remove("w-fit");
        navBtnThree.current.classList.add("w-18");
      } else {
        navBtnThree.current.classList.add("w-fit");
        navBtnThree.current.classList.remove("w-18");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize the class based on the initial window width

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // get
  gsap.timeline({
    scrollTrigger: {
      scrub: 1,
      trigger: ".scroll-trigger-ready__worm-wrap",
      start: "top 90%",
      end: "bottom 30%",
    },
  });

  const displayText = () => {
    p2Element.current.children[0].classList.remove("text-black");
    p2Element.current.children[1].classList.remove("text-black");
    p2Element.current.children[2].classList.remove("text-black");
  };

  useLayoutEffect(() => {
    // gsap.to(pElement.current, {
    //   x: 300,
    //   yoyo: false,
    //   duration: 2.3,
    //   repeat: 0,
    // });

    // setTimeout(() => {
    //   tl.to(pElement.current, {
    //     x: "50%",
    //     opacity: 1,
    //     yoyo: true,
    //     stagger: 0.2,
    //     duration: 1.2,
    //     repeat: 0,
    //   });
    // }, 500);

    gsap.to(figure1.current, {
      scrollTrigger: figure1.current, // start animation when ".box" enters the viewport
      onComplete: () => {
        // figure1.current.classList.remove("opacity-0");
        figure1.current.classList.remove("blur-lg");
      },
    });

    gsap.to(figure2.current, {
      scrollTrigger: figure2_scroll_trigger.current, // start animation when ".box" enters the viewport
      stagger: 0.5,
      onComplete: () => {
        figure2.current.classList.remove("blur-lg");
      },
    });

    gsap.set(pElement.current, { x: "-100%", opacity: 0 });

    const tl = gsap.timeline();

    setTimeout(() => {
      tl.to(pElement.current, {
        x: "0%", // Animate from the left to center
        opacity: 0.3, // Fade in the text
        // duration: 1, // Animation duration
        duration: 0.5,
        stagger: 0.5,
        onComplete: displayText,
      });

      tl.to(pElement.current, {
        opacity: 1, // Fade in the text
        duration: 1, // Animation duration
        stagger: 0.5,
      });
    }, 500);

    const ourText = SplitType.create(navBtnOne.current, { types: "chars" });
    const chars = ourText.chars;

    const ourText2 = SplitType.create(navBtnTwo.current, { types: "chars" });
    const chars2 = ourText2.chars;

    const ourText3 = SplitType.create(navBtnThree.current, { types: "chars" });
    const chars3 = ourText3.chars;

    gsap.fromTo(
      chars,
      {
        y: 100,
        opacity: 0,
        delay: 2.5,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 1,
        delay: 1.5,
        ease: "power4.out",
      }
    );

    gsap.fromTo(
      chars2,
      {
        y: 100,
        opacity: 0,
        delay: 2.5,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 1,
        delay: 1.5,
        ease: "power4.out",
      }
    );

    gsap.fromTo(
      chars3,
      {
        y: 100,
        opacity: 0,
        delay: 2.5,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 1,
        delay: 1.5,
        ease: "power4.out",
      }
    );
  }, []);

  return (
    <>
      <main className="h-screen px-8 py-8">
        <nav className="text-slate-300 w-[95%] mx-auto">
          <ul className="flex flex-row justify-between gap-5 sm:gap-0 text-[1rem]  sm:text-xl uppercase tracking-wider mx-auto">
            <li
              ref={navBtnOne}
              className="w-14 cursor-pointer border-b-[1px] border-slate-100 border-opacity-0 py-1 text-center transition-all duration-700 ease-in-out hover:border-opacity-95"
            >
              Back
            </li>
            <li
              ref={navBtnTwo}
              className="w-18 cursor-pointer border-b-[1px]  border-slate-100 border-opacity-0 py-1 text-center transition-all duration-700 ease-in-out hover:border-opacity-95"
            >
              Nakson
            </li>
            <li
              ref={navBtnThree}
              className="w-18 cursor-pointer border-b-[1px]  border-slate-100 border-opacity-0 py-1 text-center transition-all duration-700 ease-in-out hover:border-opacity-95"
            >
              Offers
            </li>
          </ul>
        </nav>

        <section
          className=" h-[50vh] my-16
        text-center mt-16  leading-none sm:text-6xl lg:text-7xl  mx-auto uppercase  sm:w-4/5 pt-24 pb-8
        "
        >
          <p
            ref={pElement}
            className="py-2 text-center w-fit text-4xl mx-auto sm:text-5xl 2xl:text-6xl text-white opacity-0 uppercase"
          >
            BRIDGING THE GAP BETWEEN
          </p>
          <p ref={p2Element} className="text-white text-6xl ">
            <span className="leading-3 text-4xl sm:text-5xl 2xl:text-6xl transition-all ease-in duration-1000 text-black">
              TECHNOLOGY
            </span>{" "}
            <span className="leading-3 text-4xl sm:text-5xl 2xl:text-6xl transition-all ease-in duration-1000 text-black">
              &
            </span>{" "}
            <span className="leading-3 text-4xl sm:text-5xl 2xl:text-6xl transition-all ease-in duration-1000 text-black">
              IMAGINATION
            </span>
          </p>
        </section>
      </main>

      <section className="flex flex-col gap-32 lg:gap-60 py-4 pb-32 lg:px-20">
        <figure
          ref={figure1}
          className="transition-all duration-700 blur-lg grid grid-cols-1 gap-7 px-1 py-4 lg:grid-cols-9"
        >
          <figcaption className=" flex flex-col gap-4 text-center text-2xl text-white lg:col-span-4 lg:-ml-12 lg:items-center lg:justify-center">
            <p className="text-3xl tracking-wide lg:text-4xl">
              Deepsea Life Sciences
            </p>
            <p className="mx-auto w-2/3 text-xl opacity-80 lg:w-3/4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. At ullam
              hic rerum eius distinctio? Esse, natus, ad repudiandae obcaecati
              illum recusandae harum hic facere rem veniam suscipit reiciendis
              molestias quas!
            </p>
          </figcaption>
          <div className="lg:col-span-5 flex flex-col">
            <img
              className="bg-left lg:col-span-5"
              src="https://i.imgur.com/CoJt4QQ.png"
              alt="Image Description"
            />
            <button className="mx-auto w-36 rounded-sm bg-gradient-to-r from-indigo-400 to-sky-600 py-1 sm:py-2 sm:text-xl font-semibold tracking-wider text-white transition-all duration-500 hover:scale-105">
              VISIT
            </button>
          </div>
        </figure>

        <figure
          ref={figure2}
          className="transition-all duration-700 blur-lg grid grid-cols-1 gap-7 px-1 py-4 lg:grid-cols-9"
        >
          <figcaption className=" flex flex-col gap-4 text-center text-2xl text-white lg:col-span-4 lg:-ml-12 lg:items-center lg:justify-center">
            <p
              ref={figure2_scroll_trigger}
              className="text-3xl tracking-wide lg:text-4xl"
            >
              MomDaughts
            </p>
            <p className="mx-auto w-2/3 text-xl opacity-80 lg:w-3/4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas qui,
              autem maxime nostrum inventore ad facilis asperiores sint ex ut
              cupiditate non quod ratione. Magnam at nisi magni aperiam quas.
            </p>
          </figcaption>
          <div className="flex flex-col lg:col-span-5 ">
            <img
              className="bg-left lg:col-span-5"
              src="https://i.imgur.com/XahLs5T.png"
              alt="Image Description"
            />
            <button className="mx-auto w-36 rounded-sm bg-gradient-to-r from-indigo-400 to-sky-600 py-1 sm:py-2 sm:text-xl font-semibold tracking-wider text-white transition-all duration-500 hover:scale-105">
              VISIT
            </button>
          </div>
        </figure>
      </section>
    </>
  );
};

export default App;
