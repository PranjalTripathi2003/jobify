import React from "react";
import { BsFillSunFill, BsFillMoonFill, BsSunFill } from "react-icons/bs";
import Wrapper from "../assets/wrappers/ThemeToggle";
import { useDashboardContext } from "../pages/DashboardLayout";

const ThemeToggle = () => {
  const {isDarkTheme, toggleDarkTheme} = useDashboardContext();
  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsSunFill className="toggle-icon"></BsSunFill>
      ) : (
        <BsFillMoonFill></BsFillMoonFill>
      )}
    </Wrapper>
  );
};

export default ThemeToggle;
