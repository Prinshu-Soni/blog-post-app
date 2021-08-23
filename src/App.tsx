import React, { Fragment } from "react";
import Header from "components/Header";
import "App.css";
import Users from "components/Users";

const App = () => {
  return (
    <Fragment>
      <Header />
      <Users />
    </Fragment>
  );
};

export default App;
