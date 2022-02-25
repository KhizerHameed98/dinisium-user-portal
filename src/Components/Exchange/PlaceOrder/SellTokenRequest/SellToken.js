import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { exchangeOrderRequest } from "../../../../Redux/actions/actions";
import {
  getOrders,
  getUserExchangeOrders,
} from "../../../../Redux/actions/actions";

const RadioButton = (props) => <input type="radio" {...props} />;

const SellToken = ({
  exchange: {
    tokenData: { data },
    tokenSelected,
    myTokenData,
  },

  auth: { userWallet },
  exchangeOrderRequest,
}) => {
  // console.log("mytokendata is", myTokenData);

  const Id = useSelector((state) => state?.exchange?.SellTokens?.options?.id);
  // console.log("id is ", Id);

  // console.log("mytokendata" , myTokenData);
  const [amount, setAmount] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [limitAmount, setLimitAmount] = useState("");
  const [countPrice, setCountPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [priceLimit, setPriceLimit] = useState(null);
  const [Limitinput, setLimitInput] = useState(true); //Enter Limit Amount Input Field
  const [checked, setChecked] = useState(true); //partialFill checked by default
  const [PartialFill, setPartialFill] = useState(""); //partialfill value
  const [LimitOrder, setLimitOrder] = useState("");
  const [Marketorder, setMarketOrder] = useState("");
  const [subOrder, setsubOrder] = useState("market_order");
  const [Marketorderdefault, setmarketorderDefault] = useState(true);
  const [Limitradio, setLimitRadio] = useState(false); //Limit Order radio check
  const [tokens, setTokens] = useState(0);
  const [spreadedAmount, setSpreadedAmount] = useState(0);

  // const state = useSelector((statee) =>
  //   console.log("Response is ", statee.exchange)
  // );

  const dispatch = useDispatch();

  const handleLimitOrder = () => {
    setCountPrice(0);
    setsubOrder("limit_order");
    setLimitInput(!Limitinput);
    setmarketorderDefault(false);
    setLimitRadio(!Limitradio);
    setmarketorderDefault(!Marketorderdefault);
    // console.log("you clicked" , subOrder);
  };

  const handlePartialClick = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    setAmount("");
    setCountPrice("");
    setPriceLimit("");
  }, [myTokenData]);

  const handleMarketOrder = (e) => {
    // setLimitInput(true);
    // setmarketorderDefault(true);
    // setLimitRadio(false);
    // setsubOrder("market_order");
    // setLimitInput(true);
    // setmarketorderDefault(true);
    // setLimitRadio(false);
    // setPriceLimit("");

    setsubOrder("market_order");
    setLimitInput(true);
    setmarketorderDefault(true);
    setLimitRadio(false);
    // console.log("you clicked" , subOrder);
  };

  const onChangeAmount = (e) => {
    if (!tokenSelected) {
      toast.warning("Please Select a Token First");
      setAmount("");
    } else if (tokenSelected && data && Object.keys(data).length === 0) {
      toast.error("Please select another Token");
    } else {
      if (subOrder === "market_order") {
        setCountPrice(
          parseFloat(e.target.value) * parseFloat(myTokenData.price) -
            parseFloat(
              parseFloat(e.target.value) *
                parseFloat(myTokenData.price) *
                parseFloat(myTokenData.buying_spread / 100)
            ) //236
        );
        setSpreadedAmount(
          parseFloat(e.target.value) * parseFloat(myTokenData.price)
        );
      } else {
        setCountPrice(
          parseFloat(e.target.value) * parseFloat(priceLimit) -
            parseFloat(
              parseFloat(e.target.value) *
                parseFloat(priceLimit) *
                parseFloat(myTokenData.buying_spread / 100)
            ) //236
        );
        setSpreadedAmount(parseFloat(e.target.value) * parseFloat(priceLimit));
      }
      setAmount(e.target.value);
    }
    // console.log("tokens", tokens);
  };

  // console.log("outside onchange", tokens);

  const onChangeLimitAmount = (e) => {
    setPriceLimit(e.target.value);
    if (subOrder === "limit_order") {
      setCountPrice(
        parseFloat(e.target.value) * parseFloat(amount) -
          parseFloat(
            parseFloat(e.target.value) *
              parseFloat(amount) *
              parseFloat(myTokenData.buying_spread / 100)
          )
      );
      setSpreadedAmount(parseFloat(e.target.value) * parseFloat(amount));
    } else {
      setCountPrice(
        parseFloat(amount) * parseFloat(myTokenData.price) -
          parseFloat(
            parseFloat(amount) *
              parseFloat(myTokenData.price) *
              parseFloat(myTokenData.buying_spread / 100)
          ) //236
      );
      setSpreadedAmount(
        parseFloat(e.target.value) * parseFloat(myTokenData.price)
      );
    }
  };

  const handleLimitorderchange = (orderType) => {
    setsubOrder(orderType);
    setAmount("");
  };

  const handleMarketorderchange = () => {
    setPriceLimit("");
    setsubOrder("market_order");
    setAmount("");
    setCountPrice("");
  };

  const onClickSell = (e) => {
    // console.log("TOKEN SELETCED ON SELL----------", myTokenData);
    if (parseInt(amount) === 0 || parseInt(amount) < 0) {
      toast.error("Invalid Token Amount");
      setAmount("");
    } else {
      if (amount.length === 0) {
        toast.error("Please Enter Tokens");
        setAmount("");
      } else {
        if (
          tokenSelected &&
          myTokenData &&
          parseInt(amount) > myTokenData.amount
        ) {
          toast.error("Insufficient Funds");
        } else {
          e.preventDefault();
          setLoading(true);
          // exchangeOrderRequest({
          //   amount,
          //   orderType: "sell",
          //   tokenId: myTokenData.id,
          //   sub_order: SubOrder,
          //   tokens: tokens,
          //   price_limit: limitAmount,
          //   setAmount,
          //   setLoading,
          // });
          setAmount("");
          setLoading(false);
          setPriceLimit("")
          // toast.success("Order placed successfully");
        }
      }
    }

    const data1 = {
      order_type: "sell_order",
      ito_token_id: myTokenData.id,
      amount: parseFloat(spreadedAmount),
      spreadedamount: parseFloat(countPrice),
      tokens: parseFloat(amount),
      token_price: parseFloat(parseFloat(myTokenData.price)),
      sub_order: subOrder,
      partialFill: checked,
      price_limit: parseFloat(priceLimit),
    };
    dispatch(getOrders({ data1, refresh, setRefresh, setLoading }));
    setCountPrice("");
    setTokens("");
  };

  useEffect(() => {
    dispatch(getUserExchangeOrders());
  }, [refresh]);

  // const limitAmountChange = (e) => {
  //   setPriceLimit(e.target.value);
  //   setCountPrice(
  //     parseFloat(e.target.value) * parseFloat(tokens) //236
  //   );
  // };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h4 className="font-18">Place Order</h4>
        <div className="row">
          <div className="col-12 col-sm-8">
            <div className="form-group">
              <input
                type="number"
                style={{ height: "38px", width: "100%" }}
                placeholder="Enter Tokens"
                name="amount"
                value={amount}
                onChange={onChangeAmount}
              />
            </div>

            {/* Checkboxes */}
            <div className="form-group">
              <input
                style={{ marginLeft: "0.1em" }}
                className="form-check-input"
                type="checkbox"
                value={PartialFill}
                onChange={(e) => setPartialFill(e.target.value)}
                checked={checked}
                onClick={handlePartialClick}
              />
              <label
                class="form-check-label"
                for="flexCheckDefault"
                style={{ marginLeft: "2em", fontSize: "1.1em" }}
              >
                Partial Fill
              </label>
              <br />
              <input
                style={{
                  marginLeft: "0.1em",
                  marginTop: "15px",
                }}
                className="form-check-input"
                name="Limitorder"
                type="radio"
                value={LimitOrder}
                // checked={limitoderCheck}
                onChange={() => handleLimitorderchange("limit_order")}
                onClick={handleLimitOrder}
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
                name="Limitorder"
                value={Marketorder}
                checked={Marketorderdefault}
                onChange={handleMarketorderchange}
                type="radio"
                onClick={handleMarketOrder}
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
                style={{ height: "38px", width: "31%" }}
                placeholder="Enter Limit Amount "
                name="tokens"
                value={priceLimit}
                disabled={Limitinput}
                onChange={onChangeLimitAmount}
                // onChange={(e) => setPriceLimit(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-sm-2">
            <button
              className="dls-btn bg-semi-black d-block text-white text-center py-2 px-4 rounded"
              onClick={onClickSell}
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}{" "}
              Sell
            </button>
          </div>
          <div className="col-12 col-sm-3 py-2">
            <div className="card">
              <div className="card-body bg-lit-gr py-2 px-3">
                <p className="font-14 mb-0 text-justify">
                  Price{" "}
                  <span className="float-right">
                    {/* {Math.floor((amount && amount / myTokenData.price) || 0)} */}
                    {(countPrice &&
                      (countPrice === 0 ? 0 : countPrice.toFixed(5))) ||
                      "0"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  exchange: state.exchange,
  auth: state.auth,
});

export default connect(mapStateToProps, { exchangeOrderRequest })(SellToken);
