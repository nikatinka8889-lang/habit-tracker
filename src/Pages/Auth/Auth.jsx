import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import {
  loginSuccess,
  loginFailure,
  startLoading,
} from "../../redux/slices/authSlice";
import authCss from "../Auth/Auth.module.css";
import crmPhoto from "../../assets/Images/crmphoto.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const validateEmailFormat = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const isProbablyFakeEmail = (email) => {
  const domain = email.split("@")[1];
  const name = domain.split(".")[0];

  if (name.length < 4) return true;
  if (!/[aeiouy]/i.test(name)) return true;
  if (/(.)\1{2,}/.test(name)) return true;

  return false;
};

const validateEmail = (email) => {
  if (!validateEmailFormat(email)) return false;
  if (isProbablyFakeEmail(email)) return false;
  return true;
};

const validatePassword = (password) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
  return re.test(password);
};

export default function Auth({
  title,
  subtitle,
  buttonText,
  toggleText,
  linkText,
  passwordText,
  authAction,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return toast.error("Incorrect or suspicious email");
    }

    if (!validatePassword(password)) {
      return toast.error("Password: minimum 6 characters, 1 letter and 1 number");
    }

    dispatch(startLoading());

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      dispatch(
        loginSuccess({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }),
      );

      toast.success("You have successfully registered");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      dispatch(loginFailure(error.message));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return toast.error("Incorrect or suspicious email");
    }

    dispatch(startLoading());

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      toast.success("You have successfully logged in");

      dispatch(
        loginSuccess({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }),
      );

      navigate("/");
    } catch (error) {
      toast.error("Login error: " + error.message);
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className={authCss.container}>
      <div className={authCss.containerLogin}>
        <div className={authCss.titleCloud}>
          <img
            src="/src/assets/Images/icons8-облако-100.png"
            alt="cloud"
            width="50"
          />
          <h2>Cloud Habits</h2>
        </div>

        <div className={authCss.halloHabit}>
          <p>{title}</p>
          <span>{subtitle}</span>
        </div>

        <form
          onSubmit={authAction === "register" ? handleRegister : handleLogin}
          className={authCss.authForm}
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">{buttonText}</button>
        </form>

        <div className={authCss.forgotPassword}>
          <p>{passwordText}</p>
        </div>

        <div className={authCss.noAccount}>
          <p>
            {toggleText}{" "}
            <span
              onClick={() =>
                authAction === "register"
                  ? navigate("/login")
                  : navigate("/register")
              }
            >
              {linkText}
            </span>
          </p>
        </div>
      </div>

      <div className={authCss.photoContainer}>
        <img src={crmPhoto} alt="crm" />
      </div>
    </div>
  );
}
