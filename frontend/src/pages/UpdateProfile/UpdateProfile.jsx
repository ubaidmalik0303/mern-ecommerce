import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import { MailOutline, Face } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import profilePicture from "../../assets/profilePicture.png";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, clearErrors } from "../../store/Actions/ProfileActions";
import { loadUser } from "../../store/Actions/UserActions";
import { useAlert } from "react-alert";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { UPDATE_PROFILE_RESET } from "../../store/Constants/ProfileConstants";

const UpdateProfile = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(profilePicture);

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {

    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully...");
      dispatch(loadUser());
      dispatch({
        type: UPDATE_PROFILE_RESET
      })
      navigate("/account");

    }
  }, [dispatch, error, alert, navigate, user, isUpdated]);

  return (
    <Layout>
      <div className="updateProfileContainer">
        <div className="updateProfileBox">
          <h2 className="updateProfileHeading">Update Profile</h2>
          {loading ? <LoadingAnimation /> : <form
            className="update-profile-form"
            encType="multipart/form-data"
            onSubmit={updateProfileSubmit}
          >
            <div className="updateProfileName">
              <Face />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="updateProfileEmail">
              <MailOutline />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="updateProfileImage">
              <img src={avatarPreview} alt="Avatar-Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProfileDataChange}
              />
            </div>
            <input
              type="submit"
              value="Update Profile"
              className="updateProfileBtn"
            />
          </form>}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProfile;
