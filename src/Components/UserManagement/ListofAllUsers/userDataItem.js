import React from 'react';
import { Link } from "react-router-dom";
import Route from '../../../Constants/browserRoutes';




const UserDataItem = ({userData}) => {
    return (
      <>
        <td className="fn-600">{userData.name}</td>
        <td className="text-dr-blu">{userData.email}</td>
        <td>{userData.country}</td>
        <td>
          <Link
            className="dls-btn bg-semi-black text-white"
            // href="UserDetails.html"
            to={Route.USER_DETAIL_BTN+`${userData._id}`}
          >
            View Details
          </Link>
        </td>
      </>
    );
}
 
export default UserDataItem;