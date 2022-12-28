import Logo from "components/Logo";
import PageHead from "components/PageHead";
import InputField from "components/UI/InputField";
import { useToast } from "contexts/toast-context";
import { Formik } from "formik";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "reactstrap";
import { app } from "utils/config";
import { backendCall, end_points } from "utils/end-points";

const resetPasswordInputHandler = (values) => {
  const errors = {};

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

  if (values.re_password && values.password !== values.re_password) {
    errors.re_password = "Password must be equal to retype password.";
  }

  return errors;
};

const Token = () => {
  const router = useRouter();
  const { toast } = useToast();

  return (
    <>
      <PageHead
        title="Forgot Password"
        description={
          "Login to " +
          app.firstName +
          " " +
          app.lastName +
          " portal to create new tournament, add scorecard etc (admin only) and user can buy kits and other items from our store."
        }
        keywords={
          "Reset Password, Password Security, Dashboard security check, " +
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
          <h4 className="text-center b-600 mb-3">Enter New Password</h4>

          <Formik
            initialValues={{ password: "", re_password: "" }}
            validate={resetPasswordInputHandler}
            onSubmit={async (values) => {
              try {
                const resp = await backendCall
                  .post(end_points.reset_password + router.query.token, {
                    password: values.password,
                  })
                  .then((resp) => resp.data);
                toast(resp.message, "success");
                router.push("/login");
              } catch (error) {
                toast(error.response?.data?.message || error.message, "error");
              }
            }}
          >
            {({ errors, getFieldProps, handleSubmit }) => (
              <form noValidate onSubmit={handleSubmit}>
                <InputField
                  label="Password"
                  type="password"
                  required
                  error={errors.password}
                  {...getFieldProps("password")}
                />
                <InputField
                  label="Retype Password"
                  type="password"
                  required
                  error={errors.re_password}
                  {...getFieldProps("re_password")}
                />

                <Button color="primary" block type="submit">
                  <i className="fa-solid fa-floppy-disk"></i> Save Password
                </Button>
              </form>
            )}
          </Formik>
          <p className="mb-0 mt-3 text-center">
            <Link href="/login">Login Here</Link>
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

export default Token;
