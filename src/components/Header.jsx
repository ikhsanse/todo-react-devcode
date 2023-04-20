import React from "react";

const Header = () => {
  return (
    <header
      data-cy="header-background"
      className="fixed top-0 left-0 h-20 w-screen bg-primary"
    >
      <div className="flex justify-start h-full items-center max-w-[1002px] px-10 lg:px-0 m-auto">
        <h1 data-cy="header-title" className="text-white font-bold text-2xl">TO DO LIST APP</h1>
      </div>
    </header>
  );
};

export default Header;
