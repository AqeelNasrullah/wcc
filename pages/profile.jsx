import EndpointError from "components/EndpointError";
import Header from "components/Header";
import PageHead from "components/PageHead";
import InputField from "components/UI/InputField";
import Switch from "components/UI/Switch";
import { Formik } from "formik";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Dropzone from "react-dropzone";
import { Button, Col, Row } from "reactstrap";
import { backendCall, end_points } from "utils/end-points";

const Profile = ({ status, user, message }) => {
  if (!status) {
    return <EndpointError message={message} />;
  }

  return (
    <>
      <PageHead title={(user?.name || user?.username) + " Profile"} />

      <div>
        <Header />

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
                name: user.name,
                username: user.username,
                email: user.email,
                verified: user.verified,
                isAdmin: user.isAdmin,
              }}
              enableReinitialize
              onSubmit={(values) => alert(JSON.stringify(values))}
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
                        src={user.image}
                        width={100}
                        height={100}
                        alt="Not found"
                      />
                    </div>
                    <Dropzone
                      multiple={false}
                      onDrop={(files) => {
                        console.log(files[0]);
                      }}
                      onError={(err) => {
                        console.log(err);
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
                  <Row className="mb-3">
                    <Col md={6} sm={12}>
                      <Switch
                        checked={values.verified}
                        {...getFieldProps("verified")}
                        label="Verified"
                      />
                    </Col>
                    <Col md={6} sm={12}>
                      <Switch
                        checked={values.isAdmin}
                        label="Admin"
                        {...getFieldProps("isAdmin")}
                      />
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
