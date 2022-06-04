import React from "react";
import "./Profile.css";
import Layout from "../../components/Layout";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";


const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);

  return (
    <Layout title="User Profile">
      <div className="profileContainer">
        {loading ? (
          <LoadingAnimation />
        ) : (
          <>
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <NavLink to="/account/update">Edit Profile</NavLink>
            </div>
            <div>
              <div>
                <h4>Full Name: </h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email: </h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On: </h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>
              </div>
              <div>
                <NavLink to="/orders">My Orders</NavLink>
                <NavLink to="/password/update">Change Password</NavLink>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
