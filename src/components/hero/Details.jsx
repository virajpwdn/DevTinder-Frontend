import PhotoContainer from "./PhotoContainer";
import { HEADING, PHOTOPATH } from "../../utils/constants";
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
      imgRefs.current.forEach((card, i) => {
        gsap.set(card, {
          y: "180%",
          rotate: i % 2 === 0 ? -10 : 10,
        });
      });

    //   gsap.set(sectionRef.current, {
    //     opacity: 0,
    //   });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1500",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          markers: true,
        },
      });

    //   tl.to(sectionRef.current, {
    //     opacity: 1,
    //   });

      tl.to(imgRefs.current, {
        y: 0,
        rotate: 0,
        duration: 2,
        stagger: 1,
        ease: "power2.out",
      });
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="py-40 px-40 flex items-center justify-center gap-32 bg-black relative overflow-hidden h-screen"
    >
      <div className="lg:w-1/2 heading-container flex flex-col gap-10 ">
        {HEADING.map((text, idx) => (
          <h1
            key={idx}
            ref={(el) => (textRefs.current[idx] = el)}
            className="text-5xl whitespace-pre-line text-white"
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
          className="card bg-green-500 text-white rounded-3xl max-w-96 w-full p-5  flex flex-col justify-between absolute top-32"
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

// photos-container lg:w-1/2 lg:sticky lg:top-0 h-screen overflow-hidden flex items-center justify-center
// relative w-full h-[50vh] bg-red-500 rounded-2xl overflow-hidden

/**
 *  <div className="photos-container relative">
        <div className="bg-blue text-white rounded-xl max-w-115 w-full p-10 min-h-112 flex flex-col justify-between ml-auto">
          {PHOTOPATH.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => (imgRefs.current[idx] = el)}
              className=""
            >
              <PhotoContainer src={item.src} />
            </div>
          ))}
        </div>
      </div>
 */
