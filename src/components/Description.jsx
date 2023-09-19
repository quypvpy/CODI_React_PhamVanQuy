import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

function Description() {
  const { id } = useParams();
  let parse = require("html-react-parser");
  const [data, setData] = useState();
  const token = localStorage.getItem("token");
  const getValue = async () => {
    return fetch(
      `https://students.trungthanhweb.com/api/single?apitoken=${token}&id=${id}`
    )
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          setData(result.products[0].content);
        }
      });
  };

  useEffect(() => {
    getValue();
  }, []);

  return (
    <div className="container ">
      {data && (
        <div className="">
          <div className="">{parse(data)}</div>
        </div>
      )}
    </div>
  );
}

export default Description;
