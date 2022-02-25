import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getExchangeableTokens } from "../../Redux/actions/actions";

const Calculator = ({ exchange: { data }, getExchangeableTokens }) => {
  const [amount, setAmount] = useState("");
  const [countTokens, setCountTokens] = useState("");
  const [tokens, setTokens] = useState("");
  const [countAmount, setCountAmount] = useState("");
  const [price, setPrice] = useState(undefined);

  const onSelectToken = (e) => {
    setPrice(e.target.value);
  };

  const onChangeAmount = (e) => {
    if (price === undefined) {
      toast.info("Please select a token first");
    } else {
      setAmount(e.target.value);
    }
  };
  const onChangeTokens = (e) => {
    if (price === undefined) {
      toast.info("Please select a token first");
    } else {
      setTokens(e.target.value);
    }
  };

  const countTokensBtn = (e) => {
    e.preventDefault();
    if (price === undefined) {
      toast.info("Please Select a token first");
    } else {
      setCountTokens(amount / price);
    }
  };

  const countAmountBtn = (e) => {
    e.preventDefault();
    if (price === undefined) {
      toast.info("Please Select a token first");
    } else {
      setCountAmount(tokens * price);
    }
  };
  useEffect(() => {
    getExchangeableTokens();
  }, []);
  return (
    <>
      <div className="col-12 col-md-8 offset-md-2">
        {/* <!-- inner row --> */}
        <div className="row">
          <div className="col-sm-12">
            <div className="selct-drop d-block  ">
              <select
                className="custom-select font-weight-bold d-inline mb-3 w-50"
                onChange={onSelectToken}
              >
                <option defaultChecked value={undefined}>
                  Select Token
                </option>
                {data &&
                  data.length > 0 &&
                  data.map((ito) => (
                    <option value={ito.price} key={ito.id}>
                      {ito.token_name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-body p-5">
                <div className="row">
                  <div className="col-12">
                    <h4 className="tbl-small-heading font-18">
                      Convert your Token / Amount
                    </h4>
                  </div>

                  <div className="col-md-8">
                    <div className="text-secondary font-weight-bold mb-4">
                      <div className=" py-2 px-2">
                        <div className="d-inline-block">
                          <p className="mb-0">
                            Token Name:{" "}
                            <span className="text-primary">
                              Token Name(TCN)
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <h4 className="font-18">Calculator</h4>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <input
                        type="number"
                        style={{ height: "38px", width: "100%" }}
                        placeholder="Enter Amount in Dollars"
                        name="amount"
                        value={amount}
                        onChange={onChangeAmount}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-3">
                    <div className="card mb-3">
                      <div className="card-body bg-lit-gr py-2 px-3">
                        <p className="font-14 mb-0 text-justify">
                          {countTokens ? countTokens.toFixed(2) : 0}{" "}
                          <span className="float-right">Token</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-3">
                    <button
                      className="bg-semi-black text-white py-2 px-4 rounded"
                      onClick={countTokensBtn}
                    >
                      Convert
                    </button>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <input
                        type="number"
                        style={{ height: "38px", width: "100%" }}
                        placeholder="Enter Tokens"
                        name="tokens"
                        value={tokens}
                        onChange={onChangeTokens}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-3">
                    <div className="card">
                      <div className="card-body bg-lit-gr py-2 px-3">
                        <p className="font-14 mb-0 text-justify">
                          {countAmount ? countAmount : 0}{" "}
                          <span className="float-right">$</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-3">
                    <button
                      className="bg-semi-black text-white py-2 px-4 rounded"
                      onClick={countAmountBtn}
                    >
                      Convert
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end inner row --> */}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  exchange: state.exchange,
});

export default connect(mapStateToProps, { getExchangeableTokens })(Calculator);
