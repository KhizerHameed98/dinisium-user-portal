import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import TokensDetailItem from "./TokensDetailItem";
import { transferToken } from "../../../Redux/actions/actions";
import Pagination from "@material-ui/lab/Pagination";
import config from "../../../Constants/config";
import TableWithDetailButton from "../../CommonComponents/TableWithDetailButton";
import { connect } from "react-redux";
import { getTokenList } from "../../../Redux/actions/actions";
import { columns } from "./ColumnData";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getTokenListing } from "../../../Services/walletService";

const TokenDetail = ({ getTokenList, wallet }) => {
  const { tokenList } = wallet;



  useEffect(() => {
    getTokenList();
  }, []);

  //screen No. e.g; 1 or 2 or 3 etc
  const [screen, setScreen] = useState(1);
  //Total No Of Screens
  const [count, setCount] = useState(0);
  //No. of Items Per Screen

  const [result, setResult] = useState([]);

  const itemsPerScreen = config.itemsPerScreen;

  const handleChange = (event, value) => {
    setScreen(value);
  };

  const TokensList = useSelector((state) => state?.wallet?.TokensList?.data);

  // console.log("Tokens are", TokensList);

  // const { balance } = TokensList.balance;
  // console.log("bb", balance);

  const state = useSelector((state) => console.log("state is ", state));
  const dispatch = useDispatch();

  const countData = tokenList && tokenList.length;

  

  //noOfScreens
  useEffect(() => {
    if (countData % itemsPerScreen === 0) {
      setCount(Math.floor(countData / itemsPerScreen));
    } else {
      setCount(Math.floor(countData / itemsPerScreen) + 1);
    }
  }, [countData, itemsPerScreen]);

  const newResult = TokensList?.filter((items) => items.balance != 0);

  console.log('res' , newResult);

  newResult?.sort((a, b) => {
    return a?.token_name - b?.token_name;
  });

  newResult?.sort((a, b) => {
    return a?.holdings - b?.token_holdings;
  });

  newResult?.sort((a, b) => {
    return a?.price - b?.token_price;
  });
  newResult?.sort((a, b) => {
    return a?.price*a.holdings - b?.price*b.hodings;
  });

  // console.log("new", newResult);

  // console.log("res", newResult);
  // console.log(result?.data);
  useEffect(() => {
    dispatch(getTokenListing(setResult));
  }, []);

  useEffect(() => {
    // const newResult = result.filter((items) => items.balance != 0);
    // console.log("new", newResult);
  }, [result]);

  //tokenDetailItem things
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    to_address: "",
    token_amount: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.to_address === "" || formData.token_amount === "") {
      setError(true);
    } else {
      setError(false);
      if (wallet.tokens < formData.token_amount) {
        toast.info("insuffient tokens");
      } else if (formData.token_amount <= 0) {
        toast.info("tokens amount must be greater then 0");
      } else {
        setLoading(true);
        formData.token_id = tokenList.ito_token_id;
        transferToken({ formData, setFormData, setLoading, setShow });
      }
    }
  };
  // console.log("............................................", newResult);
  return (
    <Fragment>
      <div className="card">
        <div className="table-responsive">
          <TableWithDetailButton
            title={"YOUR TOKENS"}
            data={newResult}
            columns={columns(handleShow)}
          />
        </div>
      </div>

      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Transfer Tokens</Modal.Title>
        </Modal.Header>
        <form className="form" onSubmit={onSubmit}>
          <Modal.Body>
            {" "}
            <div className="form-group row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label>Token amounts</label>
                  <input
                    type="number"
                    placeholder="Token amounts"
                    className="form-control"
                    name="token_amount"
                    value={formData.token_amount}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  {/* {error && formData.token_amount === "" ? (
                    <div className="error-msg"> Token amounts is required </div>
                  ) : null} */}
                </div>
              </div>

              <div className="col-sm-12">
                <div className="form-group">
                  <label>To address</label>
                  <input
                    type="text"
                    placeholder="To address"
                    className="form-control"
                    name="to_address"
                    value={formData.to_address}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  {/* {error && formData.to_address === "" ? (
                    <div className="error-msg"> To address is required </div>
                  ) : null} */}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* <Button variant="primary" type="submit" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}{" "}
              Transfer
            </Button> */}
          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  );
};
const mpaStateToProps = (state) => {
  return {
    wallet: state.wallet,
  };
};

export default connect(mpaStateToProps, {
  getTokenList,
  transferToken,
})(TokenDetail);
