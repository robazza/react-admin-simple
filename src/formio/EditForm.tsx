import React from "react";
import { TextField } from "@material-ui/core";
import { useController, useForm } from "react-hook-form";
import { FormBuilder, FormEdit, Components, Errors } from "react-formio";

import Toggle from "../formio/Toggle";
import Identificacao from "../formio/Identificacao";

function isJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

const options = {
  builder: {
    //advanced: false
    basic: {
      components: {
        toggleCustomComp: true,
        identificacaoCustomComp: true
      }
    }
  },
  editForm: {
    textfield: [
      {
        key: 'api',
        ignore: false
      }        
    ]
  }
}

var ffrm = { display: "form" };
var mref = React.createRef();

export const EditForm = ({ errors }) => {
  const input1 = useController({ name: 'definition' });

  Components.setComponents({toggleCustomComp: Toggle, identificacaoCustomComp: Identificacao});

  const onChange = (schema,a,b,c)=>{
    //console.log('EEEE',schema,JSON.stringify(schema));
    //console.log(JSON.stringify(mref.current.builder.instance.schema))
    //console.log(mref)
    //input1.field.onChange(JSON.stringify(mref.current.builder.instance.schema));
    //input1.field.onChange(JSON.stringify(schema))
  }

  const onClick = (e)=>{
    e.preventDefault();
    input1.field.onChange(JSON.stringify(mref.current.builder.instance.schema));
    //console.log(JSON.stringify(mref.current.builder.instance.schema))
    
  }

  if (input1.field.value && isJsonString(input1.field.value))
  ffrm = JSON.parse(input1.field.value);

  return (
    <div>
      <button onClick={onClick}>Clique Aqui após Modificar o Formulário</button>
      <Errors errors={errors} />
      
      <FormBuilder ref={mref} options={options} onUpdateComponent={onChange} form={ffrm} />
      
    </div>
  );
}



/*
export function EditForm({ control, name }) {
  const {
    field: { onChange, onBlur, name, value, ref },
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields }
  } = useController({
    //name,
    control,
    rules: { required: true },
    defaultValue: "",
  });

  return (
    <TextField 
      onChange={onChange} // send value to hook form 
      onBlur={onBlur} // notify when input is touched/blur
      value={value} // input value
      name={name} // send down the input name
      inputRef={ref} // send input ref, so we can focus on input when error appear
    />
  );
}*/