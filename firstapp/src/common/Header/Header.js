import { useState } from "react";

import "./Header.scss";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import UtilService from "../../services/Utils";
import LoginDialog from "../LoginDialog/LoginDialog";

const Header = () => {
  var isMobile = UtilService.isMobile();
  const [sidebarState, setSidebarState] = useState(false);

  function toggleSidebar() {
    setSidebarState(!sidebarState);
  }

  const sidebarContent = (
    <div className="sidebarcontent">
      <div className="close" onClick={toggleSidebar}>
        <CloseIcon fontSize="large"></CloseIcon>
      </div>
      <div className="sidebarprofile">
        <LoginDialog/>
      </div>
      <div className="content">
        <div className="home">Home</div>
        <div className="sale">Sale</div>
        <div className="aboutus">AboutUs</div>
        <div className="contact">Contact</div>
      </div>
    </div>
  );

  return (
    <div className="navbar">
      {isMobile && (<div className="sidemenu">
        <Drawer anchor="left" open={sidebarState} onClose={toggleSidebar}>
          {sidebarContent}
        </Drawer>
        <div className="hamburger" onClick={toggleSidebar}>
          <MenuIcon fontSize="large"></MenuIcon>
        </div>
      </div>)}
      <div className="leftpart">
        <div className="logo">WALES</div>
        {!isMobile && (
          <div className="links">
            <div className="men">Men</div>
            <div className="women">Women</div>
            <div className="collec">Collection</div>
            <div className="sale">Sale</div>
          </div>
        )}
      </div>
      <div className="rightpart">
        {!isMobile && (
          <div className="info">
            <div className="ourstory">ourStory</div>
            <div className="contact">Sale</div>
          </div>
        )}
        <div className="cartprofile">
          <div className="shoppingbag">
            <div className="circle">1</div>
            <ShoppingBagIcon fontSize="large" />
          </div>
          {!isMobile && (
            <div className="profile">
              <LoginDialog/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
