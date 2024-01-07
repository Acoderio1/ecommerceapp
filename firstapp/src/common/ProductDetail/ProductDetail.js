import { useEffect, useState, lazy } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@mui/material";

import "./ProductDetail.scss";

import ApiService from "../../services/ApiService";

const ProductDetail = () => {
  const location = useLocation();
  const [qparams] = useSearchParams(location);
  const [productDetail, setProductDetail] = useState();

  const loadProduct = () => {
    ApiService.getProducts(`_id=${qparams.get("itemId")}`).then(async (res) => {
      let data = await res.json();
      setProductDetail({ ...productDetail, ["products"]: data[0] });
    });
  };

  useEffect(() => {
    loadProduct();
  }, [qparams]);

  return (
    <div className="productwrapper">
      {productDetail && (
        <div className="productbody">
          <div className="imagewrapper">
            <Carousel autoPlay={true} showThumbs={false} showStatus={false}>
              {Object.values(productDetail.products.images).map((item) => (
                <img className="productimage" src={item}></img>
              ))}
            </Carousel>
          </div>
          <div className="content">
            <div className="title">{productDetail.products.name}</div>
            <div className="price">${productDetail.products.price}</div>
            <div className="desc">
              Auctor eros suspendisse tellus venenatis sodales purus non
              pellentesque amet, nunc sit eu, enim fringilla egestas pulvinar
              odio feugiat consectetur egestas magna pharetra cursus risus,
              lectus enim eget eu et lobortis faucibus.
            </div>
            <div className="cartbtns">
              <div className="qtybtn">
                <AddIcon className="add"></AddIcon>
                <div className="count">5</div>
                <RemoveIcon className="remove"></RemoveIcon>
              </div>
              <Button className="cartbtn">Add to Cart</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
