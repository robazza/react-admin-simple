import * as React from "react";
import { Edit, Show, SimpleForm, TextInput, DateInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton, required, useRecordContext, 
    useGetOne, usePermissions, TabbedForm, FormTab, Link, FileInput, FileField, SelectInput, FormDataConsumer, } from 'react-admin';
import { Box, Chip, useMediaQuery, Theme } from '@mui/material';

import { useNavigate } from "react-router-dom";

import { RichTextInput } from 'ra-input-rich-text';

import _ from 'lodash';

import './processos.css';

import {
    Typography,
    Card,
    CardContent,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Grid,
} from '@mui/material';

import AccessTimeIcon from '@mui/icons-material/AccessTime';

import ASide from './ASide';

import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { setDocumentLoading } from "react-doc-viewer/build/state/actions";

import { MyPdfDoc } from "../pdfform/MyPdfDoc";

const ProcessoTitle = () => {
    const record = useRecordContext();
    //console.log(record?.formId);
	const { data, isLoading, error } = record ? useGetOne('forms', { id: record?.formId }):{};
	
    return (
        <span>
            Processo - {data?.title} - {record?.numero}
        </span>
    );
};

const ProcessosEdit = () => (
    <Edit aside={<ASide></ASide>} component="div" title={<ProcessoTitle/>}  sx={{backgroundColor: 'inherit', height: '100%', width: '100%', 
    '& .RaEdit-main': {
        height: '100%',
        marginTop: '0'
    },
    '& .RaEdit-noActions': {
        height: '100%',
    } ,
    '& .RaEdit-card': {
        height: '100%',
    } 
    }}>
        <Visao3/>
    </Edit>
);

const SanitizedBox = ({
    fullWidth,
    ...props
}: BoxProps & { fullWidth?: boolean }) => <Box {...props} />;

const Visao3 = () => {
    const { permissions } = usePermissions();
    const record = useRecordContext();
    const [doc, setDoc] = React.useState([]);

	//const formModel = record ? useGetOne('forms', { id: record?.formId },{retry:false, staleTime:9999999}):{};

    const NoHeader=()=>(<>{doc?.nome}</>);

    if (record.tramites.length == 0) {
        record.tramites=[];
        record.tramites[0] = {};
        record.tramites[0].autor = {nome:'CONTRIBUINTE', cpf:'123.456.789-88'};
    }

    

    const tramiteAtual = record.tramites.length-1;
    const proximoTramite = record.tramites.length;

    console.log(_.isArray(doc));

    return (
        <Box style={{display:"flex", flexDirection: 'row', width: '100%', height: '100%', justifyContent:'flex-start', padding: '1em 0em 1em 0em', gap: '1em'}} className="XXBOX"> 
            
            <Box  style={{ flex:'flex: 1 1 auto', alignItems: 'stretch', height: '100%',  width: '350px', borderRadius: '0.5em'  }}>
                <TimelineMaterial setDoc={setDoc}/>
            </Box>
            
            <Card variant="outlined" style={{ flex:'flex: 1 1 auto', alignItems: 'stretch', height: '100%', width: '100%', borderRadius: '0.5em' }}>
                <CardContent> 
                    <TabbedForm defaultValues={{ average_note: 0 }} warnWhenUnsavedChanges >
                        <FormTab label="Novo Despacho">
                            <div style={{display: 'flex', padding: '1em 0em 1em 0em', gap: '1em'}}>

                            <DateInput label="Data" source={`tramites[${tramiteAtual}].data`} validate={required()} />
                            <TextInput label="Próximo Setor" source={`tramites[${proximoTramite}].autor.nome`} validate={required()} defaultValue="Fufufufufu" />
                            <TextInput source={`tramites[${proximoTramite}].autor.cpf`} validate={required()} defaultValue="000.123.456-78" />
                            
                            </div>

                            <SelectInput source={`tramites[${tramiteAtual}].conteudo[0].nome`} fullWidth validate={required()} defaultValue={"Despacho"}  label="Tipo de Documento" choices={[
                                { id: 'Despacho', name: 'Despacho' },
                                { id: 'Decisao', name: 'Decisão' }
                            ]} />

                            <TextInput source={`tramites[${tramiteAtual}].conteudo[0].dataPrefix`} validate={required()} defaultValue="data:text/html;charset=utf-8," fullWidth hidden />
                            
                            <RichTextInput
                                source={`tramites[${tramiteAtual}].conteudo[0].data`}
                                label="Conteúdo"
                                validate={required()}
                                fullWidth
                            />

                            <FileInput source="files" label="Anexos" multiple="true" accept="application/pdf">
                                <FileField source="src" title="title"/>
                            </FileInput>

                        </FormTab>

                        <FormTab label="Documentos">
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
                                            {_.isString(doc)&&<MyPdfDoc formData={formData.formioFormData} formId={formData.formId}/>}
                                        </div>
                                    )}
                                </FormDataConsumer>
                            </SanitizedBox>
                        <div style={{display: _.isString(doc)?'none':'block'}}>
                            {<DocViewer  config={{header:{overrideComponent: NoHeader}}} style={{maxWidth: 'calc(100vw - 500px)', maxHeight: 'calc(100vh - 100px)'}} pluginRenderers={DocViewerRenderers} documents={doc} />}
                        </div>
                        

                        
                        </FormTab>
                    </TabbedForm>
                </CardContent>
            </Card>
        </Box>
    )
}


export default ProcessosEdit;

const Icon = ({i}) => <i className={`fa ${i} fa-lg`} aria-hidden="true"/>

const TimelineMaterial = ({setDoc}) => {
    const record = useRecordContext();
	
    const {tramites, formioFormData} = record; 

    
    

    //formioDataToFiles(formioFormData)

    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Processo {record.numero}
                    </Typography>
                    <Grid container rowSpacing={1} columnSpacing={1}>
                        <Grid item xs={12} display="flex" gap={1}>
                            <AccessTimeIcon fontSize="small" color="disabled" />
                            <Box flexGrow={1}>
                                <Typography variant="body2">
                                {record.requerente.nome}
                                </Typography>
                                
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            
            <Card sx={{margin: "1em 0 0 0", padding:"0 0 1em 0"}}>

                    <Stepper orientation="vertical" sx={{ mt: 1 }}>
                        {tramites.map((event,i) => (
                            <Step
                                key={`XXX-${i}`}
                                expanded
                                active
                                completed
                            >
                                <StepLabel
                                    icon={
                                            <AccessTimeIcon
                                                color="disabled"
                                                sx={{ pl: 0.5, fontSize: '1.25rem' }}
                                            />
                                    }
                                >
                                    <DateField record={event} source="data" />
                                    {` por ${event?.autor?.nome}`} <br />
                    
                                </StepLabel>
                                <StepContent>
                    
                                {i==0 && formioFormData ? <Link to="1" onClick={(e)=>{setDoc('Formulário Padrão')}}><Icon  i="fa-file-pdf-o"/> Formulário Padrão <br/></Link> : <></>}
                    
                                {i==0 && formioDataToFiles(formioFormData)?.map(arquivo => (
                                    <Link to="1" onClick={(e)=>{setDoc([{uri:arquivo.url, nome: arquivo.name}])}}><Icon  i="fa-file-pdf-o"/> {arquivo.name} <br/></Link>
                                ))}                   

                                {event.conteudo?.map(arquivo => (
                                    <Link to="1" onClick={(e)=>{setDoc([{uri:(arquivo.dataPrefix??'')+arquivo.data, nome: arquivo.nome}])}}><Icon  i="fa-file-pdf-o"/> {arquivo.nome} <br/></Link>
                                ))}

                                </StepContent>
                            </Step>
                        ))}

                    <Step
                                key={`XXX-${event}`}
                                expanded
                                active
                                completed
                            />
                    </Stepper>
                

            </Card>
        </div>
    )

}

const Timeline = ({setDoc}) => {
    const record = useRecordContext();
    const {tramites} = record; 
	
	return (
		<>
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Processo {record.numero}
                    </Typography>
                    <Grid container rowSpacing={1} columnSpacing={1}>
                        <Grid item xs={12} display="flex" gap={1}>
                            <AccessTimeIcon fontSize="small" color="disabled" />
                            <Box flexGrow={1}>
                                <Typography variant="body2">
                                {record.requerente.nome}
                                </Typography>
                                
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
		
		
			<div className="p_timeline">
				{tramites.map((tramite,i) => (
					<>
						<div className="p_timeline_left_component">
							<span className="p_timeline_date">{` por ${tramite?.autor?.nome}`}</span><br/>
							<span className="p_timeline_date">30/10/2020</span><br/>
							às <DateField record={tramite} source="data" />
						
						</div>

						<div className="p_timeline_middle">
							<div className="p_timeline_point"></div>
						</div>

						<div className="p_timeline_component p_timeline_component_bg">
							Tramite {i+1}
							<br/> <br/> 
							{tramite.conteudo.map(arquivo => (
								<div onClick={(e)=>{e.preventDefault(); setDoc([{uri:(arquivo.dataPrefix??'')+arquivo.data, nome: arquivo.nome}])}}><Icon  i="fa-file-pdf-o"/> {arquivo.nome} <br/></div>
							))}
						</div>
					</>
				))}

			</div>
		</>
	)
}

const formioDataToFiles = (formioAllData) => {

    var arquivos;
    
    arquivos = _.pickBy(formioAllData, _.isArray)
    arquivos = _.pickBy(arquivos, (x)=>x.length && x[0].storage==='base64')

    return _.flatten(_.map(arquivos, (v,k)=>v.map( vv => ({...vv, api:k}) )));
}