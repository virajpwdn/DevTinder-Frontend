import { useNavigate } from "react-router";
import heroImg from "../assets/devtinderhero.webp";
import TomCruise from "../assets/TomCruise.png";
import chatImg from "../assets/chat.png";
import HeroSection from "./HeroSection";

const Hero = () => {
  const navigate = useNavigate();
  const createAccountHandler = () => {
    navigate("/login");
  };
  return (
    <>
      <HeroSection />

      <div className="bg-[#191E23]">
        {/* ================= HERO SECTION ================= */}
        <div
          className="hero min-h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        >
          <div className="hero-overlay bg-black/60"></div>

          <div className="hero-content text-center text-neutral-content px-6">
            <div className="max-w-3xl">
              <h1
                className="mb-6 font-bold text-white
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              >
                Hello there
              </h1>

              <p
                className="mb-8 text-zinc-200
          text-base sm:text-lg md:text-xl leading-relaxed"
              >
                DevTinder is a platform where developers can connect, chat,
                collaborate on projects, and even build businesses together.
                Meet like-minded devs and turn ideas into reality.
              </p>

              <button
                onClick={createAccountHandler}
                className="btn btn-primary btn-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* ================= MAKE FRIENDS ================= */}
        <div className="hero bg-base-200 py-24">
          <div
            className="hero-content max-w-7xl px-6
      flex-col-reverse lg:flex-row-reverse gap-16"
          >
            <img
              src={TomCruise}
              alt="Make Friends"
              className="w-full max-w-sm md:max-w-md lg:max-w-lg
        rounded-lg shadow-2xl"
            />

            <div className="text-center lg:text-left max-w-xl">
              <h1
                className="font-bold
          text-3xl sm:text-4xl lg:text-5xl"
              >
                Make Friends
              </h1>

              <p className="py-6 text-base sm:text-lg leading-relaxed">
                DevTinder helps you meet like-minded developers, share ideas,
                and build genuine connections beyond just code. Find your next
                coding buddy or future co-founder — it all starts with a
                conversation.
              </p>

              <button
                onClick={createAccountHandler}
                className="btn btn-primary btn-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* ================= REAL TIME CHAT ================= */}
        <div className="hero bg-base-200 py-24">
          <div
            className="hero-content max-w-7xl px-6
      flex-col lg:flex-row gap-16"
          >
            <img
              src={chatImg}
              alt="Real Time Chat"
              className="w-full max-w-sm md:max-w-md lg:max-w-lg
        rounded-lg shadow-2xl"
            />

            <div className="text-center lg:text-left max-w-xl">
              <h1
                className="font-bold
          text-3xl sm:text-4xl lg:text-5xl"
              >
                Real-Time Chat
              </h1>

              <p className="py-6 text-base sm:text-lg leading-relaxed">
                Instantly connect with fellow developers through real-time
                messaging. Share ideas, discuss code, and build meaningful
                conversations — all without leaving the platform.
              </p>

              <button
                onClick={createAccountHandler}
                className="btn btn-primary btn-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <footer className="footer footer-center bg-base-300 text-base-content py-6">
          <p className="text-sm sm:text-base">
            Copyright © {new Date().getFullYear()} — All rights reserved by
            DevTinder Inc.
            <br />
              <span className="text-xs pt-1 text-slate-500">* This are tentative numbers used for demonstration</span>
          </p>
        </footer>
      </div>
    </>
  );
};

export default Hero;
