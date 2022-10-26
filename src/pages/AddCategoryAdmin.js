import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";

import NavbarAdmin from "../components/NavbarAdmin";

import Pict from "../assets/3514981.jpg";

import { API } from "../config/api";

export default function AddCategoryAdmin() {
  console.clear();

  let navigate = useNavigate();
  const [category, setCategory] = useState("");

  const title = "Category admin";
  document.title = "BookStore | " + title;

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify({ name: category });

      // Insert category data
      const response = await API.post("/category", body, config);

      navigate("/category-admin");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <NavbarAdmin title={title} />
      <Container>
        <Row className="d-flex align-items-center">
          <Col md="4">
            <form
              onSubmit={(e) => handleSubmit.mutate(e)}
              className="form-control"
              style={{
                border: "1px solid aqua",
                borderRadius: "10px",
                padding: "20px",
                background: "#0D8ED6",
                marginBottom: "10px",
                color: "white",
              }}
            >
              <div className="text-header-category mb-4 text-center">
                Add Category
              </div>
              <input
                onChange={handleChange}
                placeholder="category"
                value={category}
                name="category"
                className="input-edit-category mt-4 form-control"
              />
              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success" size="md">
                  Add
                </Button>
              </div>
            </form>
          </Col>
          <Col className="d-flex justify-content-center">
            <img src={Pict} alt="pict" style={{ width: "60%" }} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
