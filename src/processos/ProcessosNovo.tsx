//const ProcessosNovo = () => (<>XXXX EEE</>)

import * as React from 'react';
import { useMemo, useState, useRef } from 'react';
import { RichTextInput } from 'ra-input-rich-text';
import { useController, useForm } from "react-hook-form";
import _ from "lodash";

import {
    ArrayInput,
    AutocompleteInput,
    BooleanInput,
    Create,
    DateInput,
    FileField,
    FileInput,
    FormDataConsumer,
    maxValue,
    minValue,
    NumberInput,
    required,
    ReferenceInput,
    SaveButton,
    SelectInput,
    SimpleForm,
    SimpleFormIterator,
    TextInput,
    Toolbar,
    useNotify,
    usePermissions,
    useRedirect,
    TabbedForm,
    FormTab,
    useGetOne,
	useGetList,
    useGetIdentity,
    useRecordContext
} from 'react-admin';



import { useFormContext, useWatch } from 'react-hook-form';

import { DisplayForm } from "../formio/DisplayForm";

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

import ReactPDF from '@react-pdf/renderer';

import { Form } from "react-formio";

import { MyPdfDoc } from '../pdfform/MyPdfDoc';

import Switch from '@mui/material/Switch';

const ProcessoCreateToolbar = props => {
    const notify = useNotify();
    const redirect = useRedirect();
    const { reset } = useFormContext();

    return (
        <Toolbar>
            <SaveButton label="post.action.save_and_edit" variant="text" />
            <SaveButton
                label="post.action.save_and_show"
                type="button"
                variant="text"
                mutationOptions={{
                    onSuccess: data => {
                        notify('ra.notification.created', {
                            type: 'info',
                            messageArgs: { smart_count: 1 },
                        });
                        redirect('edit', 'processos', data.id);
                    },
                }}
            />
            <SaveButton
                label="Criar Outro"
                type="button"
                variant="text"
                mutationOptions={{
                    onSuccess: () => {
                        reset();
                        window.scrollTo(0, 0);
                        notify('ra.notification.created', {
                            type: 'info',
                            messageArgs: { smart_count: 1 },
                        });
                    },
                }}
            />
        </Toolbar>
    );
};


const MyDocument = () => (
    <Document>
      <Page size="A4" >
        <View >
          <Text>Section #1</Text>
        </View>
        <View>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );


const PdfBase64 = ({document}) => {
    const [pdfData, setPdfData] = useState("");

    const [instance, updateInstance] = ReactPDF.usePDF({ document: document });

    if (instance.loading) return <div>Loading ...</div>;

    if (instance.error) return <div>Something went wrong: {error}</div>;

    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    if (instance.blob)
      getBase64(instance.blob, setPdfData)

    return (<>{pdfData}</>)
}


const FormioFormField = ({source}) => {
    const formContext = useFormContext();
    const { data, isLoading, error } = useGetOne('forms', { id: formContext?.getValues().formId },{retry:false, staleTime:9999999});

    //formContext.getValues().formId


    const formioForm = useController({ name: source??'formioFormData', rules:{ required: true } });
    const [filling, setFilling] = useState(false);

    const onClick = (e)=>{
        e.preventDefault();
        formioForm.field.onChange( {duba:{ee:1, bb:2}} );
        //console.log(JSON.stringify(mref.current.builder.instance.schema))
    }

    const submit = (f) => {
        formioForm.field.onChange( f.data );
        setFilling(false);
    }

    var mref2 = React.createRef();
    //mref2.current?.formio?.on('change', (x)=>formioForm.field.onChange( x.data ))
    

    if (filling)
        return <><Form form={JSON.parse(data?.definition)} ref={mref2} onSubmit={submit} submission={{data:formioForm?.field.value}}/></>
    else 
    if (formioForm?.field.value)
        return (
            <>
                <button onClick={()=>setFilling(true)}>Alterar Formulário</button>
                <MyPdfDoc formData={formioForm?.field.value}></MyPdfDoc>
            </>
        )
    else return (<>{/*JSON.stringify(formContext?.getValues().formId)*/} <button onClick={()=>setFilling(true)}>Clique Aqui para Preencher o Formulário</button> </>)
}

const SelectForm = () => {
    const formContext = useFormContext();
    //const { data, isLoading, error } = useGetOne('forms', { id: formContext?.getValues().formId },{retry:false, staleTime:9999999});

	const { data, total, isLoading, error, refetch } = useGetList(
		'forms',
		{ pagination:{ page: 1, perPage: 100 }, sort: { field: 'id', order: 'ASC' }},
		{retry:false, staleTime:9999999}
	);

	if (isLoading || error)
		return <></>;

	return	<SelectInput source="formId" validate={required('Required field')} choices={
			data?.map(x=>({id:x.id, name: x.title}))
		} />;
		
}


const ProcessosNovo = () => {
    //const { data, isLoading, error } = useGetOne('forms', { id: /*record?.formId*/ 1 },{retry:false, staleTime:9999999});
    const { identity, isLoading: identityLoading } = useGetIdentity();

    

    const defaultValues = useMemo(
        () => ({
            //average_note: 0,
        }),
        []
    );


    const { permissions } = usePermissions();
    const dateDefaultValue = useMemo(() => new Date(), []);

    

    const [frmData, setFrmData] = useState(0);


    const [formioFormData, setFormioFormData] = useState({});

    //if (isLoading) { return <>LOADING</>; }
    //if (error) { return <p>ERROR</p>; }

	if (identityLoading) { return <>LOADING</>; }

    const transformFn = (data) => {
        console.log(data);

        //Alterar dados do formulário antes envio


        


		return {...data, /*tramites:[]*/}
    }



    return (
        <Create redirect="edit" transform={transformFn} resource="processos">
            
            <TabbedForm
                toolbar={<ProcessoCreateToolbar />}
                defaultValues={defaultValues}
            >
                <FormTab label="Informações Básicas">
				
                    <TextInput
                        autoFocus
                        fullWidth
                        source="numero"
                        validate={required('Required field')}
                    />


                    {false&&<ReferenceInput label="Post" source="formId" reference="forms" disabled>
                        <SelectInput optionText="title" disabled />
                    </ReferenceInput>}

                    <SelectForm></SelectForm>

                    <TextInput
                        autoFocus
                        fullWidth
                        source="solicitante.nome"
                        defaultValue={identity?.nome}
                        disabled
                        validate={required('Required field')}
                    />

                    <TextInput
                        autoFocus
                        fullWidth
                        source="solicitante.cpf"
                        defaultValue={identity?.cpf}
                        disabled
                        validate={required('Required field')}
                    />

                    <BooleanInput label="Estou pedindo para outra pessoa" source="procuracao" />

                    {true&&<FormDataConsumer>
                        {({ formData, ...rest }) => (
                            <>
                                <TextInput
                                    autoFocus
                                    fullWidth
                                    source="requerente.nome"
                                    defaultValue={identity?.nome}
                                    hidden = {!formData.procuracao}
                                    
                                    validate={required('Required field')}
                                />

                                <TextInput
                                    autoFocus
                                    fullWidth
                                    source="requerente.cpf"
                                    defaultValue={identity?.cpf}
                                    hidden = {!formData.procuracao}
                                    
                                    validate={required('Required field')}
                                />
                            </>)} 
                    </FormDataConsumer>}



        
                    <DateInput label="Data" source={`tramites[0].data`} validate={required()} defaultValue={dateDefaultValue}/>

                    <TextInput
                        autoFocus
                        fullWidth
                        source="tramites[1].autor.nome"
                        defaultValue={/*data.primeiroSetor*/ 'CRC'}
                    />

                    {permissions === 'admin' && (
                        <>Sou ADMIN</> 
                    )}

                </FormTab>


                <FormTab label="Formulário Inicial">

                            
                    <FormioFormField></FormioFormField>

                    

                </FormTab>
            </TabbedForm>
        </Create>
    );
};

const formioDataToPdfFormFields = (formioAllData) => {

    var arquivos;
    var addresses;
    
    arquivos = _.pickBy(formioAllData, _.isArray)
    arquivos = _.pickBy(arquivos, (x)=>x.length && x[0].storage==='base64')

    addresses = _.pickBy(formioAllData, _.isObject)
    addresses = _.pickBy(addresses, (address)=>address.place_id && address.display_name)

    _.omit(formioAllData, _.keys(arquivos))

    return _.mapValues(formioAllData, (x) => {
        if (_.isArray(x) && x.length && x[0].storage==='base64') {
            const arquivos = x;
            return x?.map(x=>`Arquivo ${x.fileType} do tipo '${x.type}'`).join('\n');


        }
        else if (_.isObject(x) && x.place_id && x.display_name) {
            const address = x;
            return address.display_name;
        } else {
            return x;
        }

    })
}

const formioDataToFiles = (formioAllData) => {

    var arquivos;
    
    arquivos = _.pickBy(formioAllData, _.isArray)
    arquivos = _.pickBy(arquivos, (x)=>x.length && x[0].storage==='base64')

    return _.flatten(_.map(arquivos, (v,k)=>v.map( vv => ({...vv, api:k}) )));
}


export default ProcessosNovo;