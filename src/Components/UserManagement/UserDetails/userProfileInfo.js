import React from "react";
import userImage from "../../../App/Assets/images/user-img.png";

const UserProfileInfo = () => {
  return (
    <div className="card bg-cr-1 pu-rel text-white p-5 mb-3">
      <img src={userImage} alt="User..." className="profile-img" />
      {/* <img className="profile-img" src="../assets/images/user-img.png" alt="User..." /> */}
      <div className="row">
        <div className="col-12 col-md-12">
          <ul className="row profile-detail">
            <li className="col-12 col-md-6">
              <span>Name</span>
              <span>Jhon Deo</span>
            </li>

            <li className="col-12 col-md-6">
              <span>Email</span>
              <span>JhonDeo@gmail.com</span>
            </li>
            <li className="col-12 col-md-6">
              <span>Contact No</span>
              <span>12133****243</span>
            </li>
            <li className="col-12 col-md-6">
              <span>Address</span>
              <span>Huston</span>
            </li>
            <li className="col-12 col-md-6">
              <span>Address</span>
              <span>Huston</span>
            </li>
            <li className="col-12 col-md-6">
              <span>Address</span>
              <span>Huston</span>
            </li>
            <li className="col-12 col-md-6">
              <span>Address</span>
              <span>Huston</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
