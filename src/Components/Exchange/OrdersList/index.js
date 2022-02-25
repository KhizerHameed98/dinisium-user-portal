import React, { useEffect, useState } from "react";
import OrderListItem from "./OrderListItem";
// import { data } from "../dummyData";
import TableWithDetailButton from "../../CommonComponents/TableWithDetailButton";
import { getUserExchangeOrders } from "../../../Redux/actions/actions";
import { getExchangeOrder } from "../../../Redux/actions/actions";
import { connect, useDispatch, useSelector } from "react-redux";
import config from "../../../Constants/config";
import { columns } from "./ColumnData";
import { DeleteOrder, updateOrder } from "../../../Services/exchangeServices";
import UpdationModal from "./UpdationModal";

const OrderList = ({
 exchange: {
  orderData: { data },
 },
 orderType,
 getUserExchangeOrders,
}) => {
 const dispatch = useDispatch();

 const [show, setShow] = useState(false);
 const [refresh, setRefresh] = useState(false);
 const [type, setType] = useState(false);
 const [selectedData, setSelectedData] = useState({});

 const orderss = useSelector((state) => state.exchange.orderData.data);

 // console.log("oo", orderss);

 const state = useSelector((state) => console.log("state is", state));

 const DeleteOrders = (id) => {
  dispatch(DeleteOrder({ id, refresh, setRefresh }));
  setShow(false);
 };

 const UpdateOrders = (props) => {
  // console.log(props);
  dispatch(updateOrder({ props, refresh, setRefresh }));
  // setShow(false);
  setShow(false);
 };

 const handleShow = (props) => {
  setType(props.type);
  setSelectedData(props.data);
  setShow(true);
 };

 const handleClose = () => {
  setShow(false);
 };

 const databuy = orderss?.filter((item) => item.order_type === "buy_order");
 const datasell = orderss?.filter((item) => item.order_type === "sell_order");

 useEffect(() => {
  getUserExchangeOrders();
  dispatch(getExchangeOrder());
 }, [refresh]);

 return (
  <div className="card">
   <div className="table-responsive">
    {orderType ? (
     <TableWithDetailButton
      data={databuy}
      columns={columns(handleShow)}
      title={"YOUR ORDERS"}
      refresh={refresh}
      setRefresh={setRefresh}
     />
    ) : (
     <TableWithDetailButton
      data={datasell}
      columns={columns(handleShow)}
      title={"YOUR ORDERS"}
      refresh={refresh}
      setRefresh={setRefresh}
     />
    )}
   </div>
   {show ? (
    <UpdationModal
     type={type}
     handleClose={handleClose}
     show={show}
     setShow={setShow}
     DeleteOrders={DeleteOrders}
     // UpdateOrders={UpdateOrders}
     selectedData={selectedData}
     refresh={refresh}
     setRefresh={setRefresh}
    />
   ) : null}
  </div>
 );
};

const mapStateToProps = (state) => ({
 exchange: state.exchange,
});

export default connect(mapStateToProps, { getUserExchangeOrders })(OrderList);
