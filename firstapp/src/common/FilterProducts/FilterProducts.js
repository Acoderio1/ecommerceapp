import "./FilterProducts.scss";

const FilterProducts = (config) => {
  return (
    <div className="productswrapper">
      <div className="title">Best Sellers</div>
      <div className="shoeslist">
        {Object.values(config.config).map((item) => (
          <div key={item._id} className="shoecardwrapper">
            <div className="imgwrapper">
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
