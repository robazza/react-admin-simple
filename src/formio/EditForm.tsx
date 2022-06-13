import React from "react";
import { FormBuilder, FormEdit, Errors } from "react-formio";

export const EditForm = ({ errors }) => (
  <div>
    <h2>Create Form</h2>
    <hr />
    <Errors errors={errors} />
    <FormEdit form={{ display: "form" }} />
    <button>Store</button>
  </div>
);
