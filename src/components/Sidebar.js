import {
  BiCalendarEdit,
  BiFolder,
  BiLogOut,
  BiQr,
  BiScan,
} from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { IoQrCode, IoQrCodeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SidebarContainer } from "../styles/Sidebar.styled";
import { useSignOut } from "react-auth-kit";
import { FcFolder } from "react-icons/fc";
import {
  AiOutlineMenu,
  AiOutlineQrcode,
  AiOutlineRollback,
} from "react-icons/ai";

function Sidebar() {
  const signOut = useSignOut();
  const Navigate = useNavigate();
  const role = window.localStorage.getItem("role");
  const [qr, setQr] = useState(false);
  const [record, setRecord] = useState(false);
  const [graph, setGraph] = useState(false);

  const handleQr = () => {
    setQr(!qr);
  };
  const handleRecord = () => {
    setRecord(!record);
  };

  const handleLogout = () => {
    signOut();
    window.localStorage.clear();
    Navigate("/");
  };

  const handleGraph = () => {
    Navigate("/dashboard/bar");
  };

  return (
    <SidebarContainer>
      <div className="logo">
        <div className="logo-icon">
          <IoQrCodeOutline />
        </div>
        <div className="logo-text">
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>
      <div className="burger">
        <h3>Menu</h3>
        <AiOutlineRollback
          onClick={() => {
            document.getElementById("side").classList.toggle("open");
          }}
        />
      </div>
      <div className="menu">
        <div className="menu-item" onClick={handleQr}>
          <div className="menu-item-icon">
            <BiQr />
          </div>
          <div className="menu-item-text">QR</div>
        </div>
        {qr ? (
          <div className="sub-menu">
            <div
              className="menu-item"
              onClick={() => {
                Navigate("/dashboard/scan");
              }}
            >
              <div className="menu-item-icon">
                <BiScan />
              </div>
              <div className="menu-item-text">Scan</div>
            </div>

            {role === "super" ? (
              <div
                className="menu-item"
                onClick={() => {
                  Navigate("/dashboard/generate");
                }}
              >
                <div className="menu-item-icon">
                  <IoQrCode />
                </div>
                <div className="menu-item-text">Generate</div>
              </div>
            ) : null}
          </div>
        ) : null}

        {(role === "super" || role === "admin") && (
          <div className="menu-item" onClick={handleRecord}>
            <div className="menu-item-icon">
              <BiFolder />
            </div>
            <div className="menu-item-text">Record</div>
          </div>
        )}

        {(role === "super" || role === "admin") && record ? (
          <div className="sub-menu">
            <div
              className="menu-item"
              onClick={() => {
                Navigate("/dashboard/student");
              }}
            >
              <div className="menu-item-icon">
                <FaUsers />
              </div>
              <div className="menu-item-text">Student</div>
            </div>
            <div
              className="menu-item"
              onClick={() => {
                Navigate("/dashboard/attendance");
              }}
            >
              <div className="menu-item-icon">
                <BiCalendarEdit />
              </div>
              <div className="menu-item-text">Attendance</div>
            </div>
          </div>
        ) : null}
        <div
          className="menu-item"
          style={role === "super" ? { display: "flex" } : { display: "none" }}
          onClick={() => {
            Navigate("/dashboard/account");
          }}
        >
          <div className="menu-item-icon">
            <FcFolder />
          </div>
          <div className="menu-item-text">Account</div>
        </div>

        {(role === "admin" || role === "super") && (
          <div className="menu-item" onClick={handleGraph}>
            <div className="menu-item-icon">
              <GoGraph />
            </div>
            <div className="menu-item-text">Demographics</div>
          </div>
        )}

        <div className="menu-item" onClick={handleLogout}>
          <div className="menu-item-icon">
            <BiLogOut />
          </div>
          <div className="menu-item-text">Logout</div>
        </div>
      </div>
    </SidebarContainer>
  );
}

export default Sidebar;
