import React from "react";
import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";
const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found"></img>
          <h3>Page not found 👻</h3>
          <p>We can't seem to find the page that you were looking for.</p>
          <Link to="/dashboard">Back Home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h3>Something went wrong.</h3>
      <Link to="/">Go to home</Link>
    </Wrapper>
      
    
  );
};

export default Error;
