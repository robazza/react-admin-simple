import React, { Component, useState  } from "react";
import ReactDOM from "react-dom";
import { ReactComponent } from "react-formio";
import settingsForm from "./Identificacao.settingsForm";

/**
 * An example React component
 *
 * Replace this with your custom react component. It needs to have two things.
 * 1. The value should be stored is state as "value"
 * 2. When the value changes, call props.onChange(null, newValue);
 *
 * This component is very simple. When clicked, it will set its value to "Changed".
 */


const IdentificacaoCustomComp = (props) => {
    const [data, setData] = useState({requerente:{}, procurador:{}, procuracao: 'nao'});
    const [files, setFiles] = useState("");

    const convertFileToBase64 = file =>
      new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.rawFile);

          reader.onload = () => resolve({nome: file.rawFile.path, data: reader.result});
          reader.onerror = reject;
      });

    const handleChange = e => {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");

      setBase64(e.target.files[0])
      fileReader.onload = e => {
        console.log("e.target.result", e.target.result);
        
        setFiles(e.target.result);
      };
    };

    function setBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log(reader.result);
        setData({...data, procu: reader.result})
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
   }

    const setDataAndChange = (k,evt) => {
      var s;

      s = {...data}

      if (data.procuracao === 'nao') {
        s.requerente[k] = evt.target.value; 
        s.procurador[k] = evt.target.value; 
      }

      if (data.procuracao === 'sim') {
        if (k in ['Nome','CPF'])
          s.requerente[k] = evt.target.value; 
        else 
          s.procurador[k.slice(0, -1)] = evt.target.value; 
      }      

      setData({...s});
      
      props.onChange(data)
    }
    

    return (
      <>
        Meus Dados: <br/>
        <label>
            Nome: <input type="input" onChange={ (evt)=>setDataAndChange('Nome',evt) }  />
        </label>
        <label>
            CPF: <input type="input" onChange={ (evt)=>setDataAndChange('CPF',evt) }  />
        </label>

        <p></p>
        <div>
          <input  onChange={ (evt)=>setData({...data, procuracao:'nao'})  } type="radio" value={'nao'} name="procuracao" checked = {data.procuracao=='nao'} /> Estou pedindo para mim mesmo <br/>
          <input  onChange={ (evt)=>setData({...data, procuracao:'sim'})  } type="radio" value={'sim'} name="procuracao"  checked = {data.procuracao=='sim'}/> Estou pedindo para outra pessoa <br/>
        </div>

        {data.procuracao === 'sim' && (<div>
          Requerente: 
          <input type="file" onChange={handleChange} />
          <label>
              Nome: <input type="input" onChange={ (evt)=>setDataAndChange('Nome2',evt) }  />
          </label>
          <label>
              CPF: <input type="input" onChange={ (evt)=>setDataAndChange('CPF2',evt) }  />
          </label>
        </div>)}
      </>  
    );

}

export default class Identificacao extends ReactComponent {
  /**
   * This function tells the form builder about your component. It's name, icon and what group it should be in.
   *
   * @returns {{title: string, icon: string, group: string, documentation: string, weight: number, schema: *}}
   */
  static get builderInfo() {
    return {
      title: "Identificacao",
      icon: "square",
      group: "Data",
      documentation: "",
      weight: -10,
      schema: Identificacao.schema()
    };
  }

  /**
   * This function is the default settings for the component. At a minimum you want to set the type to the registered
   * type of your component (i.e. when you call Components.setComponent('type', MyComponent) these types should match.
   *
   * @param sources
   * @returns {*}
   */
  static schema() {
    return ReactComponent.schema({
      type: "identificacaoCustomComp",
      label: "Identificacao"
    });
  }

  /*
   * Defines the settingsForm when editing a component in the builder.
   */
  static editForm = settingsForm;

  /**
   * This function is called when the DIV has been rendered and added to the DOM. You can now instantiate the react component.
   *
   * @param DOMElement
   * #returns ReactInstance
   */
  attachReact(element) {
    return ReactDOM.render(
      <IdentificacaoCustomComp
        component={this.component} // These are the component settings if you want to use them to render the component.
        value={this.dataValue} // The starting value of the component.
        onChange={this.updateValue} // The onChange event to call when the value changes.
      />,
      element
    );
  }

  /**
   * Automatically detach any react components.
   *
   * @param element
   */
  detachReact(element) {
    if (element) {
      ReactDOM.unmountComponentAtNode(element);
    }
  }
}
