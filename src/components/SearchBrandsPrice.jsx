import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "./Product";

function SearchBrandsPrice() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const token = localStorage.getItem("token");
  let params = queryString.parse(location.search);

  const getValue = async () => {
    fetch(
      `https://students.trungthanhweb.com/api/searchBrandPrice?apitoken=${token}&${queryString.stringify(
        params
      )}`
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.products.length > 0) {
          setProducts(result.products);
        }
      });
  };
  useEffect(() => {
    getValue();
  }, [location.search]);

  return (
    <div className="col-md mt-5">
      <div className="row">
        <Product
          result={products}
          classGrid="col-sm-6 col-md-4"
          image={true}
        ></Product>
      </div>
    </div>
  );
}

export default SearchBrandsPrice;
