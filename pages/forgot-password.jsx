import Logo from "components/Logo";
import PageHead from "components/PageHead";
import InputField from "components/UI/InputField";
import { useToast } from "contexts/toast-context";
import { Formik } from "formik";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import { app } from "utils/config";
import { backendCall, end_points } from "utils/end-points";
import { emailIsValid } from "utils/helpers";

const forgotPasswordInputValidator = (values) => {
  const errors = {};

  if (values.email === "") {
    errors.email = "This field is required.";
  } else if (!emailIsValid(values.email)) {
    errors.email = "Email is invalid.";
  }

  return errors;
};

const ForgotPassword = () => {
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
          "Forgot Password, Password Security, Dashboard security check, " +
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
          <h4 className="text-center b-600 mb-3">Enter Email Here</h4>

          <Formik
            initialValues={{ email: "" }}
            validate={forgotPasswordInputValidator}
            onSubmit={async (values) => {
              try {
                const resp = await backendCall
                  .post(end_points.forgot_password, values)
                  .then((resp) => resp.data);
                toast(resp.message, "success");
              } catch (error) {
                toast(error.response?.data?.message || error.message, "error");
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

                <Button color="primary" block type="submit">
                  <i className="fa-solid fa-paper-plane"></i> Send Email
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

export default ForgotPassword;
