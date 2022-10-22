import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useMutation } from "react-query";
import { Alert, Button, Form } from "react-bootstrap";

import { API } from "../../config/api";

export default function Register() {
  const title = "Register";
  document.title = "DumbMerch | " + title;

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/register", body, config);

      // Notification
      if (response.data.code === 200) {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
        setForm({
          name: "",
          email: "",
          password: "",
        });
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <div
          style={{
            fontSize: "36px",
            lineHeight: "49px",
            fontWeight: "700",
            color: "#013059",
          }}
          className="mb-3 text-center"
        >
          Register
        </div>
        <Form.Group
          onSubmit={(e) => handleSubmit.mutate(e)}
          className="bg-primary p-4"
          style={{ borderRadius: "10px" }}
        >
          <div className="mb-3">
            <Form.Label
              for="name"
              className="form-label fw-bold"
              style={{ color: "#013059" }}
            >
              Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              name="name"
              onChange={handleChange}
              className="form-control "
              id="name"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <Form.Label
              for="email"
              className="form-label fw-bold"
              style={{ color: "#013059" }}
            >
              Email address
            </Form.Label>
            <Form.Control
              type="email"
              className="form-control "
              id="email"
              aria-describedby="emailHelp"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Label
              for="password"
              className="form-label fw-bold"
              style={{ color: "#013059" }}
            >
              Password
            </Form.Label>
            <Form.Control
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
              id="password"
            />
          </div>
        </Form.Group>

        <Button
          type="submit"
          className="btn mt-4"
          style={{
            backgroundColor: "#013059",
            color: "white",
            fontWeight: "bold",
            border: "none",
          }}
          onClick={(e) => handleSubmit.mutate(e)}
        >
          Register
        </Button>
      </div>
    </div>
  );
}
