import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Header from "./Header";
import PageHead from "./PageHead";

const EndpointError = ({ message }) => {
  const router = useRouter();

  return (
    <>
      <PageHead title="Error" />

      <div>
        <Header />
        <div className="p-5">
          <p className="text-center text-danger">
            <i className="fa-solid fa-triangle-exclamation"></i> {message}
          </p>
          <p className="text-center">
            <Link
              className="text-decoration-none"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                router.reload();
              }}
            >
              <i className="fa-solid fa-arrows-rotate"></i> Reload
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default EndpointError;
