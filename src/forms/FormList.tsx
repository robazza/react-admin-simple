import * as React from 'react';
import { Fragment, memo } from 'react';
import BookIcon from '@mui/icons-material/Book';
import { Box, Chip, useMediaQuery } from '@mui/material';
import { Theme, styled } from '@mui/material/styles';
import lodashGet from 'lodash/get';
import jsonExport from 'jsonexport/dist';
import {
    BooleanField,
    BulkDeleteButton,
    BulkExportButton,
    ChipField,
    Datagrid,
    DateField,
    downloadCSV,
    EditButton,
    List,
    NumberField,
    ReferenceArrayField,
    SearchInput,
    ShowButton,
    SimpleList,
    SingleFieldList,
    TextField,
    TextInput,
    useTranslate,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

import ResetViewsButton from './ResetViewsButton';
export const PostIcon = BookIcon;

const QuickFilter = ({ label, source, defaultValue }) => {
    const translate = useTranslate();
    return <Chip sx={{ marginBottom: 1 }} label={translate(label)} />;
};

const postFilter = [
    <SearchInput source="q" alwaysOn />,
    <TextInput source="title" defaultValue="Qui tempore rerum et voluptates" />,
    <QuickFilter
        label="resources.posts.fields.commentable"
        source="commentable"
        defaultValue
    />,
];

const exporter = posts => {
    const data = posts.map(post => ({
        ...post
    }));
    return jsonExport(data, (err, csv) => downloadCSV(csv, 'posts'));
};

const StyledDatagrid = styled(Datagrid)(({ theme }) => ({
    '& .title': {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    '& .hiddenOnSmallScreens': {
        [theme.breakpoints.down('lg')]: {
            display: 'none',
        },
    },
    '& .column-tags': {
        minWidth: '9em',
    },
    '& .publishedAt': { fontStyle: 'italic' },
}));

const FormListBulkActions = memo(({ children, ...props }) => (
    <Fragment>
        <ResetViewsButton {...props} />
        <BulkDeleteButton {...props} />
        <BulkExportButton {...props} />
    </Fragment>
));

const FormListActionToolbar = ({ children, ...props }) => (
    <Box sx={{ alignItems: 'center', display: 'flex' }}>{children}</Box>
);

const rowClick = (id, resource, record) => {

    //return 'show';
    

    return 'edit';
};

const PostPanel = ({ id, record, resource }) => (
    <div dangerouslySetInnerHTML={{ __html: record.body }} />
);

const FormList = () => {
    
    return (
        <List
            filters={postFilter}
            sort={{ field: 'published_at', order: 'DESC' }}
            exporter={exporter}
        >
            
                <StyledDatagrid
                    bulkActionButtons={<FormListBulkActions />}
                    rowClick={rowClick}
                    expand={PostPanel}
                    optimized
                >
                    <TextField source="id" />
                    <TextField source="title" cellClassName="title" />
                    
                    <FormListActionToolbar>
                        <EditButton />
                        {false && <ShowButton />}
                    </FormListActionToolbar>
                </StyledDatagrid>
        
        </List>
    );
};

const tagSort = { field: 'name.en', order: 'ASC' };

export default FormList;
