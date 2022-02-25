import React, { useEffect, useState } from "react";
import { data } from "../dummyData";
import ExchangeOrderItem from "./ExchangeOrderItem";
import config from "../../../Constants/config";
import Pagination from "@material-ui/lab/Pagination";
import { getUserExchangeOrders } from "../../../Redux/actions/actions";
import { connect } from "react-redux";
import TableWithDetailButton from "../../CommonComponents/TableWithDetailButton";
import { columns } from "../OrdersList/ColumnData";

const ExchangeOrder = ({
  exchange: {
    orderData: { data },
  },
  getUserExchangeOrders,
}) => {
  //screen No. e.g; 1 or 2 or 3 etc
  const [screen, setScreen] = useState(1);
  //Total No Of Screens
  const [count, setCount] = useState(0);
  //No. of Items Per Screen

  const handleChange = (event, value) => {
    setScreen(value);
  };
  const countData = data && data.length;

  //noOfScreens
  useEffect(() => {
    if (countData % config.userPerScreen === 0) {
      setCount(Math.floor(countData / config.userPerScreen));
    } else {
      setCount(Math.floor(countData / config.userPerScreen) + 1);
    }
  }, [countData, config.userPerScreen]);

  useEffect(() => {
    getUserExchangeOrders();
  }, []);

  return (
    <div className="col-12 col-md-8 offset-md-2">
      {/* <!-- inner row --> */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="table-responsive">
              {" "}
              <TableWithDetailButton
                data={data}
                columns={columns}
                title={"YOUR ORDER"}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end inner row --> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  exchange: state.exchange,
});

export default connect(mapStateToProps, { getUserExchangeOrders })(
  ExchangeOrder
);
