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
    useRecordContext,
    TabbedForm,
    FormTab,
    useGetOne
} from 'react-admin';
import { useFormContext, useWatch } from 'react-hook-form';

import { DisplayForm } from "../formio/DisplayForm";

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



const ProcessosNovo = () => {
    const defaultValues = useMemo(
        () => ({
            //average_note: 0,
        }),
        []
    );

    const formioDisplayRef = useRef();

    const { permissions } = usePermissions();
    const dateDefaultValue = useMemo(() => new Date(), []);

    const record = useRecordContext();

    const [frmData, setFrmData] = useState(0);


    console.log(formioDisplayRef);

    //console.log(record?.formId);
	const { data, isLoading, error } = useGetOne('forms', { id: /*record?.formId*/ 1 });


    const transformFn = (data) => {
        console.log(data);
        return {...data, tramites:[]}
    }

    return (
        <Create redirect="edit" transform={transformFn} resource="processo">
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

                    <TextInput
                        autoFocus
                        fullWidth
                        source="requerente.nome"
                        validate={required('Required field')}
                    />

                    <TextInput
                        autoFocus
                        fullWidth
                        source="requerente.cpf"
                        validate={required('Required field')}
                    />


                    <TextInput
                        autoFocus
                        fullWidth
                        source="solicitante.nome"
                        validate={required('Required field')}
                    />

                    <TextInput
                        autoFocus
                        fullWidth
                        source="solicitante.cpf"
                        validate={required('Required field')}
                    />

                    <FormDataConsumer>
                        {({ formData, ...rest }) => (
                            <>{formData?.requerente?.cpf}</>
                            
                        )} 
                    </FormDataConsumer>
        

                    {permissions === 'admin' && (
                        <>Sou ADMIN</> 
                    )}

                </FormTab>


                <FormTab label="Formulário Inicial">
                <TextInput
                        autoFocus
                        fullWidth
                        source="numero"
                        validate={required('Required field')}


                        

                    />

                <DisplayForm ref={formioDisplayRef} definition={data?.definition} onSetFormData={setFrmData}/>

                </FormTab>
            </TabbedForm>
        </Create>
    );
};

const processFormioData = (formioAllData) => {

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

export default ProcessosNovo;