import * as React from 'react';
import {useState} from 'react';
import { RichTextInput } from 'ra-input-rich-text';
import {
    TopToolbar,
    AutocompleteInput,
    ArrayInput,
    BooleanInput,
    CheckboxGroupInput,
    Datagrid,
    DateField,
    DateInput,
    Edit,
    CloneButton,
    CreateButton,
    ShowButton,
    EditButton,
    FormTab,
    ImageField,
    ImageInput,
    NumberInput,
    ReferenceManyField,
    ReferenceInput,
    SelectInput,
    SimpleFormIterator,
    TabbedForm,
    TextField,
    TextInput,
    minValue,
    number,
    required,
    FormDataConsumer,
    useCreateSuggestionContext,
    EditActionsProps,
    usePermissions,
    useGetOne
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import {
    Box,
    BoxProps,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    TextField as MuiTextField,
} from '@mui/material';
import FormTitle from './FormTitle';
import TagReferenceInput from './TagReferenceInput';

import { EditForm } from "../formio/EditForm";
import { DisplayForm } from "../formio/DisplayForm";

import { MyPdfDoc } from "../pdfform/MyPdfDoc";

import { useWatch } from 'react-hook-form';

const CreateCategory = ({
    onAddChoice,
}: {
    onAddChoice: (record: any) => void;
}) => {
    const { filter, onCancel, onCreate } = useCreateSuggestionContext();
    const [value, setValue] = React.useState(filter || '');
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const choice = { name: value, id: value.toLowerCase() };
        onAddChoice(choice);
        onCreate(choice);
        setValue('');
        return false;
    };
    return (
        <Dialog open onClose={onCancel}>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <MuiTextField
                        label="New Category"
                        value={value}
                        onChange={event => setValue(event.target.value)}
                        autoFocus
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Save</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

const EditActions = ({ hasShow }: EditActionsProps) => (
    <TopToolbar>
        <CloneButton className="button-clone" />
        {hasShow && <ShowButton />}
        {/* FIXME: added because react-router HashHistory cannot block navigation induced by address bar changes */}
        <CreateButton />
    </TopToolbar>
);

const SanitizedBox = ({
    fullWidth,
    ...props
}: BoxProps & { fullWidth?: boolean }) => <Box {...props} />;

const categories = [
    { name: 'Tech', id: 'tech' },
    { name: 'Lifestyle', id: 'lifestyle' },
];

const FormEdit = () => {
    const { permissions } = usePermissions();
    const [frmData, setFrmData] = useState(0);

    return (
        <Edit title={<FormTitle />} actions={<EditActions />}>
            <TabbedForm
                defaultValues={{ average_note: 0 }}
                warnWhenUnsavedChanges
            >
                <FormTab label="Processo">

                    <TextInput  disabled fullWidth source="id" />
                    <TextInput
                        source="title"
                        label="Nome do Processo"
                        fullWidth
                        validate={required()}
                        resettable
                    />

                    <TextInput fullWidth source="primeiroSetor" label="Primeiro Setor" />

                    <RichTextInput
                        source="procedimento"
                        label=""
                        validate={required()}
                        fullWidth
                    />

                </FormTab>
                <FormTab label="Editar Formulário">
                    <SanitizedBox
                        display="flex"
                        flexDirection="column"
                        width="100%"
                        justifyContent="space-between"
                        fullWidth
                    >

                    <BooleanInput source="showDefinition" label="Mostrar JSON Formulário" />

                        <FormDataConsumer>
                            {({ formData, ...rest }) => formData.showDefinition &&
                                <TextInput
                                    multiline
                                    fullWidth
                                    source="definition"
                                    label="Nome do Processo"
                                    validate={required()}
                                    resettable
                                />
                            }
                        </FormDataConsumer>

                        <EditForm source="XXXX"/>
                    </SanitizedBox>
                </FormTab>
                

                <FormTab label="Testar Formulário">
                    <SanitizedBox
                            display="flex"
                            flexDirection="column"
                            width="100%"
                            justifyContent="space-between"
                            fullWidth
                        >
                        <FormDataConsumer>
                            {({ formData, ...rest }) => (
                                <DisplayForm definition={formData.definition} onSetFormData={setFrmData}/>
                            )}
                        </FormDataConsumer>
                        
                    </SanitizedBox>
                </FormTab>

                <FormTab label="PDF">
                    <SanitizedBox
                            display="flex"
                            flexDirection="column"
                            width="100%"
                            justifyContent="space-between"
                            fullWidth
                        >
                        <FormDataConsumer>
                            {({ formData, ...rest }) => (
                                <div>
                                    {true&&<MyPdfDoc formData={frmData}/>}

                                </div>
                            )}
                        </FormDataConsumer>
                        
                    </SanitizedBox>
                </FormTab>

                <FormTab label="API">
                    <SanitizedBox
                            display="flex"
                            flexDirection="column"
                            width="100%"
                            justifyContent="space-between"
                            fullWidth
                        >
                        <FormDataConsumer>
                            {({ formData, ...rest }) => (
                                <div>
                                    {JSON.stringify(frmData)}
                                </div>
                            )}
                        </FormDataConsumer>
                        
                    </SanitizedBox>
                </FormTab>

            </TabbedForm>
        </Edit>
    );
};

export default FormEdit;
