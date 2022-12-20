import DividerWithTitle from "components/Dividers/DividerWithTitle";
import Logo from "components/Logo";
import PageHead from "components/PageHead";
import InputField from "components/UI/InputField";
import { Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import { app } from "utils/config";

const loginInputValidator = (values) => {
  const errors = {};

  if (values.username === "") {
    errors.username = "This field is required.";
  } else if (values.username.length < 3) {
    errors.username = "Username is too short.";
  }

  if (values.password === "") {
    errors.password = "This field is required.";
  } else if (values.password.length < 6) {
    errors.password = "Password is too short.";
  } else if (values.password.length > 16) {
    errors.password = "Password is too long.";
  }

  return errors;
};

const Login = () => {
  const [showPass, setShowPass] = useState("password");

  return (
    <>
      <PageHead
        title="Login"
        description={
          "Login to " +
          app.firstName +
          " " +
          app.lastName +
          " portal to create new tournament, add scorecard etc (admin only) and user can buy kits and other items from our store."
        }
        keywords={
          "Login, Dashboard security check, " +
          app.firstName +
          " " +
          app.lastName +
          ", 2022-23"
        }
      />

      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Logo />
        <div className="mt-3 login--container">
          <h4 className="text-center b-600 mb-3">Login Here</h4>
          <Button color="primary" outline size="lg" block>
            <i className="fa-brands fa-google me-3"></i> Sign in with Google
          </Button>
          <DividerWithTitle title="Or" />
          <Formik
            initialValues={{ username: "", password: "" }}
            validate={loginInputValidator}
            onSubmit={(values) => alert(JSON.stringify(values))}
          >
            {({ errors, getFieldProps, handleSubmit }) => (
              <form noValidate onSubmit={handleSubmit}>
                <InputField
                  label="Username"
                  type="text"
                  required
                  error={errors.username}
                  {...getFieldProps("username")}
                />
                <InputField
                  label="Password"
                  type={showPass}
                  required
                  error={errors.password}
                  {...getFieldProps("password")}
                />
                <Row className="mb-3">
                  <Col md={6} sm={12}>
                    <p className="mb-0 text-center text-md-start">
                      <Link
                        href="/"
                        className="text-decoration-none"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPass((prev) =>
                            prev === "password" ? "text" : "password"
                          );
                        }}
                      >
                        {showPass === "password" ? "Show" : "Hide"} Password
                      </Link>
                    </p>
                  </Col>
                  <Col md={6} sm={12}>
                    <p className="mb-0 text-center text-md-end">
                      <Link
                        href="/forgot-password"
                        className="text-decoration-none"
                      >
                        Forgot Password?
                      </Link>
                    </p>
                  </Col>
                </Row>
                <Button color="primary" block>
                  <i className="fa-solid fa-arrow-right-to-bracket me-3"></i>{" "}
                  Login
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;