import { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/userContext";

import Logo from "../assets/Logo.png";

import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

export default function Auth() {
  let navigate = useNavigate();

  const [state] = useContext(UserContext);

  const checkAuth = () => {
    if (state.isLogin === true) {
      navigate("/");
    }
  };
  checkAuth();

  const [isRegister, setIsRegister] = useState(false);

  const switchLogin = () => {
    setIsRegister(false);
  };

  const switchRegister = () => {
    setIsRegister(true);
  };

  return (
    // <div>
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center className=mt-3">
        <Col md="6">
          <div className="d-flex justify-content-center">
            <img
              src={Logo}
              style={{ width: "400px", height: "400px" }}
              alt="brand"
            />
          </div>

          <div
            className="d-flex justify-content-center align-items-center text-center"
            style={{
              borderBottom: "6px solid #0D8ED6",
            }}
          >
            <h5>
              Get Your Book <span style={{ color: "#0D8ED6" }}>EveryWhere</span>{" "}
              EveryWhere <span style={{ color: "#013059" }}>Everytime</span>
            </h5>
          </div>

          <div
            className="mt-5 d-flex justify-content-center gap-5 p-4 col-lg"
            style={{ borderTop: "2px solid #0D8ED6" }}
          >
            <button
              onClick={switchLogin}
              className="btn btn-login px-5 "
              style={{
                borderRadius: "10px",
                backgroundColor: "#013059",
                color: "white",
                width: "60%",
              }}
            >
              Login
            </button>
            <button
              onClick={switchRegister}
              className="btn btn-register px-5 bg-primary"
              style={{ borderRadius: "10px", color: "white", width: "60%" }}
            >
              Register
            </button>
          </div>
        </Col>
        <Col md="6" className="mb-3">
          {isRegister ? <Register /> : <Login />}
        </Col>
      </Row>
    </Container>
    // </div>
  );
}
