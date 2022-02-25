import React from 'react';


const SelectITO = () => {
    return (
      <div className="col-sm-12 my-2">
        <div className="selct-drop form-inline justify-content-end">
          <select className="custom-select w-50">
            <option defaultValue="">Select ITO</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
    );
}
 
export default SelectITO;