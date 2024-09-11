"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsMoonFill, BsSun } from "react-icons/bs";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { data: session } = useSession();

  return (
    <nav
      className={`d-flex flex-column gap-3  start-0 w-100   shadow-lg p-3    d-md-flex flex-md-row align-items-md-center shadow-none ${
        isDarkMode ? "bg-dark text-white" : "bg-light text-dark"
      }`}
    >
      <Link
        href="#"
        className="fs-4 fw-bold text-decoration-none"
        prefetch={false}
      >
        Bienvenido {session?.user.email}
      </Link>

      <Link
        href="/"
        className={`text-decoration-none ${
          isDarkMode ? "text-light" : "text-dark"
        }`}
        prefetch={false}
      >
        Home
      </Link>
      {session?.user ? (
        <>
          <Link
            href="/dashboard"
            className={`text-decoration-none ${
              isDarkMode ? "text-light" : "text-dark"
            }`}
            prefetch={false}
          >
            Dashboard
          </Link>
          <button onClick={() => signOut()} className="btn btn-danger btn-sm">
            Signout
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className={`text-decoration-none ${
              isDarkMode ? "text-light" : "text-dark"
            }`}
            prefetch={false}
          >
            Login
          </Link>
          <Link
            href="/register"
            className={`text-decoration-none ${
              isDarkMode ? "text-light" : "text-dark"
            }`}
            prefetch={false}
          >
            Register
          </Link>
        </>
      )}

      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`btn     ${
          isDarkMode ? "bg-secondary text-light" : "border   text-dark"
        } ms-auto  `}
        style={{ borderWidth: "2px", backgroundColor: "#f0f0f0" }}
      >
        {isDarkMode ? <BsMoonFill /> : <BsSun />}
      </button>
    </nav>
  );
};

export default Navbar;
