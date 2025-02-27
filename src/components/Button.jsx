import React from 'react';

const Button = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[url(../images/bg-button.png)] font-elite w-fit flex bg-center bg-contain bg-no-repeat w-auto text-black font-bold text-3xl py-8 px-20 hover:cursor-pointer hover:-rotate-5 hover:scale-110 duration-600 hover:transition-transform"
    >
      {label}
    </button>
  );
};

export default Button;
