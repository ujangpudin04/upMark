import React from "react";
import { Link } from "react-router-dom";

import convertRupiah from "rupiah-format";

export default function ProductCard({ item }) {
  return (
    <Link to={`/product/` + item.id} style={{ textDecoration: "none" }}>
      <div
        class="col p-3 bg-secondary"
        style={{
          border: "1px solid aqua",
          color: "white",
          borderRadius: "10px",
        }}
      >
        <img
          src={item.image}
          className="img-fluid img-rounded"
          alt={item.name}
          style={{ height: "200px" }}
        />
        <div className="p-2">
          <div className="text-header-product-item">{item.name}</div>
          <div className="text-product-item">
            {convertRupiah.convert(item.price)}
          </div>
          <div className="text-product-item">Stock : {item.qty}</div>
        </div>
      </div>
    </Link>
  );
}
