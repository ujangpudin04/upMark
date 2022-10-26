import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import convertRupiah from "rupiah-format";
import { useQuery, useMutation } from "react-query";
import Navbar from "../components/Navbar";
import { API } from "../config/api";
import ImageBgFooter from "../assets/cart_4.jpg";

export default function DetailProduct() {
  let navigate = useNavigate();
  let { id } = useParams();

  let { data: product } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
    return response.data.data;
  });

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;
    //change this according to your client-key
    // const myMidtransClientKey = "SB-Mid-client-2zyLClg8IEU9oj-X"; // Get REACT_APP_MIDTRANS_CLIENT_KEY from ENV here ...

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = {
        productId: product.id,
        sellerId: product.user.id,
        price: product.price,
      };

      const body = JSON.stringify(data);

      const response = await API.post("/transaction", body, config);

      // navigate("/profile");
      const token = response.data.data.token;
      console.log(response.data.data.token);

      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <Navbar />
      <Container className="py-5 bg-primary text-white mb-3">
        <Row className="m-auto p-auto d-flex justify-content-center align-items-center ">
          <Col md="3">
            <img src={product?.image} alt="pict" className="img-fluid" />
          </Col>
          <Col>
            <Row className="bg-secondary p-2" style={{ borderRadius: "5px" }}>
              <div className="text-header-product-detail">{product?.name}</div>
              <div className="text-content-product-detail">
                Stock : {product?.qty}
              </div>
              <div className="text-content-product-detail ">
                {product?.desc}
              </div>
              <div className="text-price-product-detail">
                {convertRupiah.convert(product?.price)}
              </div>
            </Row>
            <Row>
              <button
                onClick={(e) => handleBuy.mutate(e)}
                className="btn bg-success text-white mt-3"
              >
                Buy
              </button>
            </Row>
          </Col>
        </Row>
        <Row className="mt-3 m-auto p-auto d-flex justify-content-center align-items-center ">
          <Col>
            <img
              src={ImageBgFooter}
              alt="ImageBgFooter"
              style={{ width: "80vw", height: "50vh", borderRadius: "10px" }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
