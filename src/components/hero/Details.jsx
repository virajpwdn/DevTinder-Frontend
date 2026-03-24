import PhotoContainer from "./PhotoContainer";
import { HEADING, PHOTOPATH } from "../../utils/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Details = () => {
  const sectionRef = useRef(null);
  const textRefs = useRef([]);
  const imgRefs = useRef([]);
  const currentIndex = useRef(0);
  return (
    <div
      ref={sectionRef}
      className="py-40 px-40 flex items-center justify-center gap-32 bg-black relative"
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
      <div className="photos-container lg:w-1/2 lg:sticky lg:top-0 h-screen overflow-hidden flex items-center justify-center">
        <div className="relative w-full h-[50vh] bg-red-500 rounded-2xl overflow-hidden">
          {PHOTOPATH.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => (imgRefs.current[idx] = el)}
              className="absolute inset-0"
            >
              <PhotoContainer src={item.src} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Details;
