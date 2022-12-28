import EndpointError from "components/EndpointError";
import Header from "components/Header";
import Loading from "components/Loading";
import PageHead from "components/PageHead";
import InputField from "components/UI/InputField";
import Switch from "components/UI/Switch";
import { useToast } from "contexts/toast-context";
import { Formik } from "formik";
import { getSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { backendCall, end_points } from "utils/end-points";
import { getImage } from "utils/helpers";

const profileInputValidator = (values) => {
  const errors = {};

  if (values.name === "") {
    errors.name = "This field is required.";
  }

  if (values.username === "") {
    errors.username = "This field is required.";
  }

  return errors;
};

const changePasswordInputHandler = (values) => {
  const errors = {};

  if (values.old_password === "") {
    errors.old_password = "This field is required.";
  } else if (values.old_password.length < 6) {
    errors.old_password = "Password is too short.";
  } else if (values.old_password.length > 16) {
    errors.old_password = "Password is too long.";
  }

  if (values.new_password === "") {
    errors.new_password = "This field is required.";
  } else if (values.new_password.length < 6) {
    errors.new_password = "Password is too short.";
  } else if (values.new_password.length > 16) {
    errors.new_password = "Password is too long.";
  }

  if (values.re_new_password === "") {
    errors.re_new_password = "This field is required.";
  } else if (values.re_new_password.length < 6) {
    errors.re_new_password = "Password is too short.";
  } else if (values.re_new_password.length > 16) {
    errors.re_new_password = "Password is too long.";
  }

  if (values.new_password !== values.re_new_password) {
    errors.re_new_password =
      "New password is not equal to retype new password.";
  }

  return errors;
};

const Profile = ({ status, user, message }) => {
  if (!status) {
    return <EndpointError message={message} />;
  }

  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(user?.image || "");
  const [changePasswordMessage, setChangePasswordMessage] = useState(false);

  const changePasswordMessageToggler = () =>
    setChangePasswordMessage((prev) => !prev);

  const fileUploadHandler = async (files) => {
    setLoading(true);
    if (files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append("file", file);
      try {
        const resp = await backendCall
          .post(end_points.upload_single, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((resp) => resp.data);

        setProfilePicture(resp?.filename);

        setLoading(false);
      } catch (error) {
        toast(error.response?.data?.message || error.message, "error");
        setLoading(false);
      }
    } else {
      toast("Upload file.", "error");
    }
  };

  return (
    <>
      {loading && (
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "fixed",
            top: "0px",
            left: "0px",
            zIndex: 99999,
            backgroundColor: "#0007",
          }}
        >
          <Loading />
        </div>
      )}

      <PageHead title={(user?.name || user?.username) + " Profile"} />

      <div>
        <Header />

        <Modal
          isOpen={changePasswordMessage}
          // toggle={changePasswordMessageToggler}
        >
          <ModalHeader toggle={changePasswordMessageToggler}>
            Change Password
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                old_password: "",
                new_password: "",
                re_new_password: "",
              }}
              validate={changePasswordInputHandler}
              onSubmit={async (values) => {
                try {
                  const resp = await backendCall
                    .post(end_points.change_password, {
                      old_password: values.old_password,
                      new_password: values.new_password,
                    })
                    .then((resp) => resp.data);
                  toast(resp.message, "success");
                  changePasswordMessageToggler();
                  await signOut({ redirect: false });
                  router.push("/");
                } catch (error) {
                  toast(
                    error.response?.data?.message || error.message,
                    "error"
                  );
                }
              }}
            >
              {({ errors, getFieldProps, handleSubmit }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <InputField
                    label="Old Password"
                    type="password"
                    required
                    error={errors.old_password}
                    {...getFieldProps("old_password")}
                  />
                  <InputField
                    label="New Password"
                    type="password"
                    required
                    error={errors.new_password}
                    {...getFieldProps("new_password")}
                  />
                  <InputField
                    label="Retype New Password"
                    type="password"
                    required
                    error={errors.re_new_password}
                    {...getFieldProps("re_new_password")}
                  />
                  <Button type="submit" color="primary" block>
                    Save
                  </Button>
                </form>
              )}
            </Formik>
          </ModalBody>
        </Modal>

        <div>
          <div
            style={{
              maxWidth: "700px",
              width: "100%",
              margin: "0px auto",
              padding: "50px 10px",
            }}
          >
            <h3 className="mb-5">{user.name || user.username}'s Profile</h3>
            <Formik
              initialValues={{
                name: user.name || "",
                username: user.username || "",
                email: user.email || "",
                verified: user.verified || false,
                isAdmin: user.isAdmin || false,
              }}
              enableReinitialize
              validate={profileInputValidator}
              onSubmit={async (values) => {
                await backendCall
                  .put(end_points.profile, {
                    image: profilePicture,
                    ...values,
                  })
                  .then((resp) => resp.data);
                toast("Profile updated successfully.", "success");
              }}
            >
              {({ values, errors, getFieldProps, handleSubmit }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div
                      style={{
                        minWidth: "100px",
                        maxWidth: "100px",
                        minHeight: "100px",
                        maxHeight: "100px",
                        border: "1px solid black",
                        borderRadius: "100%",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={getImage(profilePicture)}
                        width={100}
                        height={100}
                        alt="Not found"
                      />
                    </div>
                    <Dropzone
                      multiple={false}
                      onDrop={fileUploadHandler}
                      onError={(err) => {
                        console.log("pages > profile => DropZone Error: ", err);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div
                          {...getRootProps({
                            style: {
                              border: "1px dashed black",
                              borderRadius: "5px",
                              width: "100%",
                              height: "100px",
                              cursor: "pointer",
                            },
                            className:
                              "p-2 d-flex align-items-center justify-content-center",
                          })}
                        >
                          <input {...getInputProps()} />
                          <p className="mb-0">
                            Drag 'n' drop some files here, or click to select
                            files
                          </p>
                        </div>
                      )}
                    </Dropzone>
                  </div>
                  <InputField
                    label="Name"
                    error={errors.name}
                    required
                    type="text"
                    {...getFieldProps("name")}
                  />
                  <Row>
                    <Col md={6} sm={12}>
                      <InputField
                        type="text"
                        label="Username"
                        error={errors.username}
                        required
                        {...getFieldProps("username")}
                      />
                    </Col>
                    <Col md={6} sm={12}>
                      <InputField
                        type="text"
                        label="Email"
                        error={errors.email}
                        required
                        disabled
                        {...getFieldProps("email")}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3 align-items-center">
                    {user?.isAdmin && (
                      <>
                        <Col md={6} sm={12} className="mb-2">
                          <Switch
                            checked={values.verified}
                            {...getFieldProps("verified")}
                            label="Verified"
                          />
                        </Col>
                        <Col md={6} sm={12} className="mb-2">
                          <Switch
                            checked={values.isAdmin}
                            label="Admin"
                            {...getFieldProps("isAdmin")}
                          />
                        </Col>
                      </>
                    )}
                    <Col md={12} sm={12}>
                      {user?.password ? (
                        <Button
                          type="button"
                          color="primary"
                          outline
                          onClick={changePasswordMessageToggler}
                        >
                          Change Password
                        </Button>
                      ) : (
                        <p className="text-danger">
                          <i className="fa-solid fa-triangle-exclamation"></i>{" "}
                          You have not created password yet. Logout and use
                          forgot password option to create password.
                        </p>
                      )}
                    </Col>
                  </Row>
                  <Button type="submit" color="primary" block>
                    Save
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const result = await backendCall
      .get(end_points.profile, {
        headers: {
          Cookie: context.req.headers.cookie,
        },
      })
      .then((resp) => resp.data);

    return {
      props: { status: true, user: result },
    };
  } catch (error) {
    return {
      props: {
        status: false,
        message: error.response?.data?.message || error.message,
      },
    };
  }
};

export default Profile;
