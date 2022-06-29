import * as React from 'react';
import inflection from 'inflection';
import { Card, CardContent } from '@mui/material';
import {useRecordContext, useGetOne} from "react-admin";
import LocalOfferIcon from '@mui/icons-material/LocalOfferOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
 

const Icon = ({i}) => <i className={`fa ${i} fa-lg`} aria-hidden="true"/>


const ASide = () => {
    const record = useRecordContext();
    //console.log(record?.formId);
	const { data, isLoading, error } = record ? useGetOne('forms', { id: record?.formId }):{};

    return (
        <Card
            sx={{
                //display: { xs: 'none', md: 'block' },
                /*transform: 'translateX(-17px)',*/
                //order: -1,
                width: '250px',
                //mr: 2,
                //alignSelf: 'flex-start',
                margin: '20px',
            }}
        >
            <CardContent sx={{ pt: 1 }}>

                Guia de Procedimentos {data?.title}

                <br/><br/>

                <div dangerouslySetInnerHTML={{__html:data?.procedimento}} /> 

            </CardContent>
        </Card>
    );
};

export default ASide;