import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import dateFormat from "dateformat";
import convertRupiah from "rupiah-format";
import { useQuery } from "react-query";

import Navbar from "../components/Navbar";

import { UserContext } from "../context/userContext";

import imgBlank from "../assets/blank-profile.png";

import { API } from "../config/api";

export default function Profile() {
  const title = "Profile";
  document.title = "Bookstore | " + title;

  const [state] = useContext(UserContext);

  // const [transactions, setTransactions] = useState([]);

  let { data: profile } = useQuery("profileCache", async () => {
    const response = await API.get("/profile");
    return response.data.data;
  });

  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });

  return (
    <>
      <Navbar title={title} />
      <Container className="my-5">
        <Row>
          <Col md="6">
            <div className="text-header-product mb-4">My Profile</div>
            <Row className="bg-primary p-3" style={{ borderRadius: "10px" }}>
              <Col md="6">
                <img
                  src={profile?.image ? profile.image : imgBlank}
                  className="img-fluid rounded"
                  alt="avatar"
                />
              </Col>
              <Col md="6">
                <div className="profile-header">Name</div>
                <div className="profile-content">{state.user.name}</div>

                <div className="profile-header">Email</div>
                <div className="profile-content">{state.user.email}</div>

                <div className="profile-header">Phone</div>
                <div className="profile-content">
                  {profile?.phone ? profile?.phone : "-"}
                </div>

                <div className="profile-header">Gender</div>
                <div className="profile-content">
                  {profile?.gender ? profile?.gender : "-"}
                </div>

                <div className="profile-header">Address</div>
                <div className="profile-content">
                  {profile?.address ? profile?.address : "-"}
                </div>
              </Col>
            </Row>
          </Col>
          <Col md="6">
            <div className="text-header-product mb-4">My Transaction</div>
            {transactions?.length !== 0 ? (
              <>
                {transactions?.map((item, index) => (
                  <div
                    key={index}
                    style={{ background: "#303030" }}
                    className="p-2 mb-1"
                  >
                    <Container fluid className="px-1">
                      <Row>
                        <Col xs="3">
                          <img
                            src={item.product.image}
                            alt="img"
                            className="img-fluid"
                            style={{
                              height: "120px",
                              width: "170px",
                              objectFit: "cover",
                            }}
                          />
                        </Col>
                        <Col xs="6">
                          <div
                            style={{
                              fontSize: "18px",
                              color: "#F74D4D",
                              fontWeight: "500",
                              lineHeight: "19px",
                            }}
                          >
                            {item.product.name}
                          </div>
                          <div
                            className="mt-2"
                            style={{
                              fontSize: "14px",
                              color: "#F74D4D",
                              fontWeight: "300",
                              lineHeight: "19px",
                            }}
                          >
                            {dateFormat(item.createdAt, "dddd, d mmmm yyyy")}
                          </div>

                          <div
                            className="mt-3"
                            style={{
                              fontSize: "14px",
                              color: "#F74D4D",
                              fontSize: "14px",
                              fontWeight: "300",
                            }}
                          >
                            Price : {convertRupiah.convert(item.price)}
                          </div>

                          <div
                            className="mt-3"
                            style={{
                              fontSize: "14px",
                              color: "#F74D4D",
                              fontSize: "14px",
                              fontWeight: "700",
                            }}
                          >
                            Sub Total : {convertRupiah.convert(item.price)}
                          </div>
                        </Col>
                        <Col xs="3">
                          <div
                            className={`status-transaction-${item.status} rounded h-100 d-flex align-items-center justify-content-center text-white fw-bold`}
                          >
                            {item.status}
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                ))}
              </>
            ) : (
              <div className="no-data-transaction">No transaction</div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
