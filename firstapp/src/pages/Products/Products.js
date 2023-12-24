import { useEffect, Suspense, React, lazy, useState, useContext } from "react";

import ApiService from "../../services/ApiService";
import GlobalContext from "../../GlobalContext";

const FilterProducts = lazy(() =>
  import("../../common/FilterProducts/FilterProducts")
);
const Products = () => {
  const [products, setProducts] = useState();
  const { GetqParams } = useContext(GlobalContext);
  var payload = ''
  const qparams = GetqParams()
  useEffect(() => {
    if (qparams.type === "men") {
      payload = "type=men";
    }
    if (qparams.type === "women") {
      payload = "type=women";
    }
    ApiService.getProducts(payload)
      .then(async (res) => {
        let data = await res.json();
        setProducts(data);
      })
      .catch((e) => {
        console.log(e);
      });
  },[]);

  return (
    <div className="bestsellers">
      <Suspense fallback={<div>Loading...</div>}>
        {products && (
          <FilterProducts
            config={{ products: products, title: "Mens" }}
          ></FilterProducts>
        )}
      </Suspense>
    </div>
  );
};

export default Products;
