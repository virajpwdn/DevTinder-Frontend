import { useNavigate } from "react-router";
import heroImg from "../assets/devtinderhero.webp";
import TomCruise from "../assets/TomCruise.png";
import chatImg from "../assets/chat.png";

const Hero = () => {
  const navigate = useNavigate();
  const createAccountHandler = () => {
    navigate("/login");
  };
  return (
    <div className="bg-[#191E23]">
      <div
        className="hero min-h-screen object-cover"
        style={{
          backgroundImage: `url(${heroImg})`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-white">Hello there</h1>
            <p className="mb-5 text-zinc-200">
              DevTinder is a platform where developers can connect, chat,
              collaborate on projects, and even build businesses together. Meet
              like-minded devs and turn ideas into reality.
            </p>
            <button onClick={createAccountHandler} className="btn btn-primary">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="hero bg-base-200 min-h-screen max-lg:text-center pt-14">
          <div className="hero-content flex-col gap-40 max-lg:gap-14 lg:flex-row-reverse max-lg:flex-col-reverse">
            <img src={TomCruise} className="max-w-sm rounded-lg shadow-2xl" />
            <div>
              <h1 className="text-5xl font-bold">Make Friends</h1>
              <p className="py-6 w-96">
                DevTinder helps you meet like-minded developers, share ideas,
                and build genuine connections beyond just code. Find your next
                coding buddy or future co-founder — it all starts with a
                conversation.
              </p>
              <button
                onClick={createAccountHandler}
                className="btn btn-primary"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="hero bg-base-200 min-h-screen max-lg:text-center pt-14">
          <div className="hero-content flex-row gap-40 max-lg:gap-14 lg:flex-row max-lg:flex-col-reverse">
            <img src={chatImg} className="w-80 rounded-lg shadow-2xl" />
            <div>
              <h1 className="text-5xl font-bold">Real-Time Chat</h1>
              <p className="py-6 w-96">
                Instantly connect with fellow developers through real-time
                messaging. Share ideas, discuss code, and build meaningful
                conversations — all without leaving the platform.
              </p>
              <button
                onClick={createAccountHandler}
                className="btn btn-primary"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
          <aside>
            <p>
              Copyright © {new Date().getFullYear()} - All right reserved by
              DevTinder Inc.
            </p>
          </aside>
        </footer>
      </div>
    </div>
  );
};

export default Hero;
