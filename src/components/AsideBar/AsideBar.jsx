import React, { useEffect, useState } from "react";
import asideBarCss from "./asideBarCss.module.css";
import ImageLink from "../ImageLink/ImageLink";
import LogOut from "../LogOut/LogOut";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

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
              src="/src/assets/Images/cloud.svg"
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
          <ImageLink to={"/"} src={"/src/assets/Images/dashboard-5481.svg"}>
            Dashboard
          </ImageLink>

          <ImageLink
            to={"/analitycs"}
            src={"/src/assets/Images/chart_18432151.png"}
          >
            Analitycs
          </ImageLink>

          <ImageLink
            to={"/settings"}
            src={"/src/assets/Images/settings-171.svg"}
          >
            Settings
          </ImageLink>

          {user ? (
            <LogOut />
          ) : (
            <>
              <ImageLink
                to={"/register"}
                src={"/src/assets/Images/user_10977431.png"}
              >
                Register
              </ImageLink>

              <ImageLink
                to={"/login"}
                src={"/src/assets/Images/user-profile_5645043.png"}
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
