import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

import "./FilterProducts.scss";

import { useNavigate } from "react-router-dom";

const FilterProducts = (config) => {

  let navigate = useNavigate();

  const openShoes = (itemId) => {
    let path = `/products/productdetail`;
    navigate({
      pathname: path,
      search: `?itemId=${itemId}`
    });
  }
  return (
    <div className="productswrapper">
      <div className="title">{config.config.pageTitle}</div>
      <div className="shoeslist">
        {Object.values(config.config.products).map((item) => (
          <div key={item._id} className="shoecardwrapper" onClick={_ => openShoes(item._id)}>
            <div className="imgwrapper">
            <BookmarkBorderOutlinedIcon className='bookmark'></BookmarkBorderOutlinedIcon>
              <img
                className="shoecardimg"
                loading="lazy"
                src={item.images[0]}
                alt=""
              ></img>
            </div>
            <div className="shoecardtitle">{item.name}</div>
            <div className="shoecardprice">${item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterProducts;
