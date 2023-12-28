import { useEffect, Suspense, React, lazy, useState } from "react";

import ApiService from "../../services/ApiService";
import { useSearchParams, useLocation } from "react-router-dom";

const FilterProducts = lazy(() =>
  import("../../common/FilterProducts/FilterProducts")
);
const Products = () => {
  const [config, setConfig] = useState({});
  const location = useLocation();
  const [qparams] = useSearchParams(location);
  var payload = "";
  useEffect(() => {
    if (qparams.get("type") === "men") {
      payload = "type=men";
      config["pageTitle"] = "Mens"
     }
    if (qparams.get("type") === "women") {
      payload = "type=women";
      config["pageTitle"] = "Womens"
    }
    ApiService.getProducts(payload)
    .then(async (res) => {
      let data = await res.json();
      setConfig({ ...config, ["products"]: data });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [qparams]);

  return (
    <div className="bestsellers">
      <Suspense fallback={<div>Loading...</div>}>
        {config.products && (
          <FilterProducts
            config={config}
          ></FilterProducts>
        )}
      </Suspense>
    </div>
  );
};

export default Products;
