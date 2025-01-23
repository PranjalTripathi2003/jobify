import React from "react";
import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";

import { Link } from "react-router-dom";
import { Logo } from "../components";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo></Logo>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span> Tracking</span> App
          </h1>
          <p>
            Jobify is a job-tracking application that helps you manage your
            applications in one place. It allows you to create new listings,
            update progress as you move through each stage, and visualize your
            overall job search. By centralizing these details, it keeps you
            organized, saves time, and makes your job hunt more efficient.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunting image" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
