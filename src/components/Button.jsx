import React from 'react';

const Button = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="z-1 bg-[url(../images/bg-button.png)] font-elite w-fit flex bg-center bg-contain bg-no-repeat w-auto text-black font-bold text-2xl xl:text-6xl py-6 xl:py-10 px-12 xl:px-20 hover:cursor-pointer hover:-rotate-5 hover:scale-110 duration-600 hover:transition-transform"
    >
      {label}
    </button>
  );
};

export default Button;
