import { useToast } from "contexts/toast-context";
import { Formik } from "formik";
import Image from "next/image";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { Button, Col, Row } from "reactstrap";
import { backendCall, end_points } from "utils/end-points";
import { emailIsValid, getImage } from "utils/helpers";
import InputField from "./UI/InputField";
import Switch from "./UI/Switch";

const userFormInputValidator = (values, type) => {
  const errors = {};

  if (values.name === "") {
    errors.name = "This field is required.";
  }

  if (values.username === "") {
    errors.username = "This field is required.";
  }

  if (values.email === "") {
    errors.email = "This field is required.";
  } else if (!emailIsValid(values.email)) {
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

  if (
    values.password !== "" &&
    values.re_password !== "" &&
    values.password !== values.re_password
  ) {
    errors.re_password = "Password and retype password must be equal.";
  }

  return errors;
};

const UserForm = ({ data, type = "add", submitHandler }) => {
  const [profilePicture, setProfilePicture] = useState(data.image || "");
  const { toast } = useToast();

  const fileUploadHandler = async (files) => {
    const file = files[0];
    const formData = new FormData();

    formData.append("file", file);

    try {
      const result = await backendCall
        .post(end_points.upload_single, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => resp.data);

      setProfilePicture(result?.filename);
    } catch (error) {
      toast(error.response?.data?.message || error.message, "error");
    }
  };

  return (
    <Formik
      initialValues={{
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        re_password: data.re_password,
        verified: data.verified,
        isAdmin: data.isAdmin,
      }}
      validate={(values) => userFormInputValidator(values, type)}
      onSubmit={async (values) => {
        values.image = profilePicture;
        await submitHandler(values);
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
                console.log("components > UserForm => DropZone Error: ", err);
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
                    Drag 'n' drop some files here, or click to select files
                  </p>
                </div>
              )}
            </Dropzone>
          </div>
          <InputField
            label="Name"
            type="text"
            required
            error={errors.name}
            {...getFieldProps("name")}
          />
          <Row>
            <Col md={6} sm={12}>
              <InputField
                label="Username"
                type="text"
                required
                error={errors.username}
                {...getFieldProps("username")}
              />
            </Col>
            <Col md={6} sm={12}>
              <InputField
                label="Email"
                type="text"
                required
                error={errors.email}
                {...getFieldProps("email")}
              />
            </Col>
            <Col md={6} sm={12}>
              <InputField
                label="Password"
                type="password"
                required
                error={errors.password}
                {...getFieldProps("password")}
              />
            </Col>
            <Col md={6} sm={12}>
              <InputField
                label="Retype Password"
                type="password"
                required
                error={errors.re_password}
                {...getFieldProps("re_password")}
              />
            </Col>
            <Col md={6} sm={12} className="mb-3">
              <Switch
                checked={values.verified}
                error={errors.verified}
                label="Verified"
                {...getFieldProps("verified")}
              />
            </Col>
            <Col md={6} sm={12} className="mb-3">
              <Switch
                checked={values.isAdmin}
                error={errors.isAdmin}
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
  );
};

export default UserForm;
