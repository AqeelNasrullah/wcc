import Logo from "components/Logo";
import PageHead from "components/PageHead";
import React from "react";

const Home = () => {
  return (
    <>
      <PageHead />

      <Logo vertical />

      <div>
        <h1>HomePage</h1>
      </div>
    </>
  );
};

export default Home;
