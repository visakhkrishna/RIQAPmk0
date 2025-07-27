import { useState } from "react";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import { useDashboardContext } from "../pages/DashboardLayout";
import Wrapper from "../assets/wrappers/LogoutContainer";

const Logoutcontainer = () => {
  const [showLogout, setshowLogout] = useState(false);
  const { user, logoutUser } = useDashboardContext();
  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setshowLogout(!showLogout)}
      >
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" className="img" />
        ) : (
          <FaUserCircle />
        )}
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  );
};
export default Logoutcontainer;
