import React, { useEffect, useState } from "react";
import Select from "react-select";
// import { data } from "./data";
import {
  getTokenList,
  isTokenSelected,
  getTokenDetailById,
  isSeriesSelected,
  getOngoingSeriesById,
  getExchangeableTokens,
} from "../../../../Redux/actions/actions";
import { connect, useDispatch, useSelector } from "react-redux";
import { getSellTokens } from "../../../../Services/exchangeServices";

const TokensList = ({
  wallet: { datatokenList },
  exchange: { tokenData, tokenSelected, data },
  getTokenList,
  getExchangeableTokens,
  isTokenSelected,
  getTokenDetailById,
  sellToken,
}) => {
  const sellTokenn = useSelector(
    (state) => state?.exchange?.sellTokens?.options
  );

  const options = useSelector((state) => state?.exchange?.sellTokens?.options);

  const [sellTokenData, setSellTokenData] = useState([]);

  // for (let i = 0; i < sellTokenData.length; i++) {
  //   sellTokenData[i].label = "label test";
  //   sellTokenData[i].token_name = "name test";
  //   sellTokenData[i].value = "value test";
  // }

  const [tokenDetail, setTokenDetail] = useState({
    // tokenName: "",
    // tokenSymbol: ""
    token_name: "",
    token_symbol: "",
  });

  const onChangeSelect = (e) => {
    // console.log("token selected", e);
    console.log("e", e);
    if (e) {
      // let token_symbol =
      //   tokenData && tokenData.data && tokenData.data.token_symbol
      //     ? tokenData.data.token_symbol || ""
      //     : "";
      // e.token_symbol = token_symbol;
      setTokenDetail({
        token_name: e.label,
        token_symbol: e.symbol,
      });

      isTokenSelected(true, e);
      // getTokenDetailById(e.ito_token_id);
    } else {
      isTokenSelected(false, {});
    }
  };

  const dispatch = useDispatch();
  // dispatch(getSellTokens(setSellTokenData));

  // const sellTokenn = useSelector((state) => {

  //   // setSellTokens(state.)
  // });

  // const sellTokenn = useSelector((state) => state?.exchange?.sellTokens?.data);
  // console.log("result at", sellTokenn);

  useEffect(() => {
    dispatch(getSellTokens(setSellTokenData));
  }, []);

  return (
    <div className="row">
      <div className="col-md-6 col-lg-12">
        {/* <h6>Select Token</h6> */}
        <div className="d-inline-block" style={{ width: "100%" }}>
          <div className="form-group">
            <Select
              className="basic-single"
              classNamePrefix="select"
              // defaultValue={[{ label: "", value: "No Data Found" }]}
              isDisabled={false}
              isLoading={false}
              isClearable={true}
              isRtl={false}
              isSearchable={true}
              name="color"
              // options={
              //   sellTokenData && sellTokenData.length > 0
              //     ? options
              //     : [{ label: "", value: "No Data Found" }]
              // }
              options={options}
              onChange={onChangeSelect}
            />
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card mb-3">
          <div className="card-body bg-lit-gr py-2 px-3">
            <p className="mb-0 text-justify">
              {tokenSelected
                ? tokenDetail?.token_name || "Token Name"
                : "Token Name"}
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card mb-3">
          <div className="card-body bg-lit-gr py-2 px-3">
            <p className=" mb-0 text-justify">
              {tokenSelected ? tokenDetail.token_symbol || "Symbol" : "Symbol"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  exchange: state.exchange,
  wallet: state.wallet,
});

export default connect(mapStateToProps, {
  getTokenList,
  getExchangeableTokens,
  isTokenSelected,
  getTokenDetailById,
})(TokensList);
