import * as React from 'react';
import { useMemo } from 'react';
import { RichTextInput } from 'ra-input-rich-text';
import { useController, useForm } from "react-hook-form";
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
    useRecordContext
} from 'react-admin';
import { useFormContext, useWatch } from 'react-hook-form';

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

const ProcessosCreate = () => {
    const defaultValues = useMemo(
        () => ({
            //average_note: 0,
        }),
        []
    );
    const { permissions } = usePermissions();
    const dateDefaultValue = useMemo(() => new Date(), []);

    const record = useRecordContext();

    const transformFn = (data) => {
        console.log(data);
        return {...data, tramites:[]}
    }

    return (
        <Create redirect="edit" transform={transformFn}>
            <SimpleForm
                toolbar={<ProcessoCreateToolbar />}
                defaultValues={defaultValues}
            >
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
            </SimpleForm>
        </Create>
    );
};

export default ProcessosCreate;