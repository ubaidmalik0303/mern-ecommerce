import React, { useEffect, useState, useRef } from "react";
import "./LoginSignup.css";
import { LockOpen, MailOutline, Face } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import profilePicture from "../../assets/profilePicture.png";
import { useDispatch, useSelector } from "react-redux";
import { login, register, clearErrors } from "../../store/Actions/UserActions";
import { useAlert } from "react-alert";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";

const LoginSignup = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const switcherTab = useRef(null);
  const loginTab = useRef(null);
  const registerTab = useRef(null);

  //State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(profilePicture);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const switchTabs = (e, tab) => {
    if (tab === "Login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "Register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, error, alert, isAuthenticated, navigate]);

  return (
    <Layout>
      <div className="loginSignupContainer">
        <div className="loginSignupBox">
          {loading ? (
            <LoadingAnimation />
          ) : (
            <>
              <div>
                <div className="loginSignupToggle">
                  <p onClick={(e) => switchTabs(e, "Login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "Register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form
                className="login-form"
                ref={loginTab}
                onSubmit={loginSubmit}
              >
                <div className="loginEmail">
                  <MailOutline />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forgot Password?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signup-form"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signupName">
                  <Face />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signupEmail">
                  <MailOutline />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signupPassword">
                  <LockOpen />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signupImage">
                  <img src={avatarPreview} alt="Avatar-Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="signupBtn"
                  //   disabled={loading ? true : false}
                />
              </form>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LoginSignup;
