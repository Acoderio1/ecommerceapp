import { useEffect, Suspense, React, lazy, useState } from "react";
import "./Home.scss";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import firstfoldbanner from "../../assets/images/firstfoldbanner.png";
import shoemodel from "../../assets/images/shoemodel.png";

import ApiService from "../../services/ApiService";

const FilterProducts = lazy(() =>
  import("../../common/FilterProducts/FilterProducts")
);

const Home = () => {
  const [products, setProducts] = useState();

  let navigate = useNavigate();
  const routeChange = async (params) => {
    let path = `/products`;
    navigate({
      pathname: path,
      search: `?${params}`,
    });
  };

  useEffect(() => {
    ApiService.getProducts("limit=6")
      .then(async (res) => {
        let data = await res.json();
        setProducts(data);
        console.log(products);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="homepagewrapper">
      <div className="firstfold">
        <img
          className="firstfoldbanner"
          src={firstfoldbanner}
          alt=""
          loading="lazy"
        ></img>
        <div className="firstfoldcontent">
          <div className="firstfoldheader">Love the Planet we walk on.</div>
          <div className="firstfoldsubtitle">
            Bibendum fermentum, aenean donec pretium aliquam blandit tempor
            imperdiet arcu arcu ut nunc in dictum mauris at ut.
          </div>
          <div className="buttons">
            <Button className="mensbutton" onClick={() => routeChange("mens")}>
              SHOP MEN
            </Button>
            <Button
              className="womensbutton"
              onClick={() => routeChange("womens")}
            >
              SHOP WOMEN
            </Button>
          </div>
        </div>
      </div>
      <div className="secondfold">
        <img
          className="secondfoldimg"
          src={shoemodel}
          alt=""
          loading="lazy"
        ></img>
        <div className="secondfoldcontent">
          <div className="aboutus">ABOUT US</div>
          <div className="title">
            Selected materials designed for comfort and sustainability
          </div>
          <div className="subtitle">
            Nullam auctor faucibus ridiculus dignissim sed et auctor sed eget
            auctor nec sed elit nunc, magna non urna amet ac neque ut quam enim
            pretium risus gravida ullamcorper adipiscing at ut magna.
          </div>
          <div className="readmore">Read More...</div>
        </div>
      </div>
      <div className="bestsellers">
        <Suspense fallback={<div>Loading...</div>}>
          {products && <FilterProducts config={products}></FilterProducts>}
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
