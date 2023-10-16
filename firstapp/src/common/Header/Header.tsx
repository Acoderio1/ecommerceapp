import "./Header.scss";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UtilService from "../../services/UtilService";

var isMobile = UtilService.isMobile();
console.log(isMobile);
const Header = () => {
  return (
    <div className="navbar">
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
        <div className="info">
          <div className="ourstory">ourStory</div>
          <div className="contact">Sale</div>
        </div>
        <div className="cartprofile">
          <div className="shoppingbag">
            <div className="circle">1</div>
            <ShoppingBagIcon fontSize="large" />
          </div>
          <div className="profile">
            <AccountCircleIcon fontSize="large" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
