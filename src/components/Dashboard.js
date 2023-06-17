import { Outlet } from "react-router-dom";
import { DashSection } from "../styles/Dashboard.styled";
import { useAuthUser } from "react-auth-kit";
import Sidebar from "./Sidebar";
import { AiOutlineMenu, AiOutlineQrcode } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BsQrCode } from "react-icons/bs";

function Dashboard() {
  const auth = useAuthUser();
  console.log(auth());
  return (
    <DashSection>
      <div className="container">
        <div className="sidebar" id="side">
          <Sidebar />
        </div>

        <div className="content">
          <div className="content_header">
            <div className="burger">
              <AiOutlineMenu
                onClick={() => {
                  document.getElementById("side").classList.toggle("open");
                }}
              />
            </div>
            <div
              className="nav_title"
              onClick={() => {
                window.location.href = "/dashboard";
              }}
            >
              <AiOutlineQrcode />
              <span className="title_text">Dashboard</span>
            </div>
            <div className="logout">{/* <BiLogOut /> */}</div>
          </div>
          <div
            style={{ width: "100%", height: "100%" }}
            onClick={() => {
              if (document.getElementById("side").classList.contains("open"))
                document.getElementById("side").classList.toggle("open");
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </DashSection>
  );
}

export default Dashboard;
