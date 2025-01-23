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
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, atque
            tempora, deleniti recusandae ex impedit fuga corrupti laboriosam
            sint facere dolore iure accusantium quam dolor nostrum quasi ut
            beatae provident?
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
