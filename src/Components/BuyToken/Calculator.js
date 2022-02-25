import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  BuyTokenn,
  getNonTradableTokens,
} from "../../Services/exchangeServices";

const Calculator = ({
  exchange: {
    tokenSelected,
    tokenData: { data },
    seriesSelected,
    selectedSeriesData,
  },
  auth: { userWallet },
}) => {
  // console.log("Calc Data", tokenData);
  const [calculatorAmount, setCalculatorAmount] = useState("");
  const [countTokens, setCountTokens] = useState(0);
  const [countPrice, setCountPrice] = useState(0);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState("");

  const [refresh, setRefresh] = useState(false);

  console.log("refstatus", refresh);

  const onChangeTokens = (e) => {
    if (!tokenSelected) {
      toast.error("Please Select a Token First");
      setCalculatorAmount("");
    } else if (tokenSelected && data && Object.keys(data).length === 0) {
      toast.error("Please select another Token");
    } else if (setTokens(e.target.value)) {
    } else {
      setCountPrice(
        parseFloat(e.target.value * parseFloat(data?.price)) +
          parseFloat(e.target.value) *
            parseFloat(data?.price) *
            parseFloat(data?.selling_spread / 100)
      );
    }
  };

  const calculateTokens = (e) => {
    if (calculatorAmount === "") {
      toast.error("Please enter amount first");
    } else {
      e.preventDefault();
      setCountTokens(calculatorAmount / data.price);
    }
  };

  const state = useSelector((statee) => {
    console.log(statee);
  });

  const dispatch = useDispatch();

  // const buyTokens = () => {
  //   dispatch(BuyTokenn());
  // };

  useEffect(() => {
    console.log("useeffect in button called");
    dispatch(getNonTradableTokens());
  }, [refresh]);

  const onClickBuy = (e) => {
    if (tokens.length === 0) {
      toast.error("Please enter tokens");
      setAmount("");
    } else {
      if (Number.isInteger(countTokens)) {
        if (
          parseFloat(amount) > userWallet.fiat_balances ||
          parseFloat(amount) <= 0
          // ||
          // parseFloat(amount) < data.price
        ) {
          return toast.error("Insufficient Funds");
        } else if (countTokens <= parseInt(data.remaining_supply)) {
          e.preventDefault();
          setLoading(true);

          dispatch(
            BuyTokenn(
              {
                tokens: parseFloat(tokens),
                amount: parseFloat(countPrice),
                ito_token_id: data.id,
                setAmount,
                setCountTokens,
                setLoading,
              },
              refresh,
              setRefresh
            )
          );
        } else {
          toast.info("Please go to Exchange modal to order your request");
        }
      } else {
        toast.error("Tokens must be non-decimal");
      }
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h4 className="font-18">Token</h4>
        <div className="row">
          <div className="col-12 col-sm-8">
            <div className="form-group">
              <input
                type="number"
                style={{ height: "38px", width: "100%" }}
                placeholder={"Enter Tokens"}
                value={tokens}
                name="calculatorAmount"
                onChange={onChangeTokens}
                required
              />
            </div>
          </div>
          <div className="col-12 col-sm-4">
            <div className="card mb-3">
              <div className="card-body bg-lit-gr py-2 px-3">
                <p className="font-14 mb-0 text-justify">
                  Price{" "}
                  <span className="">
                    {(countPrice &&
                      (countPrice === 0 ? 0 : countPrice.toFixed(2))) ||
                      "0"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* <div className="col-12 col-sm-4 mt-2">
            <button
              className="dls-btn bg-semi-black text-white py-2 px-4 rounded "
              style={{ float: "left" }}
              onClick={calculateTokens}
            >
              Convert
            </button>
          </div> */}

          <div className="col-12 col-sm-4 mt-4">
            <button
              className="btn btn-primary bg-primary"
              onClick={onClickBuy}
              // disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}{" "}
              Buy Token
            </button>
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

export default connect(mapStateToProps, null)(Calculator);
