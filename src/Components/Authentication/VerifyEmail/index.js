import React, { useEffect } from "react";

import { TestFunction } from "../../../Services/authServices";

const TestPage = (props) => {
  const id = props.match.params.id;

  useEffect(() => {
    TestFunction(id);
  }, []);

  return <></>;
};

export default TestPage;
