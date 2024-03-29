import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Masonry from "react-masonry-css";
import { Container, Row, Col } from "react-bootstrap";

import { UserContext } from "../context/userContext";
import { useQuery } from "react-query";

import Navbar from "../components/Navbar";
import ProductCard from "../components/card/ProductCard";

import imgEmpty from "../assets/empty.svg";

// API config
import { API } from "../config/api";

export default function Product() {
  const title = "Shop";
  document.title = "BookStore | " + title;

  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  console.log(products);

  return (
    <div>
      <Navbar title={title} />
      <Container className="mt-5">
        <Row>
          <Col>
            <div className="text-header-product">Product</div>
          </Col>
        </Row>
        <Row className="my-2">
          {products?.length !== 0 ? (
            <div class="row row-cols-1 row-cols-md-4 g-2">
              {products?.map((item, index) => (
                <ProductCard item={item} key={index} />
              ))}
            </div>
          ) : (
            <Col>
              <div className="text-center pt-3">
                <img
                  src={imgEmpty}
                  className="img-fluid"
                  style={{ width: "40%" }}
                  alt="empty"
                />
                <div className="mt-3">No data product</div>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
