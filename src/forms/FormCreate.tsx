import * as React from 'react';
import { useMemo } from 'react';
import { RichTextInput } from 'ra-input-rich-text';
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
} from 'react-admin';
import { useFormContext, useWatch } from 'react-hook-form';

const FormCreateToolbar = props => {
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
                        redirect('edit', 'forms', data.id);
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



const FormCreate = () => {
    const defaultValues = useMemo(
        () => ({
            //average_note: 0,
        }),
        []
    );
    const { permissions } = usePermissions();
    const dateDefaultValue = useMemo(() => new Date(), []);
    return (
        <Create redirect="edit">
            <SimpleForm
                toolbar={<FormCreateToolbar />}
                defaultValues={defaultValues}
            >
                <TextInput
                    autoFocus
                    fullWidth
                    source="title"
                    validate={required('Required field')}
                />

                <TextInput
                    autoFocus
                    fullWidth
                    source="definition"
                    defaultValue="{}"
                    hidden
                />

                {permissions === 'admin' && (
                    <>Sou ADMIN</>
                )}
            </SimpleForm>
        </Create>
    );
};

export default FormCreate;

const DependantInput = ({
    dependency,
    children,
}: {
    dependency: string;
    children: JSX.Element;
}) => {
    const dependencyValue = useWatch({ name: dependency });

    return dependencyValue ? children : null;
};
