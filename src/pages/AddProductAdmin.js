import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";

import NavbarAdmin from "../components/NavbarAdmin";
import { API } from "../config/api";
import Pict from "../assets/3514981.jpg";
// import * as yup from "yup";

export default function AddProductAdmin() {
  // console.clear();
  const title = "Product admin";
  document.title = "Bookstore | " + title;

  let navigate = useNavigate();

  // const [alert, setAlert] = useState([]);
  // const [, setAlert] = useState();
  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    image: "",
    name: "",
    desc: "",
    price: "",
    qty: "",
  }); //Store product data

  // Fetching category data
  const getCategories = async () => {
    try {
      const response = await API.get("/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // For handle if category selected
  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      // Save category id if checked
      setCategoryId([...categoryId, parseInt(id)]);
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = categoryId.filter((categoryIdItem) => {
        return categoryIdItem !== id;
      });
      setCategoryId(newCategoryId);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    console.log(e.target.files[0]);
    console.log(e.target.files[0].type);

    if (e.target.files[0].size > 102400) {
      console.log("file lebih dari 100KB");
      if (e.target.files.type !== "image/jpg") {
        console.log("format file harus jpg atau png");
      }
      setForm((e.target.files = null));
    } else if (
      (e.target.type === "file" &&
        e.target.files[0].size <= 102400 &&
        e.target.files[0].type === "image/jpg") ||
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
    // Create image url for preview
    // if (e.target.type === "file") {
    //   let url = URL.createObjectURL(e.target.files[0]);
    //   setPreview(url);
    // }

    // fileValidation();
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("name", form.name);
      formData.set("desc", form.desc);
      formData.set("price", form.price);
      formData.set("qty", form.qty);
      formData.set("categoryId", categoryId);

      // Insert product data
      const response = await API.post("/product", formData, config);
      console.log("response.data.data");
      console.log(response.data.data);

      if (response.data.code === 200) {
        navigate("/product-admin");
      }
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <NavbarAdmin title={title} />
      <Container>
        <Row className="d-flex justify-content-end">
          <Col xs="4">
            <div
              className="text-header-category mb-3 text-center fw-bold"
              style={{
                borderBottom: "2px solid black",
                fontSize: "20px",
                color: "#0D8ED6",
              }}
            >
              Add Product
            </div>
          </Col>
        </Row>
        <Row
          className="d-flex justify-content-center"
          style={{ textColor: "white" }}
        >
          <Col md="8">
            <img src={Pict} alt="pict" style={{ width: "80%" }} />
          </Col>
          <Col
            md="4"
            style={{
              border: "1px solid aqua",
              borderRadius: "5px",
              padding: "15px",
              background: "#0D8ED6",
              marginBottom: "10px",
            }}
          >
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <div className="mb-3">
                <input
                  required
                  type="text"
                  placeholder="Product Name"
                  name="name"
                  onChange={handleChange}
                  className="input-edit-category form-control"
                />
              </div>

              <div className="mb-3">
                <textarea
                  placeholder="Product Desc"
                  name="desc"
                  onChange={handleChange}
                  className="form-control"
                  style={{ height: "130px" }}
                ></textarea>
              </div>

              <div className="mb-3">
                <input
                  required
                  type="number"
                  placeholder="Price (Rp.)"
                  name="price"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  required
                  type="number"
                  placeholder="Stock"
                  name="qty"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="card-form-input px-2 py-1 pb-2">
                <div className="mb-1 text-white" style={{ fontSize: "15px" }}>
                  Category
                </div>
                {categories.map((item, index) => (
                  <label
                    className="checkbox-inline me-4 text-white"
                    key={index}
                  >
                    <input
                      type="checkbox"
                      value={item.id}
                      onClick={handleChangeCategoryId}
                    />{" "}
                    {item.name}
                  </label>
                ))}

                {preview && (
                  <div className="mt-3 mb-3">
                    <img
                      id="imagePreview"
                      src={preview}
                      style={{
                        maxWidth: "150px",
                        maxHeight: "150px",
                        objectFit: "cover",
                      }}
                      alt={preview}
                    />
                  </div>
                )}

                <div className="mb-5 mt-5">
                  <label for="upload" className="form-label text-white">
                    Upload file
                  </label>
                  <input
                    required
                    type="file"
                    id="upload"
                    accept=".jpg,.png,.jpeg"
                    name="image"
                    hidden
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="justify-conten-end d-flex">
                <Button
                  type="submit"
                  variant="success"
                  size="md"
                  className="col "
                >
                  Add
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
