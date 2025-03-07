import Button from "../components/Button";
import ampolla from "@assets/images/ampolla.png";

const SplashScreen = ({ title, location }) => {

  const handleStart = () => {
    props.history.push("/scena1");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 md:gap-10 h-screen bg-[url(../images/bg-splash.webp)] bg-center bg-clip-border bg-cover bg-origin-border bg-no-repeat gap-auto">
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <h1 className="2xl:w-1/2 md:w-2/3 w-2/3 text-5xl md:text-7xl xl:text-8xl font-bold text-center font-elite text-orange-600 z-1">
        {title}
      </h1>
      <div className="flex items-end justify-center gap-1">
        <h3 className="font-elite text-3xl md:text-3xl xl:text-6xl z-1 text-white">
          {location}
        </h3>
        <img
          src={ampolla}
          alt="ampolla"
          className="h-10 xl:h-16 z-1 transition-transform duration-300 ease-in-out transform hover:scale-120 animate-shake"
        />
      </div>
      <Button label="INIZIA" onClick={handleStart} />
    </div>
  );
};

export default SplashScreen;
