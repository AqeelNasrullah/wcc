import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const NavLink = ({ label, link, dropdown }) => {
  const router = useRouter();

  return (
    <li className="header--nav-item">
      <Link
        className={`header--nav-link ${router.pathname === link && active}`}
        href={link}
      >
        {label}
      </Link>
    </li>
  );
};

export default NavLink;
