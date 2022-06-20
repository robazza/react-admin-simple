import * as React from 'react';
import inflection from 'inflection';
import { Card, CardContent } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOfferOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
 

const Icon = ({i}) => <i className={`fa ${i} fa-lg`} aria-hidden="true"/>


const ASide = () => {
    return (
        <Card
            sx={{
                display: { xs: 'none', md: 'block' },
                /*transform: 'translateX(-17px)',*/
                order: -1,
                width: '350px',
                mr: 2,
                alignSelf: 'flex-start',
            }}
        >
            <CardContent sx={{ pt: 1 }}>

                <div className="p_sidebar">
                    <div className="p_timeline">

                        <div className="p_timeline_left_component">
                        <span className="p_timeline_date">CONTRIBUINTE</span><br/>
                        <span className="p_timeline_date">30/10/2020</span><br/>
                        <span className="p_timeline_date">10:15</span><br/>
                        
                        </div>

                        <div className="p_timeline_middle">
                            <div className="p_timeline_point"></div>
                        </div>

                        <div className="p_timeline_component p_timeline_component_bg">
                            Pedido Inicial
                            <br/> <br/> 
                            <Icon  i="fa-file-pdf-o"/> Formulário Padrão <br/>
                            <Icon  i="fa-file-pdf-o"/> Documento de Identificação <br/>
                            <Icon  i="fa-file-pdf-o"/> Comprovante de Residência

                            
                        </div>


                        <div className="p_timeline_left_component">
                            <span className="p_timeline_date">CRC/SEFAZ</span><br/>
                            <span className="p_timeline_date">30/10/2020</span><br/>
                            <span className="p_timeline_date">10:15</span><br/>
                        </div>

                        <div className="p_timeline_middle">
                            <div className="p_timeline_point"></div>
                        </div>

                        <div className="p_timeline_component p_timeline_component_bg">
                            Tramite Interno
                            <br/> <br/> 
                            <Icon  i="fa-file-pdf-o"/> Despacho <br/>
                        </div>


                    </div>
                </div>


            </CardContent>
        </Card>
    );
};

export default ASide;