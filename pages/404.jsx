import Logo from "components/Logo";
import PageHead from "components/PageHead";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "reactstrap";

const Error404 = () => {
  const router = useRouter();

  return (
    <>
      <PageHead title="Error 404" />

      <div
        style={{ minHeight: "100vh" }}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <Logo />
        <div className="mt-3">
          <h2 className="mb-0 text-center">Error 404 - Not Found</h2>
          <h6 className="text-center">
            The resource you are requesting is not found on server.
          </h6>
          <hr />
          <p>Please write an email to our tech team at developers@wcc.com</p>
          <p className="text-center">
            <Button color="primary" type="button" onClick={() => router.back()}>
              <i className="fa-solid fa-arrow-left"></i> Go back
            </Button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Error404;
