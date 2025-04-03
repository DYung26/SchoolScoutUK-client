export default function AuthSideBanner() {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-700 to-blue-900 text-center text-white">
      <div className="flex flex-col m-20 items-start">
        <p className="text-5xl font-black text-left">
          Find Your Perfect School in the UK with Ease! 🎓🇬🇧
        </p>
        <p className="text-3xl text-left leading-relaxed font-bold">
          Discover top schools effortlessly with SchoolScoutUK.
          Our smart search, detailed insights, and personalized recommendations help you make the best choice for your child's education. Start exploring today!"
        </p>
        <a href="/signup" className="border bg-white text-blue-700 rounded px-4 py-2 font-bold text-3xl hover:!bg-blue-700 hover:text-white inline-block transition-all hover:drop-shadow-2xl">
          Get Started
        </a>
      </div>
    </div>
  );
}
