import React, { useEffect, useState } from "react";
import asideBarCss from "./asideBarCss.module.css";
import ImageLink from "../ImageLink/ImageLink";
import LogOut from "../LogOut/LogOut";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import cloudSvg from "/src/assets/Images/cloud.svg"
import imageDashboard from  "/src/assets/Images/dashboard-5481.svg"
import imageAnalitycs from "/src/assets/Images/chart_18432151.png"
import imageSettings from "/src/assets/Images/settings-171.svg"
import imageRegister from "/src/assets/Images/user_10977431.png"
import imageLogin from "/src/assets/Images/user-profile_5645043.png"
export default function AsideBar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <button className={asideBarCss.burger} onClick={() => setOpen(!open)}>
        ☰
      </button>
      {open && (
        <div className={asideBarCss.overlay} onClick={() => setOpen(false)} />
      )}

      <aside
        className={`${asideBarCss.sidebar} ${open ? asideBarCss.open : ""}`}
      >
        <div className={asideBarCss.sidebarHeader}>
          <div className={asideBarCss.logo}>
            <img
              src={cloudSvg}
              alt="cloudHabit"
              width="70"
              height="70"
            />
          </div>
          <div>
            <h1>Cloud</h1>
            <h1>Habits</h1>
          </div>
        </div>

        <nav onClick={() => setOpen(false)}>
          <ImageLink to={"/"} src={imageDashboard}>
            Dashboard
          </ImageLink>

          <ImageLink
            to={"/analitycs"}
            src={imageAnalitycs}
          >
            Analitycs
          </ImageLink>

          <ImageLink
            to={"/settings"}
            src={imageSettings}
          >
            Settings
          </ImageLink>

          {user ? (
            <LogOut />
          ) : (
            <>
              <ImageLink
                to={"/register"}
                src={imageRegister}
              >
                Register
              </ImageLink>

              <ImageLink
                to={"/login"}
                src={imageLogin}
              >
                Login
              </ImageLink>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}
