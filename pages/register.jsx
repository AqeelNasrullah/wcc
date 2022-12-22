import DividerWithTitle from "components/Dividers/DividerWithTitle";
import Logo from "components/Logo";
import PageHead from "components/PageHead";
import InputField from "components/UI/InputField";
import { Formik } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Row, Spinner } from "reactstrap";
import { app } from "utils/config";
import { getSession, signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { backendCall, end_points } from "utils/end-points";

const registerInputValidator = (values) => {
  const errors = {};

  if (values.email === "") {
    errors.email = "This field is required.";
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(
      values.email
    )
  ) {
    errors.email = "Email is invalid.";
  }

  if (values.password === "") {
    errors.password = "This field is required.";
  } else if (values.password.length < 6) {
    errors.password = "Password is too short.";
  } else if (values.password.length > 16) {
    errors.password = "Password is too long.";
  }

  if (values.re_password === "") {
    errors.re_password = "This field is required.";
  } else if (values.re_password.length < 6) {
    errors.re_password = "Password is too short.";
  } else if (values.re_password.length > 16) {
    errors.re_password = "Password is too long.";
  }

  if (values.password !== values.re_password) {
    errors.re_password = "Password is not matching to retype password.";
  }

  return errors;
};

const Register = () => {
  const [showPass] = useState("password");
  const [googleSignInActivityIndicator, setGoogleSignInActivityIndicator] =
    useState(false);

  const [error, setError] = useState("");

  const router = useRouter();
  const errorParam = router.query.error;

  useEffect(() => {
    if (errorParam === "OAuthCallback") {
      setError("Something went wrong in Google SignIn. Please try again.");
    }
  }, [errorParam]);

  return (
    <>
      <PageHead
        title="Register"
        description={
          "Register to " +
          app.firstName +
          " " +
          app.lastName +
          " portal to create new tournament, add scorecard etc (admin only) and user can buy kits and other items from our store."
        }
        keywords={
          "Regsiter, Dashboard security check, " +
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
          <h4 className="text-center b-600 mb-3">Regsiter Here</h4>

          {error && (
            <Alert
              color="danger"
              isOpen={!!error}
              toggle={() => setError((prev) => !prev && "")}
            >
              {error}
            </Alert>
          )}

          <Button
            color="primary"
            outline
            size="lg"
            block
            onClick={async () => {
              setGoogleSignInActivityIndicator(true);
              await signIn("google", { redirect: false });
            }}
            disabled={googleSignInActivityIndicator}
          >
            {googleSignInActivityIndicator ? (
              <Spinner color="primary" size="sm" />
            ) : (
              <>
                <i className="fa-brands fa-google me-3"></i> Sign up with Google
              </>
            )}
          </Button>
          <DividerWithTitle title="Or" />
          <Formik
            initialValues={{ email: "", password: "", re_password: "" }}
            validate={registerInputValidator}
            onSubmit={async (values) => {
              try {
                const result = await backendCall
                  .post(end_points.regsiter, {
                    email: values.email,
                    password: values.password,
                  })
                  .then((resp) => resp.data);

                toast.success(result.message);
                router.push("/login");
              } catch (error) {
                toast.error(error.response?.data?.message || error.message);
              }
            }}
          >
            {({ errors, getFieldProps, handleSubmit }) => (
              <form noValidate onSubmit={handleSubmit}>
                <InputField
                  label="Email"
                  type="text"
                  required
                  error={errors.email}
                  {...getFieldProps("email")}
                />
                <InputField
                  label="Password"
                  type={showPass}
                  required
                  error={errors.password}
                  {...getFieldProps("password")}
                />
                <InputField
                  label="Retype Password"
                  type={showPass}
                  required
                  error={errors.re_password}
                  {...getFieldProps("re_password")}
                />
                <Button color="primary" block type="submit">
                  <i className="fa-solid fa-user me-3"></i> Register
                </Button>
              </form>
            )}
          </Formik>
          <p className="mb-0 mt-3 text-center">
            Already Registered? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default Register;
