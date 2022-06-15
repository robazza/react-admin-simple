import * as React from 'react';
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

    return (
        <Edit title={<FormTitle />} actions={<EditActions />}>
            <TabbedForm
                defaultValues={{ average_note: 0 }}
                warnWhenUnsavedChanges
            >
                <FormTab label="post.form.summary">

                    <TextInput  disabled fullWidth source="id" />
                    <TextInput
                        source="title"
                        fullWidth
                        validate={required()}
                        resettable
                    />

                    <TextInput
                        multiline
                        fullWidth
                        source="definition"
                        validate={required()}
                        resettable
                    />
                    <CheckboxGroupInput
                        source="notifications"
                        fullWidth
                        choices={[
                            { id: 12, name: 'Ray Hakt' },
                            { id: 31, name: 'Ann Gullar' },
                            { id: 42, name: 'Sean Phonee' },
                        ]}
                    />
                    <RichTextInput
                        source="body"
                        label=""
                        validate={required()}
                        fullWidth
                    />
                </FormTab>
                <FormTab label="Form">
                    <SanitizedBox
                        display="flex"
                        flexDirection="column"
                        width="100%"
                        justifyContent="space-between"
                        fullWidth
                    >
                        <TextInput
                            multiline
                            fullWidth
                            source="definition"
                            validate={required()}
                            resettable
                        />
                        <EditForm source="definition"/>
                    </SanitizedBox>
                </FormTab>
                

                <FormTab label="Form">
                <SanitizedBox
                        display="flex"
                        flexDirection="column"
                        width="100%"
                        justifyContent="space-between"
                        fullWidth
                    >
                    <FormDataConsumer>
                        {({ formData, ...rest }) => (
                            <DisplayForm definition={formData.definition}/>
                        )}
                    </FormDataConsumer>
                    
                    </SanitizedBox>
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};

export default FormEdit;
