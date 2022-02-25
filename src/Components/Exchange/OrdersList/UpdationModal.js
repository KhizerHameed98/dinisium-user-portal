import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateOrder } from "../../../Services/exchangeServices";

const UpdationModal = ({
  type,
  handleClose,
  show,
  DeleteOrders,
  selectedData,
  setShow,
  refresh,
  setRefresh,
  // UpdateOrders,
}) => {
  // console.log(selectedData);

  //Destrucing the rowdata
  const {
    id,
    ito_token_id,
    order_type,
    partialfill,
    price_limit,
    sub_order,
    token_name,
    token_symbol,
    tokens,
    amount,
    spreadedamount,
    price,
  } = selectedData;

  // console.log('TOKEN PRICE IS', price)

  const [checked, setChecked] = useState(partialfill);
  const [countPrice, setCountPrice] = useState(0);
  const [subOrder, setSuborder] = useState(sub_order);
  const [marketOrder, setMarketOrder] = useState(true);
  const [limitAmount, setLimitAmount] = useState(price_limit);
  const [tokenss, setTokenss] = useState(parseFloat(tokens));
  const [tokenPrice, setTokenPrice] = useState(price);
  const [spreadedAmountt, setSpreadedAmountt] = useState(0);
  // const [refresh, setRefresh] = useState(false);

  // console.log("suboders default", subOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    setTokenPrice(
      parseFloat(price) +
        parseFloat(parseFloat(price) * parseFloat(buyingSpread / 100))
    );
  }, []);

  useEffect(() => {
    subOrder === "market_order"
      ? setCountPrice(parseFloat(spreadedamount)?.toFixed(4))
      : setCountPrice(parseFloat(spreadedamount));
  }, [tokenPrice]);

  const [formData, setFormData] = useState({
    ito_token_id: ito_token_id,
    order_type: order_type,
    partialFill: checked,
    price_limit: price_limit,
    // tokens: tokens,
    amount: countPrice,
  });
  const handlePartialClick = (e) => {
    setChecked(!checked);
  };

  const handleLimitOrder = () => {
    setSuborder("limit_order");
    setTokenss(0);
    setMarketOrder(false);
    setCountPrice(0);
    // console.log("sub-order changed to", subOrder);
  };

  const handleMarketOrder = () => {
    setSuborder("market_order");
    setMarketOrder(true);
    setTokenss(0);
    setLimitAmount(0);
    setCountPrice(0);
    // console.log("sub-order changed to", subOrder);
  };

  const state = useSelector((state) => state?.exchange?.data);
  // console.log("state", state);
  // const sellingSpread=state?.map((items) => {
  //   if(items?.token_name===token_name) {
  //     return  items?.selling_spread
  //   }
  // })
  // console.log("sell" , sellingSpread);

  const check = state?.filter((items) => {
    if (items?.token_name === token_name) {
      return items?.selling_spread;
    }
  });
  const sellingSpread = check[0]?.selling_spread;

  // console.log("sell", sellingSpread);

  const checkk = state?.filter((items) => {
    if (items?.token_name === token_name) {
      return items?.buying_spread;
    }
  });
  const buyingSpread = checkk[0]?.buying_spread;
  // console.log("buy", buyingSpread);

  const handlerPartialChange = (e) => {
    setFormData({ ...formData, [e.target.name]: checked });
  };

  const tokenChangeHandler = (e) => {
    // console.log("sub-order is", subOrder);

    setTokenss(e.target.value);
    if (order_type === "buy_order") {
      // console.log('type' , order_type)
      if (subOrder === "market_order") {
        setCountPrice(parseFloat(tokenPrice * e.target.value).toFixed(5));

        setSpreadedAmountt(parseFloat(e.target.value) * parseFloat(price));
      } else {
        setCountPrice(
          parseFloat(e.target.value) * parseFloat(limitAmount) +
            parseFloat(
              parseFloat(e.target.value) *
                parseFloat(limitAmount) *
                parseFloat(buyingSpread / 100)
            )
        );
        setSpreadedAmountt(
          parseFloat(e.target.value) * parseFloat(limitAmount)
        );
      }
    }

    if (order_type === "sell_order") {
      if (subOrder === "market_order") {
        setCountPrice(parseFloat(tokenPrice * tokenss).toFixed(5));

        setSpreadedAmountt(parseFloat(e.target.value) * parseFloat(price));
      } else {
        setCountPrice(
          parseFloat(e.target.value) * parseFloat(limitAmount) -
            parseFloat(
              parseFloat(e.target.value) *
                parseFloat(limitAmount) *
                parseFloat(sellingSpread / 100)
            )
        );
        setSpreadedAmountt(
          parseFloat(e.target.value) * parseFloat(limitAmount)
        );
      }
    }
  };
  const TokenchangeHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changeHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // if (formData.sub_order == "market_order") {
    //   setFormData({ ...formData, [e.target.name]: e.target.value });
    //   setFormData({ ...formData, price_limit: "" });
    //   // alert();
    // } else {
    //   setFormData({ ...formData, [e.target.name]: e.target.value });
    // }
  };

  const handleDelete = () => {
    DeleteOrders(id);
  };

  const limitAmountChange = (e) => {
    setLimitAmount(e.target.value);
    if (order_type === "buy_order") {
      if (subOrder === "limit_order") {
        setCountPrice(
          parseFloat(e.target.value) * parseFloat(tokenss) +
            parseFloat(
              parseFloat(e.target.value) *
                parseFloat(tokenss) *
                parseFloat(buyingSpread / 100)
            )
        );
        setSpreadedAmountt(
          parseFloat(e.target.value) * parseFloat(limitAmount)
        );
      } else {
        setCountPrice(
          parseFloat(tokenss) * parseFloat(price) +
            parseFloat(
              parseFloat(e.target.value) *
                parseFloat(price) *
                parseFloat(buyingSpread / 100)
            )
        );

        setSpreadedAmountt(parseFloat(e.target.value) * parseFloat(price));
      }
    }
    if (order_type === "sell_order") {
      if (subOrder === "limit_order") {
        setCountPrice(
          parseFloat(e.target.value) * parseFloat(tokenss) -
            parseFloat(
              parseFloat(e.target.value) *
                parseFloat(tokenss) *
                parseFloat(sellingSpread / 100)
            )
        );
        setSpreadedAmountt(
          parseFloat(e.target.value) * parseFloat(limitAmount)
        );
      } else {
        setCountPrice(
          parseFloat(tokenss) * parseFloat(price) -
            parseFloat(
              parseFloat(e.target.value) *
                parseFloat(price) *
                parseFloat(sellingSpread / 100)
            )
        );

        setSpreadedAmountt(parseFloat(e.target.value) * parseFloat(price));
      }
    }
  };
  const updateHandler = () => {
    if (tokenss == 0) {
      toast.error("Tokens must be greater than 0");
    } else {
      const formData1 = {
        ito_token_id: formData.ito_token_id,
        order_type: formData.order_type,
        partialFill: formData.partialFill,
        price_limit: limitAmount,
        sub_order: subOrder,
        tokens: parseInt(tokenss),
        amount: spreadedAmountt,
        spreadedamount: parseFloat(countPrice),
        token_price: price,
      };

      dispatch(
        updateOrder({
          id,
          formData1,
          refresh,
          setRefresh,
          handleClose,
          setShow,
          show,
        })
      );
    }

    // UpdateOrders({ id, formData1 });
    // console.log("data sent is ", formData1);
    // // alert(price)
  };
  return (
    <>
      {type ? (
        <Modal size="sm" show={show} onHide={handleClose} centered>
          <div className="modal-header border-0">
            <button type="button" className="close" onClick={handleClose}>
              <span className="font-18">&times;</span>
            </button>
          </div>
          <Modal.Body className="text-center">
            <div>
              <p>Are you sure You want to Delete?</p>
              <br />

              <Button variant="secondary" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer className="border-0"></Modal.Footer>
        </Modal>
      ) : (
        <Modal size="lg" show={show} onHide={handleClose} centered>
          <div className="modal-header border-0">
            <button type="button" className="close" onClick={handleClose}>
              <span className="font-18">&times;</span>
            </button>
          </div>{" "}
          <Modal.Body>
            <div className="card mb-4">
              <div className="card-body">
                <h4 className="font-18">TOKEN DATA</h4>
                <Container>
                  <Row>
                    <Col sm="auto" md="auto" lg="auto">
                      <label
                        class="form-check-label"
                        for="flexCheckDefault"
                        style={{
                          marginLeft: "2em",
                          fontSize: "1.1em",
                        }}
                      >
                        Token Name
                      </label>
                      <div>
                        <input
                          className="bg-lit-gr border-0"
                          type="text"
                          style={{
                            height: "38px",
                          }}
                          value={token_name}
                          disabled={true}
                        />
                      </div>
                    </Col>
                    <Col sm="auto" md="auto" lg="auto">
                      <label
                        class="form-check-label"
                        for="flexCheckDefault"
                        style={{
                          marginLeft: "2em",
                          fontSize: "1.1em",
                        }}
                      >
                        Token Symbol
                      </label>
                      <div>
                        <input
                          className="bg-lit-gr border-0"
                          type="text"
                          style={{
                            height: "38px",
                            width: "auto",
                          }}
                          value={token_symbol}
                          disabled={true}
                        />
                      </div>
                    </Col>
                    <Col sm="auto" md="auto" lg="auto">
                      <label
                        class="form-check-label"
                        for="flexCheckDefault"
                        style={{
                          marginLeft: "2em",
                          fontSize: "1.1em",
                        }}
                      >
                        Token Price
                      </label>
                      <div>
                        <input
                          className="bg-lit-gr border-0"
                          type="text"
                          style={{
                            height: "38px",
                            width: "auto",
                          }}
                          value={tokenPrice}
                          disabled={true}
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-body">
                <h4 className="font-18">
                  UPDATE {formData.order_type.toUpperCase()}
                </h4>

                <div className="row">
                  <div className="col-12 col-sm-8">
                    <div className="form-group">
                      <input
                        type="number"
                        min="1"
                        max="99"
                        step="1"
                        style={{
                          height: "38px",
                          width: "100%",
                        }}
                        placeholder="Enter Tokens"
                        name="tokens"
                        value={tokenss}
                        onChange={tokenChangeHandler}
                      />
                    </div>

                    {/* chekboxes  */}
                    <div className="form-group">
                      <input
                        style={{
                          marginLeft: "0.1em",
                        }}
                        className="form-check-input"
                        name="partialFill"
                        type="checkbox"
                        value={formData.partialFill}
                        checked={formData.partialFill}
                        onClick={handlePartialClick}
                        onChange={handlerPartialChange}
                      />
                      <label
                        class="form-check-label"
                        for="flexCheckDefault"
                        style={{
                          marginLeft: "2em",
                          fontSize: "1.1em",
                        }}
                      >
                        Partial Fill
                      </label>
                      <br />

                      <input
                        type="radio"
                        style={{
                          marginLeft: "0.1em",
                          marginTop: "15px",
                        }}
                        className="form-check-input"
                        name="sub_order"
                        value={subOrder}
                        checked={subOrder == "limit_order" ? true : false}
                        onClick={handleLimitOrder}
                        // onClick={handleLimitOrder}
                      />
                      <label
                        class="form-check-label"
                        for="flexCheckDefault"
                        style={{
                          marginLeft: "2em",
                          fontSize: "1.1em",
                          marginTop: "12px",
                        }}
                      >
                        Limit Order
                      </label>

                      <input
                        style={{
                          marginLeft: "0.9em",
                          marginTop: "15px",
                        }}
                        className="form-check-input"
                        name="sub_order"
                        value="market_order"
                        checked={
                          subOrder === "market_order" ? true : false
                          // marketOrder
                        }
                        onClick={handleMarketOrder}
                        type="radio"
                        // onClick={() => {
                        //   formData.price_limit = "";
                        // }}
                      />
                      <label
                        style={{
                          marginLeft: "2em",
                          fontSize: "1.1em",
                          marginLop: "12px",
                        }}
                        class="form-check-label"
                        for="flexCheckDefault"
                      >
                        Market Order
                      </label>
                    </div>

                    <div className="form-group">
                      <input
                        type="number"
                        style={{
                          height: "38px",
                          width: "150px",
                        }}
                        placeholder="Enter Limit Amount "
                        name="price_limit"
                        value={limitAmount}
                        disabled={subOrder == "limit_order" ? false : true}
                        onChange={limitAmountChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-2">
                    <button
                      className="dls-btn bg-semi-black d-block text-center text-white py-2 px-4 rounded"
                      onClick={updateHandler}
                    >
                      Update
                    </button>
                  </div>
                  <div className="col-12 col-sm-3 py-2">
                    <div className="card">
                      <div className="card-body bg-lit-gr py-2 px-3">
                        <p className="font-14 mb-0 text-justify">
                          Price{" "}
                          <span className="">
                            {countPrice === countPrice ? countPrice : 0}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default UpdationModal;
