import React from "react";

const Button = ({ label, onClick }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <button
      onClick={onClick}
      className={`z-1 bg-[url(../images/generic/bg-button.png)] font-elite w-fit flex bg-center bg-contain bg-no-repeat select-none text-black font-bold text-2xl xl:text-4xl py-6 xl:py-10 px-12 xl:px-20 hover:cursor-pointer hover:-rotate-5 hover:scale-110 duration-600 hover:transition-transform ${
        isLoaded ? "opacity-100" : "opacity-0"
      }  duration-1000`}
    >
      {label}
    </button>
  );
};

export default Button;
