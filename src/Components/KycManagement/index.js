import React, { useEffect, useState } from "react";
// import ApprovedRequest from "./ApprovedRequests";
// import PendigRequest from "./PendingRequests/index";
// import RejectedRequest from "./RejectedRequests/index";
// import SelectITO from "./SelectITO/index";
import { getKycByUserId } from "../../Redux/actions/actions";

import UserForm from "./UserForm";
import UserDetails from "./UserDetails";
import { connect } from "react-redux";

const KycManagement = ({ getKycByUserId, kyc }) => {
  const [userStatus, setUserStatus] = useState(undefined);
  const [refresh, setrefresh] = useState(true);
  let userId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).id
    : 0;

  useEffect(() => {
    getKycByUserId({
      userId: userId,
      setUserStatus,
    });
  }, [userStatus, refresh]);

  return (
    <>
      {userStatus !== undefined ? (
        userStatus ? (
          <UserDetails setUserStatus={setUserStatus} kyc={kyc} />
        ) : (
          <UserForm
            setUserStatus={setUserStatus}
            refresh={refresh}
            setrefresh={setrefresh}
          />
        )
      ) : (
        <></>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  kyc: state.kyc,
});

export default connect(mapStateToProps, { getKycByUserId })(KycManagement);
