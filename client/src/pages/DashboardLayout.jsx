// IMPORTS
import React, { createContext, useContext, useState } from "react";
import {
  Outlet,
  redirect,
  useLoaderData,
  useRouteLoaderData,
  useNavigate,
} from "react-router-dom";
import customFetch from "../utils/customFetch";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import Wrapper from "../assets/wrappers/Dashboard";
import { checkDefaultTheme } from "../App";
import { toast } from "react-toastify";

// LOADER
export const loader = async () => {
  try {
    const { data } = await customFetch("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

// CONTEXT CREATION
const DashboardContext = createContext();

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const navigate = useNavigate();
  const { user } = useLoaderData();

  // USE STATES
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  // TOGGLE THEME CONTEXT
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);

    localStorage.setItem("darkTheme", newDarkTheme);
  };

  // TOGGLE SIDEBAR CONTEXT
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // LOGGING OUT CONTEXT
  const logoutUser = async () => {
    navigate("/"); // returned to homepage
    await customFetch.get("/auth/logout"); // logged out from server
    toast.success("Logging out...");
  };


  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">

              {/* OUTLET CREATED HERE, SPACE FOR ALL THE CHILD PAGES, CONTAINS CONTEXT PROP*/}
              <Outlet context={{ user }} />

            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

// CUSTOM HOOK WITH OUR CONTEXT
export const useDashboardContext = () => {
  return useContext(DashboardContext);
};
export default DashboardLayout;
