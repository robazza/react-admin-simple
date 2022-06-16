import * as React from 'react';
import { useGetList } from 'react-admin';

import { FormBuilder } from "react-formio";

import BookIcon from '@mui/icons-material/Book';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import './processos.css';

const Icon = ({i}) => <i className={`fa ${i} fa-lg`} aria-hidden="true"/>

export const ProcessoShow = ({ title = 'Posts' }) => {
    const { isLoading, total } = useGetList('posts', {
        pagination: { page: 0, perPage: 10 },
        sort: { field: 'id', order: 'ASC' },
    });

    /* list-page css-127wpz9-RaList-root */
    return (
        <div className=""> 
        <div className="p_container">
            <div className="p_sidebar">
                <div className="p_timeline">

                    <div className="p_timeline_left_component">
                    <span className="p_timeline_date">30/10/2020</span><br/>
                    <span className="p_timeline_date">10:15</span><br/>
                    
                    
                    
                    </div>

                    <div className="p_timeline_middle">
                        <div className="p_timeline_point"></div>
                    </div>

                    <div className="p_timeline_component p_timeline_component_bg">
                        Pedido Inicial
                        <br/> 
                        <Icon  i="fa-file-pdf-o"/> Formulário Padrão <br/>
                        <Icon  i="fa-file-pdf-o"/> Documento de Identificação

                           
                    </div>


                    <div className="p_timeline_left_component">
                        <div className="p_timeline_date p_timeline_right">30 agosto 2017</div>
                    </div>

                    <div className="p_timeline_middle">
                        <div className="p_timeline_point"></div>
                    </div>

                    <div className="p_timeline_component p_timeline_component_bg">
                        XXXXXXXXXX
                    </div>


                </div>
            </div>

            <div className="p_main">
              <FormBuilder form={{ display: "form" }}></FormBuilder>
            </div>
        </div>
        </div>
    );
};
