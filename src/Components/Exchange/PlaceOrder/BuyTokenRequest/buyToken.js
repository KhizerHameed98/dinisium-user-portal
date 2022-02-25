import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  exchangeOrderRequest,
  getUserExchangeOrders,
} from "../../../../Redux/actions/actions";
import { getOrders } from "../../../../Redux/actions/actions";
// import { getUserExchangeOrders } from "../../../Redux/actions/actions";
import {
  getExchangeableTokens,
  vanishData,
} from "../../../../Services/exchangeServices";

const RadioButton = (props) => <input type="radio" {...props} />;

const BuyToken = ({
  exchange: {
    tokenData: { data },
    buyTokenSelected,
    buyRequestSeriesSelected,
    buyTokenData,
    seriesData,
    buyRequestSelectedSeriesData,
    seriesSelected,
    isBuyRequestTokenSelected,
  },
  selectRef,
  auth: { userWallet },
  exchangeOrderRequest,
}) => {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [tokens, setTokens] = useState("");
  const [limitAmount, setLimitAmount] = useState(null);
  const [countPrice, setCountPrice] = useState(0);
  const [orderType, setOrderType] = useState("buy");
  const [Limitinput, setLimitInput] = useState(true); //Enter Limit Amount Input Field
  const [priceLimit, setPriceLimit] = useState(null);
  const [checked, setChecked] = useState(true); //PartialFill checkbox checked by default
  const [PartialFill, setPartialFill] = useState(""); //partialfill value
  const [LimitOrder, setLimitOrder] = useState("limit_order");
  const [Marketorder, setMarketOrder] = useState("market_order");
  const [SubOrder, setSubOrder] = useState("market_order");
  // const[LimitOrder , setLimitOrder] = useState("limit_order");
  const [Limitradio, setLimitRadio] = useState(false); //Limit Order radio check
  const [Marketorderdefault, setmarketorderDefault] = useState(true); //MarketOrder radio Check
  const [spreadedAmount, setSpreadedAmount] = useState(0);

  //   const handleSubOrderChange  = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   setSubOrder({[name]:value});
  // }

  // const state = useSelector((statee) => console.log(statee?.exchange?.data));
  // const exchange = useSelector((state) =>
  //   console.log("state.exchange", state?.exchange?.data)
  // );

  useEffect(() => {
    setTokens("");
    setCountPrice("");
    setPriceLimit("");
  }, [buyTokenData]);

  // console.log("result", state);

  const dispatch = useDispatch();

  const handleLimitOrder = () => {
    setCountPrice(0);
    setSubOrder("limit_order");
    setLimitInput(!Limitinput);
    setmarketorderDefault(false);
    setLimitRadio(!Limitradio);
    setmarketorderDefault(!Marketorderdefault);
    // setCountPrice(tokens * priceLimit);
  };

  const handlePartialClick = () => {
    setChecked(!checked);
  };

  const handleMarketOrder = () => {
    setSubOrder("market_order");
    setLimitInput(true);
    setmarketorderDefault(true);
    setLimitRadio(false);
    // console.log("you clicked" , SubOrder);
  };
  const onChangeAmount = (e) => {
    if (!buyTokenSelected) {
      toast.warning("Please Select a Token First");
      setTokens("");
    } else if (
      buyTokenSelected &&
      buyTokenData &&
      Object.keys(buyTokenData).length === 0
    ) {
      toast.error("Please select another Token");
    } else if (
      buyRequestSeriesSelected &&
      buyRequestSelectedSeriesData &&
      Object.keys(buyRequestSelectedSeriesData).length === 0
    ) {
      toast.error("Please select another Series");
    } else {
      setTokens(e.target.value);
      if (SubOrder === "market_order") {
        setCountPrice(
          parseFloat(e.target.value) * parseFloat(buyTokenData.price) +
            parseFloat(
              parseFloat(e.target.value) *
                parseFloat(buyTokenData.price) *
                parseFloat(buyTokenData.selling_spread / 100)
            )
        );

        setSpreadedAmount(
          parseFloat(e.target.value) * parseFloat(buyTokenData.price)
        );
      } else {
        setCountPrice(
          parseFloat(e.target.value) * parseFloat(priceLimit) +
            parseFloat(
              parseFloat(e.target.value) *
                parseFloat(priceLimit) *
                parseFloat(buyTokenData.selling_spread / 100)
            )
        );
        setSpreadedAmount(parseFloat(e.target.value) * parseFloat(priceLimit));
      }
    }
  };

  const onChangeLimitAmount = (e) => {
    if (!buyTokenSelected) {
      toast.warning("Please Select a Token First");
      setLimitAmount("");
    } else if (
      buyTokenSelected &&
      buyTokenData &&
      Object.keys(buyTokenData).length === 0
    ) {
      toast.error("Please select another Token");
    } else if (
      buyRequestSeriesSelected &&
      buyRequestSelectedSeriesData &&
      Object.keys(buyRequestSelectedSeriesData).length === 0
    ) {
      toast.error("Please select another Series");
    } else {
      // setCountPrice(parseFloat(e.target.value) / buyTokenData.price);
      setLimitAmount(e.target.value);
    }
  };

  const handleLimitorderchange = (orderType) => {
    setSubOrder(orderType);
    setTokens("");
  };

  const handleMarketorderchange = (e) => {
    setPriceLimit("");
    setSubOrder("market_order");
    setTokens("");
    setCountPrice("");
  };

  // console.log("Token id is ", buyTokenData.id);

  const onClickBuy = async (e) => {
    // console.log(SubOrder);
    // return toast.error("testing");

    let numberOfTokens = 0;
    if (!Number.isInteger(tokens)) {
      numberOfTokens = parseFloat(tokens);
    }
    if (tokens === 0) {
      toast.error("Please Enter tokens");
      setTokens("");
    } else {
      if (Number.isInteger(numberOfTokens)) {
        if (
          parseFloat(countPrice) > userWallet.fiat_balances ||
          parseFloat(countPrice) < buyTokenData.price
        ) {
          return toast.error("Insufficient Funds");
        }
        // else if (
        //   parseFloat(countPrice) <= parseInt(buyTokenData.remaining_supply)
        // ) {
        //   toast.info("Please go to Buy Tokens Module");
        // }
        else {
          e.preventDefault();
          setLoading(true);
          const data1 = {
            order_type: "buy_order",
            ito_token_id: buyTokenData.id,
            amount: parseFloat(spreadedAmount),
            spreadedamount: parseFloat(countPrice),
            token_price: parseFloat(parseFloat(spreadedAmount) / tokens),
            tokens: parseFloat(tokens),
            sub_order: SubOrder,
            partialFill: checked,
            price_limit: parseFloat(priceLimit),
          };
          setTimeout(() => {
            setLoading(false);
          }, 500);
          dispatch(getOrders({ data1, setLoading, refresh, setRefresh }));
          setCountPrice("");
          setTokens("");
          setPriceLimit("");
          document.getElementById("toclearN").innerHTML = "Token Name";
          document.getElementById("toclearS").innerHTML = "Symbol";
          selectRef.current.select.clearValue();
          // exchangeOrderRequest({
          //   amount: countPrice,
          //   tokens: tokens,
          //   orderType: "buy",
          //   tokenId: buyTokenData.id,
          //   numberOfTokens,
          //   price_limit: limitAmount,
          //   // countPrice,
          //   seriesId: 1,
          //   setLoading,
          // });
          // toast.success("Order placed successfully");
          // setCountPrice("");
          // setTokens("");
          // isBuyRequestTokenSelected(true , {});
        }
      } else {
        toast.error("Tokens must be non-decimal");
      }
    }
  };

  useEffect(() => {
    dispatch(getUserExchangeOrders());
  }, [refresh]);

  const limitAmountChange = (e) => {
    setPriceLimit(e.target.value);
    if (SubOrder === "limit_order") {
      setCountPrice(
        parseFloat(e.target.value) * parseFloat(tokens) +
          parseFloat(
            parseFloat(e.target.value) *
              parseFloat(tokens) *
              parseFloat(buyTokenData.selling_spread / 100)
          )
      );

      setSpreadedAmount(parseFloat(e.target.value) * parseFloat(tokens));
    } else {
      setCountPrice(
        parseFloat(tokens) * parseFloat(buyTokenData.price) +
          parseFloat(
            parseFloat(e.target.value) *
              parseFloat(buyTokenData.price) *
              parseFloat(buyTokenData.selling_spread / 100)
          )
      );

      setSpreadedAmount(parseFloat(e.target.value) * parseFloat(tokens));
    }
  };
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h4 className="font-18">Place Order</h4>

        <div className="row">
          <div className="col-12 col-sm-8">
            <div className="form-group">
              <input
                type="number"
                min="0"
                max="99"
                step="1"
                style={{
                  height: "38px",
                  width: "100%",
                }}
                placeholder="Enter Tokens"
                name="tokens"
                value={tokens}
                onChange={onChangeAmount}
              />
            </div>

            {/* chekboxes  */}
            <div className="form-group">
              <input
                style={{
                  marginLeft: "0.1em",
                }}
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
                name="Limit_order"
                value="limit_order"
                checked={Limitradio}
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
                name="Market_order"
                value="market_order"
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
                style={{
                  height: "38px",
                  width: "150px",
                }}
                placeholder="Enter Limit Amount "
                name="tokens"
                value={priceLimit}
                disabled={Limitinput}
                // onChange={(e) => setPriceLimit(e.target.value)}
                onChange={limitAmountChange}
              />
            </div>
          </div>
          <div className="col-12 col-sm-2">
            <button
              className="dls-btn bg-semi-black d-block text-center text-white py-2 px-4 rounded"
              onClick={onClickBuy}
              // onClick={ dispatch(getOrders({ito_token_id:1, tokens:tokens, partialFill:checked,sub_order: Marketorder,amount:limitAmount})) ,onClickBuy}
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}{" "}
              Buy
            </button>
          </div>

          <div className="col-12 col-sm-3 py-2">
            <div className="card">
              <div className="card-body bg-lit-gr py-2 px-3">
                <p className="font-14 mb-0 text-justify">
                  Price{" "}
                  <span className="">
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

export default connect(mapStateToProps, { exchangeOrderRequest })(BuyToken);
