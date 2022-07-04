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
    simples: {
      title: 'Simples',
      weight: 0,
      components: {
        textfield: true,
        textarea: true,
        number: true,
        checkbox: true,
        selectboxes: true,
        select: true,
        radio: true,

        toggleCustomComp: false,
        identificacaoCustomComp: false
      } 
    },
    complexos: {
      title: 'Complexos',
      components: {
        arquivo: {
          title: 'Arquivo',
          icon: 'file',
          schema: {
            label: "Anexo",
            type: 'file',
            key: 'anexo',
            storage: "base64",
            input: true
          }          
        },
        endereco: {
          title: 'Endereço',
          icon: 'file',
          schema: {
            label: "Endereço",
            type: 'address',
            key: 'endereco',
            storage: "base64",
            provider: "nominatim",
            input: true
          }          
        },
        tabela: {
          title: 'Tabela',
          icon: 'table',
          schema: {
            label: "Tabela",
            type: 'editgrid',
            templates: {
              header: '<div class="row">\n      {% util.eachComponent(components, function(component) { %}\n\n          <div class="col-sm-2">{{ t(component.label) }}</div>\n\n      {% }) %}\n    </div>',
              row: `<div class="row">\n      {% util.eachComponent(components, function(component) { %}\n\n          <div class="col-sm-2">\n            {{ isVisibleInRow(component) ? getView(component, row[component.key]) : ''}}\n          </div>\n\n      {% }) %}\n      {% if (!instance.options.readOnly && !instance.disabled) { %}\n        <div class="col-sm-2">\n          <div class="btn-group pull-right">\n            <button class="btn btn-default btn-light btn-sm editRow"><i class="{{ iconClass('edit') }}"></i></button>\n            {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}\n              <button class="btn btn-danger btn-sm removeRow"><i class="{{ iconClass('trash') }}"></i></button>\n            {% } %}\n          </div>\n        </div>\n      {% } %}\n    </div>`
            },
            key: 'tabela',
            input: true
          }          
        },
        email: true

      }
    },
    basic: {
      weight: 50,
    }
  },
  editForm: {
    textfield: [
      {
        key: 'api',
        ignore: false,
        "components": [
          {
              "label": "Text Field",
              "tableView": true,
              "key": "textField",
              "type": "textfield",
              "input": true
          }
        ]
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