import Image from "next/image";
import React from "react";
import { app } from "utils/config";
import Link from "next/link";

const Logo = ({ vertical }) => {
  return (
    <Link href="/" className="text-decoration-none text-dark d-inline-block">
      <div className={`d-flex ${vertical && "flex-column"} align-items-center`}>
        <div>
          <Image
            src="/trophy.png"
            width={vertical ? 100 : 75}
            height={vertical ? 100 : 75}
            alt="Not Found"
          />
        </div>
        <div className="d-flex align-items-center">
          <div
            style={{
              borderRight: vertical ? "0px" : "2px solid black",
              paddingRight: vertical ? "0px" : "10px",
              marginRight: vertical ? "0px" : "10px",
            }}
          >
            <h3 style={{ marginBottom: "-7px" }} className="text-center">
              {app.firstName}
            </h3>
            <h5 className="mb-0 text-center">{app.lastName}</h5>
            {vertical && <h6 className="text-center mb-0">2022-23</h6>}
          </div>
          {vertical ? null : <h1 className="mb-0">2022-23</h1>}
        </div>
      </div>
    </Link>
  );
};

export default Logo;
