import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import {
  getExchangeableTokens,
  isBuyRequestTokenSelected,
  isSeriesSelected,
  getOngoingSeriesById,
  isBuyRequestSeriesSelected,
} from "../../../../Redux/actions/actions";
import { connect, useDispatch } from "react-redux";

const TokensList = ({
  selectRef,
  exchange: {
    buyTokenData,
    data,
    buyTokenSelected,
    buyRequestSeriesData,
    selectedSeriesData,
    seriesSelected,
    buyRequestSelectedSeriesData,
  },
  option,
  getExchangeableTokens,
  isBuyRequestTokenSelected,
  isSeriesSelected,
  isBuyRequestSeriesSelected,
  getOngoingSeriesById,
}) => {
  const [tokenDetail, setTokenDetail] = useState({
    tokenName: "Select...",
    tokenSymbol: "",
  });
  console.log("DATA=============>", buyTokenSelected && buyTokenData);
  // const initialValue = { data };
  // console.log("INitial Value", initialValue);
  // const [dataa, setDataa] = useState(initialValue);

  const dispatch = useDispatch();
  // console.log("DAATAAA", dataa);
  // isBuyRequestTokenSelected(true) ? setTokenDetail("") : null

  const onChangeSelect = (e) => {
    console.log("my data is ------------> ", e);
    console.log("REFFFFFFFFFFFFFFFFFFFFFFFFFFFF", selectRef);

    if (e) {
      setTokenDetail({
        tokenName: e.token_name,
        tokenSymbol: e.token_symbol,
      });
      isBuyRequestTokenSelected(true, e);
      getOngoingSeriesById(e.ito_id, true);
    } else {
      isBuyRequestTokenSelected(false, {});
    }
  };

  // const onChangeSeriesSelect = (e) => {
  //   if (
  //     buyTokenData &&
  //     Object.keys(buyTokenData).length > 0 &&
  //     buyRequestSelectedSeriesData &&
  //     buyRequestSelectedSeriesData.ito_id &&
  //     buyTokenData.ito_id !== buyRequestSelectedSeriesData.ito_id
  //   ) {
  //     isBuyRequestSeriesSelected(false, {});
  //   } else if (e) {
  //     // setTokenDetail({
  //     //   tokenName: e.token_name,
  //     //   tokenSymbol: e.token_symbol,
  //     // });
  //     isBuyRequestSeriesSelected(true, e);
  //   } else {
  //     isBuyRequestSeriesSelected(false, {});
  //   }
  // };

  // useEffect(() => {
  //   // console.log("_________________", data);
  //   getExchangeableTokens();
  // }, []);

  return (
    <div className="row">
      <div className="col-md-6 col-lg-12 ">
        <h4 className="font-18">Select Token</h4>
        <div className="d-inline-block" style={{ width: "100%" }}>
          <div className="form-group">
            <Select
              ref={selectRef}
              className="basic-single"
              // classNamePrefix="select"
              defaultValue={tokenDetail.tokenName}
              // isDisabled={false}
              // isLoading={false}
              // isClearable={true}
              // isRtl={false}
              isSearchable={true}
              name="color"
              options={option}
              // options={
              //   option && option.length > 0
              //     ? option
              //     : [{ label: "", value: "No Data Found" }]
              // }
              onChange={onChangeSelect}
            />
          </div>
        </div>
      </div>
      {/* <div className="col-md-6">
        <h4 className="font-18">Select Series</h4>
        <div className="d-inline-block" style={{ width: "100%" }}>
          <div className="form-group">
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={[]}
              isDisabled={false}
              isLoading={false}
              isClearable={true}
              isRtl={false}
              isSearchable={true}
              name="color"
              options={buyRequestSeriesData}
              onChange={onChangeSeriesSelect}
            />
          </div>
        </div>
      </div> */}
      <div className="col-md-3">
        <div className="card mb-3">
          <div className="card-body bg-lit-gr py-2 px-3">
            <p id="toclearN" className="mb-0 text-justify">
              {buyTokenSelected && buyTokenData
                ? tokenDetail.tokenName || "Token Name"
                : "Token Name"}
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card mb-3">
          <div className="card-body bg-lit-gr py-2 px-3">
            <p id="toclearS" className=" mb-0 text-justify">
              {buyTokenSelected && buyTokenData && tokenDetail.tokenSymbol
                ? tokenDetail.tokenSymbol || "Symbol"
                : "Symbol"}
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
  getExchangeableTokens,
  isBuyRequestTokenSelected,
  isSeriesSelected,
  getOngoingSeriesById,
  isBuyRequestSeriesSelected,
})(TokensList);
