import Logo from "components/Logo";
import React from "react";
import Link from "next/link";
import { Badge } from "reactstrap";
import NavLink from "./NavLink";

const Header = () => {
  return (
    <header className="header d-flex align-items-center gap-3">
      <Logo />
      <nav className="flex-grow-1">
        <div className="d-flex justify-content-end">
          <p className="mb-0 header--primary-nav">
            <Link href="/login">
              <i className="fa-solid fa-user"></i> Login
            </Link>
            &nbsp;&nbsp; &nbsp;&nbsp;
            <Link href="/cart" className="position-relative me-4">
              <i className="fa-solid fa-shopping-cart"></i>{" "}
              <small
                className="position-absolute"
                style={{ top: "-10px", left: "10px" }}
              >
                <Badge color="primary" pill>
                  3
                </Badge>
              </small>
            </Link>
          </p>
        </div>
        <div className="d-flex justify-content-end">
          <ul className="header--main-nav">
            <NavLink label="Standings" link="/standings" />
            <NavLink label="Fixtures" link="/fixtures" />
            <NavLink label="Teams" link="/teams" />
            <NavLink label="News" link="/news" />
            <NavLink label="Gallery" link="/gallery" />
            <NavLink label="Shop" link="/shop" />
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
