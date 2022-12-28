import Link from "next/link";
import React from "react";
import Header from "./Header";
import PageHead from "./PageHead";

const UnauthorizedError = ({ title }) => {
  return (
    <>
      <PageHead title={title} />

      <div>
        <Header />

        <div className="p-5">
          <h5 className="text-center text-danger">
            <i className="fa-solid fa-triangle-exclamation"></i> You are not
            authorized to access this resource.
          </h5>
          <p className="text-center">
            <Link href="/users" className="text-decoration-none">
              <i className="fa-solid fa-rotate"></i> Reload
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default UnauthorizedError;
