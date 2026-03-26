import { useRef } from "react";
import PhotoContainer from "./PhotoContainer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const scrollSectionRef = useRef(null);
  const topH1Ref = useRef(null);
  const imgRef = useRef(null);
  const bottomH1Ref = useRef(null);

  useGSAP(
    () => {
      const cards = cardRefs.current;
      const section = scrollSectionRef.current;
      const topH1 = topH1Ref.current;
      const img = imgRef.current;
      const bottomH1 = bottomH1Ref.current;

      console.log("h1 ref ", topH1);
      if (!section || !topH1 || !img || !bottomH1) return;

      // --- Cards stagger in ---
      gsap.set(cards, { opacity: 0, y: 60 });
      cards.forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: index * 0.3,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 50%",
          },
        });
      });

      // --- Pinned scroll section ---
      gsap.set(topH1, { y: 40, opacity: 0 });
      gsap.set(img, { opacity: 0, scale: 0.4 });
      gsap.set(bottomH1, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=800",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(topH1, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
      tl.to(
        img,
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
        "+=0.1",
      );
      tl.to(
        bottomH1,
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        "+=0.1",
      ).to(topH1, { opacity: 0, duration: 0.2, ease: "power2.in" }, "<");
    },
    { scope: containerRef },
  );

  return (
    <>
      <div ref={containerRef} className="bg-white w-full p-5 md:p-20 py-20">
        <div className="feature-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {[
            { src: "/hero/img-1.webp", text: "Make Friends" },
            { src: "/hero/img-2.png", text: "Real Time Chat" },
            { src: "/hero/img-3.png", text: "Collaborate on Project" },
          ].map((item, index) => (
            <div key={index} ref={(el) => (cardRefs.current[index] = el)}>
              <PhotoContainer src={item.src} text={item.text} />
            </div>
          ))}
        </div>
      </div>

      <div
        ref={scrollSectionRef}
        className="scroll-photo w-full h-screen overflow-hidden md:p-20 flex items-center justify-center flex-col bg-white"
      >
        <h1
          ref={topH1Ref}
          className="hidden md:block text-5xl md:text-8xl font-black uppercase py-10 text-center"
        >
          Build your Dream Team
        </h1>
        <h1 className="block md:hidden text-5xl md:text-8xl font-black uppercase py-10 text-center">
          Build your <br />
          Dream Team
        </h1>

        <div ref={imgRef} className="p-5 flex items-center justify-center">
          <img
            src="/hero/img-4.png"
            className="w-full md:w-1/2 rounded-xl"
            alt="team-building"
          />
        </div>
        <h1
          ref={bottomH1Ref}
          className="text-2xl font-black uppercase py-5 text-center"
        >
          Find your vibe
        </h1>
      </div>
    </>
  );
};

export default Features;
