import "./Footer.scss";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import home_icon from "../../assets/home_icon.svg";
import ticket_icon from "../../assets/ticket_icon.svg";
import space_icon from "../../assets/space_icon.svg";
import event_icon from "../../assets/event_icon.svg";
import profile_icon from "../../assets/profile_icon.svg";
import home_icon_active from "../../assets/home_icon_active.svg";
import ticket_icon_active from "../../assets/ticket_icon_active.svg";
import space_icon_active from "../../assets/space_icon_active.svg";
import event_icon_active from "../../assets/event_icon_active.svg";
import profile_icon_active from "../../assets/profile_icon_active.svg";

export default function Footer() {
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  const routePath = location.pathname;
  useEffect(() => {
    if (
      routePath === "/signup" ||
      routePath === "/login" ||
      routePath === "/verify" ||
      routePath === "/wallet-create"
    ) {
      setVisible(false);
      console.log("hi");
    } else setVisible(true);
  }, [location]);

  return visible ? (
    <div className="footer">
      <div className="footer_navcontainer p-3">
        <Link to="/" className="footer_navcontainer_tabcontainer">
          <img
            src={routePath === "/" ? home_icon_active : home_icon}
            alt="home"
          />
          <div style={{ color: routePath === "/" ? "#FC3B7D" : "#ACACAC" }}>
            Home
          </div>
        </Link>
        <Link to="/myevents" className="footer_navcontainer_tabcontainer">
          <img
            src={routePath === "/myevents" ? event_icon_active : event_icon}
            alt="ticket"
          />
          <div
            style={{
              color: routePath === "/myevents" ? "#FC3B7D" : "#ACACAC",
            }}
          >
            My Events
          </div>
        </Link>
        <Link to="/space" className="footer_navcontainer_tabcontainer">
          <img
            src={routePath === "/space" ? space_icon_active : space_icon}
            alt="event"
          />
          <div
            style={{ color: routePath === "/space" ? "#FC3B7D" : "#ACACAC" }}
          >
            Space
          </div>
        </Link>
        <Link to="/profile" className="footer_navcontainer_tabcontainer">
          <img
            src={routePath === "/profile" ? profile_icon_active : profile_icon}
            alt="profile"
          />
          <div
            style={{ color: routePath === "/profile" ? "#FC3B7D" : "#ACACAC" }}
          >
            Profile
          </div>
        </Link>
      </div>
    </div>
  ) : (
    <></>
  );
}
