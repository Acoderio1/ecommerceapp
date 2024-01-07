import { useEffect, Suspense, React, lazy, useContext } from "react";

import ApiService from "../../services/ApiService";
import GlobalContext from "../../GlobalContext";

import { useSearchParams, useLocation } from "react-router-dom";

const FilterProducts = lazy(() =>
  import("../../common/FilterProducts/FilterProducts")
);
const Products = () => {
  const { productConfig, setProductConfig } = useContext(GlobalContext);
  const location = useLocation();
  const [qparams] = useSearchParams(location);
  var payload = "";
  useEffect(() => {
    if (qparams.get("type") === "men") {
      payload = "type=men";
      productConfig["pageTitle"] = "Mens"
     }
    if (qparams.get("type") === "women") {
      payload = "type=women";
      productConfig["pageTitle"] = "Womens"
    }
    ApiService.getProducts(payload)
    .then(async (res) => {
      let data = await res.json();
      setProductConfig({ ...productConfig, ["products"]: data });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [qparams]);

  return (
    <div className="bestsellers">
      <Suspense fallback={<div>Loading...</div>}>
        {productConfig.products && (
          <FilterProducts
            config={productConfig}
          ></FilterProducts>
        )}
      </Suspense>
    </div>
  );
};

export default Products;
