import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation } from "react-query";

import NavbarAdmin from "../components/NavbarAdmin";

import { API } from "../config/api";
import Pict from "../assets/3514981.jpg";

export default function UpdateCategoryAdmin() {
  const title = "Category admin";
  document.title = "Bookstore | " + title;

  let navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState({ name: "" });

  let { data: categoryData } = useQuery("categoryCache", async () => {
    const response = await API.get("/category/" + id);
    return response.data.data.name;
  });

  useEffect(() => {
    if (categoryData) {
      console.log(categoryData);
      setCategory({ name: categoryData });
    }
  }, [categoryData]);

  const handleChange = (e) => {
    setCategory({
      ...category,
      name: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(category);

      await API.patch("/category/" + id, body, config);

      navigate("/category-admin");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <NavbarAdmin title={title} />
      <Container className="py-5">
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
                Edit Category
              </div>
              <input
                onChange={handleChange}
                value={category.name}
                placeholder="category"
                className="input-edit-category mt-4 form-control"
              />
              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success" size="md">
                  Save
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
