import React from 'react';

const Button = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-2/3 border-4 border-blue-950 bg-blue-900 text-center font-serif  text-white font-bold text-2xl rounded-md pt-2 pb-2 cursor-pointer"
    >
      {label}
    </button>
  );
};

export default Button;
