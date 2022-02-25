import React, { useState } from "react";
import { Link } from "react-router-dom";

const Calculator = ({ tokenPrice }) => {
  const [countTokens, setCountTokens] = useState(0);
  const [amount, setAmount] = useState("");

  const onChangeCalculatorAmount = (e) => {
    setAmount(e.target.value);
  };

  const calculateTokens = (e) => {
    e.preventDefault();
    setCountTokens(amount / tokenPrice);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h4 className="font-18">Calculate</h4>
        <div className="row">
          <div className="col-12 col-sm-8">
            <div className="form-group">
              <input
                type="number"
                style={{ height: "38px", width: "100%" }}
                placeholder="Enter Amount in dollars"
                name="calculatorAmount"
                value={amount}
                onChange={onChangeCalculatorAmount}
              />
            </div>
          </div>
          <div className="col-12 col-sm-4">
            <div className="card mb-3">
              <div className="card-body bg-lit-gr py-2 px-3">
                <p className="font-14 mb-0 text-justify">
                  Token{" "}
                  <span className="float-right">
                    {countTokens ? countTokens : "0"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <button
              className="bg-semi-black text-white py-2 px-4 rounded"
              onClick={calculateTokens}
            >
              Convert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
