import React, { useState } from "react";
import { FormBuilder, FormEdit, Errors, Form } from "react-formio";

function isJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

export const DisplayForm = ({definition, errors }) => { 
  const [formData, setFormData] = useState({});
  var frm = {
    display: "form",
    components: [
    ]
  };



  if (definition && isJsonString(definition))
    frm = JSON.parse(definition);



  return (
    <div>
      <h2>Create Forms</h2>
      <hr />
        {JSON.stringify(formData.data)}
        <Form
          form={frm}
          //onChange={(schema) => console.log(schema)}
          onSubmit={(x) => setFormData(x)}
        />
    </div>
  )

};
