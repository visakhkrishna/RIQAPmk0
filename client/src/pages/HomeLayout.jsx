import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  /*return (
    <div>
      <nav>navbar</nav>
      <Outlet />
    </div>
  ); */
  return (
    <div>
      <Outlet />
    </div>
  );
};
export default HomeLayout;
