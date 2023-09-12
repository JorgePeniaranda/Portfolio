import React from "react";

export const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header className="w-full h-full home-primary-text">{children}</header>
  );
};
