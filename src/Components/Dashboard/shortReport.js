import React from 'react';


const ShortReport = () => {
    return (
      <div className="row">
        <div className="col-md-3">
          <div className="card bg-cr-1 text-white mb-4">
            <div className="card-body">
              <div className="d-inline-block">
                <p className="dashboard-cd-amot">10$</p>
                <span className="dashboard-cd-blc">EXCHANGE ORDERS</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-cr-2 text-white mb-4">
            <div className="card-body">
              <div className="d-inline-block">
                <p className="dashboard-cd-amot">45$</p>
                <span className="dashboard-cd-blc">TOTAL ELECTIONS</span>
              </div>
             </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-cr-1 text-white mb-4">
            <div className="card-body">
              <div className="d-inline-block">
                <p className="dashboard-cd-amot">10$</p>
                <span className="dashboard-cd-blc">REGISTED USE</span>
              </div>
             </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-cr-2 text-white mb-4">
            <div className="card-body">
              <div className="d-inline-block">
                <p className="dashboard-cd-amot">45$</p>
                <span className="dashboard-cd-blc">TOKENS REVENUE</span>
              </div>
             </div>
          </div>
        </div>
      </div>
    );
}
 
export default ShortReport;