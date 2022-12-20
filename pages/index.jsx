import Header from "components/Header";
import Logo from "components/Logo";
import PageHead from "components/PageHead";
import React from "react";

const Home = () => {
  return (
    <>
      <PageHead />

      <div>
        <Header />
        <h1>HomePage</h1>
      </div>
    </>
  );
};

export default Home;
