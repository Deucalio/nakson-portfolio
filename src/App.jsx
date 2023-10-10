import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin.js";
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";

//without this line, PixiPlugin and MotionPathPlugin may get dropped by your bundler (tree shaking)...
gsap.registerPlugin(PixiPlugin, MotionPathPlugin);

const App = () => {
  // target p element for gsap animation
  const p = document.querySelector("p");
  const pElement = useRef(null);
  const p2Element = useRef(null);
  let tl = gsap.timeline();

  // get

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
        opacity: 0.4, // Fade in the text
        duration: 1, // Animation duration
        stagger: 0.5,
      });

      tl.to(pElement.current, {
        opacity: 1, // Fade in the text
        duration: 1.2, // Animation duration
        stagger: 0.5,
      });
    }, 500);

    // setTimeout(() => {
    //   p2Element.current.classList.remove("opacity-0");
    // }, 1500);

    setTimeout(() => {
      p2Element.current.children[0].classList.remove("opacity-0");
      p2Element.current.children[1].classList.remove("opacity-0");
      p2Element.current.children[2].classList.remove("opacity-0");

    }, 1200);
  }, []);

  // tl.from(pElement.current, { duration: 1, x: -100 })
  //   .set(pElement.current, { opacity: 0 })

  // make the text come from the left

  return (
    <>
      <main class="h-screen px-8 py-8">
        <nav class="text-slate-300">
          <ul class="flex flex-row justify-between gap-5 sm:gap-0 text-xl uppercase tracking-wider sm:w-4/5 mx-auto">
            <li class="w-14 cursor-pointer border-b-[1px] border-slate-100 border-opacity-0 py-1 text-center transition-all duration-700 ease-in-out hover:border-opacity-95">
              Back
            </li>
            <li class="w-14 cursor-pointer border-b-[1px] border-slate-100 border-opacity-0 py-1 text-center transition-all duration-700 ease-in-out hover:border-opacity-95">
              Nakson
            </li>
            <li class=" w-44 sm:h-9 sm:w-40 cursor-pointer rounded-md border-2 border-slate-400 border-opacity-40 py-1 text-center transition-all duration-700 hover:border-opacity-75">
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
          <p
            ref={p2Element}
            className="text-white text-6xl transition-all duration-700"
          >
            <span className="transition-all duration-1000 opacity-0">TECHNOLOGY</span>{" "}
            <span className="transition-all duration-1000 opacity-0">&</span>{" "}
            <span className="transition-all duration-1000 opacity-0">IMAGINATION</span>
          </p>
        </section>
      </main>
    </>
  );
};

export default App;
