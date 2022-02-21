import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Wrapper from "../../assets/wrappers/Dashboard.js";
import { Navbar, RightSidebar, LeftSidebar } from "../../components";
import { useAppContext } from "../../context/appContext";

const Dashboard = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Wrapper>
      <main className="dashboard">
        <LeftSidebar />
        <RightSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default Dashboard;
