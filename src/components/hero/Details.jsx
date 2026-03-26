import { HEADING } from "../../utils/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Details = () => {
  const sectionRef = useRef(null);
  const textRefs = useRef([]);
  const imgRefs = useRef([]);

  useGSAP(
    () => {
      // all headings dim initially
      gsap.set(textRefs.current, { color: "#ffffff40" }); // dim/faded white

      imgRefs.current.forEach((card, i) => {
        gsap.set(card, {
          y: "180%",
          rotate: i % 2 === 0 ? -10 : 10,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1500",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          // markers: true,
        },
      });

      // Card 0 comes in → heading 0 brightens
      tl.to(
        imgRefs.current[0],
        { y: 0, rotate: 0, duration: 2, ease: "power2.out" },
        0,
      );
      tl.to(
        textRefs.current[0],
        { color: "#ffffff", duration: 1, ease: "none" },
        0, // same start as card 0
      );

      // Card 1 comes in → heading 0 dims, heading 1 brightens
      tl.to(
        imgRefs.current[1],
        { y: 0, rotate: 0, duration: 2, ease: "power2.out" },
        1,
      );
      tl.to(
        textRefs.current[0],
        { color: "#ffffff40", duration: 1, ease: "none" },
        1, // dim heading 0 as card 1 arrives
      );
      tl.to(
        textRefs.current[1],
        { color: "#ffffff", duration: 1, ease: "none" },
        1, // brighten heading 1
      );

      // Card 2 comes in → heading 1 dims, heading 2 brightens
      tl.to(
        imgRefs.current[2],
        { y: 0, rotate: 0, duration: 2, ease: "power2.out" },
        2,
      );
      tl.to(
        textRefs.current[1],
        { color: "#ffffff40", duration: 1, ease: "none" },
        2,
      );
      tl.to(
        textRefs.current[2],
        { color: "#ffffff", duration: 1, ease: "none" },
        2,
      );
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="py-5 md:py-40 px-5 md:px-40 flex items-center justify-center gap-10 sm:gap-32 bg-black relative overflow-hidden h-screen"
    >
      <div className="lg:w-1/2 heading-container flex flex-col gap-10 w-full">
        {HEADING.map((text, idx) => (
          <h1
            key={idx}
            ref={(el) => (textRefs.current[idx] = el)}
            className="text-lg sm:text-4xl lg:text-5xl whitespace-pre-line w-full"
          >
            {text.title}
          </h1>
        ))}
      </div>

      {/* right cards */}
      <div className="relative">
        <div
          ref={(el) => (imgRefs.current[0] = el)}
          className="card bg-blue-500 text-white rounded-3xl max-w-96 w-full p-5 flex flex-col justify-between"
        >
          <img
            src="/hero/img-7.jpg"
            className="rounded-3xl"
            alt="optimise profile"
          />
        </div>

        <div
          ref={(el) => (imgRefs.current[1] = el)}
          className="card bg-yellow-500 text-white rounded-3xl max-w-96 w-full p-5 flex flex-col justify-between absolute top-16"
        >
          <img
            src="/hero/img-6.jpg"
            className="rounded-3xl"
            alt="optimise profile"
          />
        </div>

        <div
          ref={(el) => (imgRefs.current[2] = el)}
          className="card bg-green-500 text-white rounded-3xl max-w-96 w-full p-5 flex flex-col justify-between absolute top-32"
        >
          <img
            src="/hero/img-5.jpg"
            className="rounded-3xl"
            alt="optimise profile"
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
