import React, { useState, useEffect } from "react";
import {
  getFiatTransactionList,
  getWalletDetails,
} from "../../Redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import TableWithDetailButton from "../CommonComponents/TableWithDetailButton";
import {
  getWithdrawRequestList,
  RequestWithdraw,
} from "../../Services/walletService";
import SubmitModal from "./SubmitModal";
import { columns } from "./ColumnData";
import { SettingsBackupRestoreOutlined } from "@material-ui/icons";

const Requestwithdraw = () => {
  const [withdraw, setWithdraw] = useState({ amount: "", IBAN: "" });
  const [showModal, setShowModal] = useState(false);
  const userWallet = useSelector((state) => state.auth.userWallet);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setWithdraw({ ...withdraw, [name]: value });
  };
  const data = {
    amount: withdraw.amount,
    iban: withdraw.IBAN,
  };
  // console.log("DATA IS :", data);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseInt(withdraw.amount) <= 0) {
      toast.error("Enter the appropriate Amount");
    } else {
      if (parseFloat(withdraw.amount) <= userWallet.fiat_balances) {
        setShowModal(true);
      } else {
        toast.warning("Insufficent Balance Enter the appropriate Amount");
        setWithdraw({ amount: "", IBAN: "" });
      }
    }
  };
  const modalHandler = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const ReqWithdrawList = useSelector(
    (state) => state.wallet.RequestWithdrawList.data
  );
  useEffect(() => {
    dispatch(getWithdrawRequestList());
  }, [showModal]);

  return (
    <div className="col-12 col-md-8 offset-md-2">
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4 mt-4">
            <div className="card-body p-5">
              <form className="form">
                <div className="form-group row justify-content-center">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="">Amount</label>
                      <input
                        type="number"
                        placeholder="Amount"
                        className="form-control py-4"
                        name="amount"
                        min="0"
                        onChange={handleChange}
                        value={withdraw.amount}
                        required
                      />
                    </div>
                  </div>
                  {/* <div className="col-sm-6">
                    <div className="form-group">
                      <label className="">IBAN</label>
                      <input
                        type="number"
                        placeholder="IBAN"
                        className="form-control py-4"
                        name="IBAN"
                        onChange={handleChange}
                        value={withdraw.IBAN}
                        required
                      />
                    </div>
                  </div> */}

                  <div className="col-sm-12 text-center mt-3">
                    <button
                      type="submit"
                      className="btn btn-dark w-25 btn-lg"
                      onClick={handleSubmit}
                    >
                      SUBMIT
                    </button>
                  </div>
                  {showModal && (
                    <SubmitModal
                      setWithdraw={setWithdraw}
                      data={data}
                      showModal={showModal}
                      setShowModal={setShowModal}
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
          <TableWithDetailButton
            columns={columns}
            data={ReqWithdrawList}
            title={"Withdrawals"}
          />
        </div>
      </div>
    </div>
  );
};

export default Requestwithdraw;
