import { useNavigate } from "react-router"

export default function HeroSection() {
  const navigate = useNavigate()
  return (
    <div className="relative bg-zinc-950 overflow-hidden">
      {/* Subtle gradient background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="relative">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-6 py-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <span className="text-xl font-semibold text-white">Devtinder</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-zinc-400 hover:text-white transition-colors">
              How it works
            </a>
            <a href="#community" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Community
            </a>
          </div>

          <div className="flex items-center gap-4">
            {/* <button className="px-4 py-2 text-sm text-zinc-300 hover:text-white transition-colors">Login</button> */}
            <button onClick={() => navigate("/login")} className="px-6 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Get started
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <main className="mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-32 sm:pt-32 sm:pb-40">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-sm text-zinc-400 mb-8 backdrop-blur-sm">
              <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <span>Connect with developers worldwide</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl mb-6 text-white">
              Where developers <span className="text-blue-500">connect</span>,{" "}
              <span className="text-indigo-500">collaborate</span>, and build together
            </h1>

            {/* Subheading */}
            <p className="mt-6 text-lg leading-8 text-zinc-400 max-w-2xl mx-auto">
              Join thousands of developers making meaningful connections. Chat in real-time, collaborate on projects,
              and build the future together on devtinder.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              <button onClick={() => navigate("/login")} className="flex items-center gap-2 px-8 py-3 text-base bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Start connecting
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button onClick={() => navigate("/login")} className="px-8 py-3 text-base border border-zinc-700 hover:bg-zinc-900 text-white rounded-lg transition-colors bg-transparent">
                Explore community
              </button>
            </div>

            {/* Feature Pills */}
            <div className="mt-16 flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm backdrop-blur-sm">
                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span className="text-white">Make friends</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm backdrop-blur-sm">
                <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="text-white">Real-time chat</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm backdrop-blur-sm">
                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
                <span className="text-white">Collaborate on projects</span>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500/5 rounded-2xl blur-xl group-hover:bg-blue-500/10 transition-colors" />
                <div className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6 hover:border-blue-500/50 transition-colors">
                  <div className="text-4xl font-bold text-white mb-2">50K+</div>
                  <div className="text-sm text-zinc-400">Active developers</div>
                  <div className="h-2 w-2 rounded-full absolute top-5 right-16">*</div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl blur-xl group-hover:bg-indigo-500/10 transition-colors" />
                <div className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6 hover:border-indigo-500/50 transition-colors">
                  <div className="text-4xl font-bold text-white mb-2">1M+</div>
                  <div className="text-sm text-zinc-400">Connections made</div>
                  <div className="h-2 w-2 rounded-full absolute top-5 right-[70px]">*</div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500/5 rounded-2xl blur-xl group-hover:bg-blue-500/10 transition-colors" />
                <div className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6 hover:border-blue-500/50 transition-colors">
                  <div className="text-4xl font-bold text-white mb-2">10K+</div>
                  <div className="text-sm text-zinc-400">Projects launched</div>
                  <div className="h-2 w-2 rounded-full absolute top-5 right-16">*</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
