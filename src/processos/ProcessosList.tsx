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
    FunctionField,
    useTranslate,
} from 'react-admin'; // eslint-disable-line import/no-unresolved


export const PostIcon = BookIcon;

const QuickFilter = ({ label, source, defaultValue }) => {
    const translate = useTranslate();
    return <Chip sx={{ marginBottom: 1 }} label={translate(label)} />;
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



const PostListActionToolbar = ({ children, ...props }) => (
    <Box sx={{ alignItems: 'center', display: 'flex' }}>{children}</Box>
);




const ProcessosList = () => {
    
    return (
        <List
            sort={{ field: 'published_at', order: 'DESC' }}
        >
            
                <StyledDatagrid
                    
                    optimized
                >
                    <TextField source="id" />
                    <TextField source="numero" />

                    <FunctionField  label="Requerente" render={record => `${record.requerente.nome} ${record.requerente.cpf}`} />
                    <FunctionField  label="Solicitante" render={record => `${record.solicitante.nome} ${record.solicitante.cpf}`} />
 
                    <PostListActionToolbar>
                        <EditButton />
                        <ShowButton />
                    </PostListActionToolbar>
                </StyledDatagrid>
            
        </List>
    );
};

const tagSort = { field: 'name.en', order: 'ASC' };

export default ProcessosList;
