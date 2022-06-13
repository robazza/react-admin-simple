import React, { useState } from "react";
import { FormBuilder, FormEdit, Errors, Form } from "react-formio";

export const DisplayForm = ({ errors }) => { 
  const [formData, setFormData] = useState({});
  const frm = {
    display: "form",
    components: [
      {
        label: "Text Field",
        tableView: true,
        modalEdit: true,
        key: "textField",
        type: "textfield",
        input: true
      },
      {
        label: "Email",
        tableView: true,
        key: "email",
        type: "email",
        input: true
      },
      {
        type: "button",
        label: "Submit",
        key: "submit",
        disableOnInvalid: true,
        input: true,
        tableView: false
      }
    ]
  };
  
  return (
  <div>
    <h2>Create Forms</h2>
    <hr />
      {JSON.stringify(formData.data)}
      <Form
        form={frm}
        onChange={(schema) => console.log(schema)}
        onSubmit={(x) => setFormData(x)}
      />
  </div>
)
};
