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

export const DisplayForm = ({definition, onSetFormData, errors }) => { 
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
          form={frm} options={{readOnly: false, 
            //viewAsHtml: true,
            //renderMode: 'html'
          }}
          //onChange={(schema) => console.log(schema)}
          onSubmit={(x) => onSetFormData(x.data)}
        />
    </div>
  )

};
