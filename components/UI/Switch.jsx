import React from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

const Switch = ({ label, required, type, error, checked, ...rest }) => {
  return (
    <FormGroup switch>
      <Input
        type="switch"
        checked={checked}
        {...rest}
        id="switch"
        className={`${error && "is-invalid"}`}
      />
      <Label htmlFor="switch" check>
        {label}
      </Label>
      {error && <FormFeedback>{error}</FormFeedback>}
    </FormGroup>
  );
};

export default Switch;
