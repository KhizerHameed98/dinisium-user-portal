import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { buyToken } from "../../Redux/actions/actions";

const PlaceOrder = ({
  exchange: {
    tokenSelected,
    tokenData: { data },
    seriesSelected,
    selectedSeriesData,
  },
  auth: { userWallet },
  buyToken,
}) => {
  const [loading, setLoading] = useState(false);

  const [refresh, setRefresh] = useState(false);

  console.log('refstatus' , refresh);

  const [amount, setAmount] = useState("");
  const [countTokens, setCountTokens] = useState("");
  const dispatch = useDispatch()


  const onChangeAmount = (e) => {
    if (!tokenSelected) {
      toast.warning("Please Select a Token First");
      setAmount("");
    }
    // else if (!seriesSelected) {
    //   toast.warning("Please Select a Series First");
    //   setAmount("");
    // }
    else if (tokenSelected && data && Object.keys(data).length === 0) {
      toast.error("Please select another Token");
    }
    // else if (
    //   seriesSelected &&
    //   selectedSeriesData &&
    //   Object.keys(selectedSeriesData).length === 0
    // ) {
    //   toast.error("Please select another Series");
    // }
    else {
      setCountTokens(e.target.value / data.price);
      setAmount(e.target.value);
    }
    setRefresh(true);
  };



  const onClickBuy = (e) => {
    if (amount.length === 0) {
      toast.error("Please enter amount");
      setAmount("");
    } else {
      if (Number.isInteger(countTokens)) {
        if (
          parseFloat(amount) > userWallet.fiat_balances ||
          parseFloat(amount) <= 0 ||
          parseFloat(amount) < data.price
        ) {
          return toast.error("Insufficient Funds");
        } else if (countTokens <= parseInt(selectedSeriesData.supply)) {
          e.preventDefault();
          setLoading(true);

          dispatch(buyToken(refresh , setRefresh) ,{
            tokens: parseFloat(countTokens),
            amount: parseFloat(amount),
            ito_token_id: data.id,
            setAmount,
            setCountTokens,
            setLoading,
          })

          // buyToken();
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
        <h4 className="font-18">Invest</h4>
        <div className="row">
          <div className="col-12 col-sm-12">
            <div className="form-group">
              <input
                type="number"
                style={{ height: "38px", width: "100%" }}
                placeholder="Enter amount in dollars"
                name="amount"
                value={amount}
                onChange={onChangeAmount}
              />
            </div>
          </div>
          <div className="col-12 col-sm-4 mt-4">
            <button
              className="btn btn-primary bg-primary"
              onClick={onClickBuy}
              disabled={loading}
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

export default connect(mapStateToProps, { buyToken })(PlaceOrder);
