import React from "react";
import AppLayouts from "./AppLayouts";
import Routes from "../../app/routes";

const AppLayout = () => {



  const Layout = AppLayouts["Vertical"];
  return (
    <Layout>
      <Routes />
    </Layout>
  );
};

export default AppLayout;
