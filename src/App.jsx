import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin.js";
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";
import { TextPlugin } from "gsap/TextPlugin.js";
import SplitType from "split-type";

//without this line, PixiPlugin and MotionPathPlugin may get dropped by your bundler (tree shaking)...
gsap.registerPlugin(PixiPlugin, MotionPathPlugin);
gsap.registerPlugin(TextPlugin);

const App = () => {
  // target p element for gsap animation
  const p = document.querySelector("p");
  const pElement = useRef(null);
  const p2Element = useRef(null);

  const navBtnOne = useRef(null);
  const navBtnTwo = useRef(null);
  const navBtnThree = useRef(null);

  let tl = gsap.timeline();

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

    gsap.set(pElement.current, { x: "-100%", opacity: 0 });

    const tl = gsap.timeline();

    setTimeout(() => {
      tl.to(pElement.current, {
        x: "0%", // Animate from the left to center
        opacity: 0.3, // Fade in the text
        // duration: 1, // Animation duration
        duration: 1,
        stagger: 0.5,
        onComplete: displayText,
      });

      tl.to(pElement.current, {
        opacity: 1, // Fade in the text
        duration: 1.2, // Animation duration
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
        delay: 2.5,
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
        delay: 2.5,
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
        delay: 2.5,
        ease: "power4.out",
        onComplete: () => {
          navBtnThree.current.classList.remove("border-opacity-5");
          navBtnThree.current.classList.add("border-opacity-40");
        },
      }
    );
  }, []);

  return (
    <>
      <main className="h-screen px-8 py-8">
        <nav className="text-slate-300">
          <ul className="flex flex-row justify-between gap-5 sm:gap-0 text-xl uppercase tracking-wider sm:w-4/5 mx-auto">
            <li
              ref={navBtnOne}
              className="w-14 cursor-pointer border-b-[1px] border-slate-100 border-opacity-0 py-1 text-center transition-all duration-700 ease-in-out hover:border-opacity-95"
            >
              Back
            </li>
            <li
              ref={navBtnTwo}
              className="w-16 cursor-pointer border-b-[1px]  border-slate-100 border-opacity-0 py-1 text-center transition-all duration-700 ease-in-out hover:border-opacity-95"
            >
              Nakson
            </li>
            <li
              ref={navBtnThree}
              className=" w-44 sm:h-9 sm:w-40 cursor-pointer border-opacity-5 rounded-md border-2 border-slate-400 py-1 text-center transition-all duration-700 hover:border-opacity-75"
            >
              What we Offer
            </li>
          </ul>
        </nav>

        <section
          className=" h-[50vh] my-16
        text-center mt-16 leading-normal sm:leading-none text-4xl sm:text-6xl lg:text-7xl  mx-auto uppercase  sm:w-4/5 pt-16 pb-8
        "
        >
          <p
            ref={pElement}
            className="py-2 text-center w-fit text-3xl mx-auto sm:text-6xl text-white opacity-0 uppercase"
          >
            BRIDGING THE GAP BETWEEN
          </p>
          <p ref={p2Element} className="text-white text-6xl ">
            <span className="text-4xl sm:text-6xl transition-all ease-in duration-1000 text-black">
              TECHNOLOGY
            </span>{" "}
            <span className="text-4xl sm:text-6xl transition-all ease-in duration-1000 text-black">
              &
            </span>{" "}
            <span className="text-4xl sm:text-6xl transition-all ease-in duration-1000 text-black">
              IMAGINATION
            </span>
          </p>
        </section>
      </main>
    </>
  );
};

export default App;
