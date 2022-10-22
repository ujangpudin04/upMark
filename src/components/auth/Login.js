import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Form } from "react-bootstrap";
import { useMutation } from "react-query";

import { API } from "../../config/api";

export default function Login() {
  let navigate = useNavigate();

  const title = "Login";
  document.title = "BookStore | " + title;

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post("/login", body, config);

      // console.log(response);

      // Checking process
      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        // Status check
        if (response.data.data.status === "admin") {
          navigate("/complain-admin");
        } else {
          navigate("/");
        }

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <div class="container mt-4">
      <div class="row">
        <div>{message && message}</div>
        <div
          style={{
            fontSize: "36px",
            lineHeight: "49px",
            fontWeight: "700",
            color: "#013059",
          }}
          className="mb-3 text-center"
        >
          Login
        </div>
        <Form.Group
          onSubmit={(e) => handleSubmit.mutate(e)}
          className="bg-primary p-4"
          style={{ borderRadius: "10px" }}
        >
          <div class="mb-3">
            <Form.Label
              for="email"
              class="form-label fw-bold"
              style={{ color: "#013059" }}
            >
              Email address
            </Form.Label>
            <Form.Control
              type="email"
              class="form-control "
              id="email"
              aria-describedby="emailHelp"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div class="mb-3">
            <Form.Label
              for="password"
              class="form-label fw-bold"
              style={{ color: "#013059" }}
            >
              Password
            </Form.Label>
            <Form.Control
              type="password"
              class="form-control"
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
          Login
        </Button>
      </div>
    </div>
  );
}
