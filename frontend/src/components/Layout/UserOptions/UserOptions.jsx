import React, { useState } from "react";
import "./UserOptions.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import profilePicture from "../../../assets/profilePicture.png";
import { Dashboard, Person, ExitToApp, ListAlt } from "@mui/icons-material";
import { Backdrop } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/Actions/UserActions";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const dashboard = () => {
    navigate("/dashboard");
  };
  const orders = () => {
    navigate("/orders");
  };
  const account = () => {
    navigate("/account");
  };
  const logoutUser = () => {
    dispatch(logout());
    alert.success("Logout SuccessFully");
  };

  const iconsOption = [
    { icon: <Person />, name: "Profile", func: account },
    { icon: <ListAlt />, name: "Orders", func: orders },
    { icon: <ExitToApp />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    iconsOption.unshift({
      icon: <Dashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        style={{ zIndex: 11 }}
        className="speedDial"
        ariaLabel="SpeedDial Tooltip example"
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
        direction="down"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : profilePicture}
            alt="Profile"
          />
        }
      >
        {iconsOption.map((item, i) => (
          <SpeedDialAction
            key={i}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
