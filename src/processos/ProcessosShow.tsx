import * as React from "react";
import { Edit, Show, SimpleForm, TextInput, DateInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton, required, useRecordContext, useGetOne } from 'react-admin';
import { Box, Chip, useMediaQuery, Theme } from '@mui/material';

import _ from 'lodash';

import './processos.css';

import {
    Typography,
    Card,
    CardContent,
    Link,
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

const ProcessoTitle = () => {
    const record = useRecordContext();
	const { data, isLoading, error } = useGetOne('forms', { id: 1 });
	
    return (
        <span>
            Processo - {data?.title} - {record?.numero}
        </span>
    );
};

const ProcessosShow = () => (
    <Edit component="div" title={<ProcessoTitle/>}  className="XXXE" sx={{backgroundColor: 'inherit', height: '100%', width: '100%', 
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

const Visao3 = () => {
    const [doc, setDoc] = React.useState({});

    const NoHeader=()=>(<>{doc?.nome}</>);
    

    return (
        <Box style={{display:"flex", flexDirection: 'row', width: '100%', height: '100%', justifyContent:'flex-start', padding: '1em 0em 1em 0em', gap: '1em'}} className="XXBOX"> 
            
            <Box  style={{ flex:'flex: 1 1 auto', alignItems: 'stretch', height: '100%',  width: '350px', borderRadius: '0.5em'  }}>
                <TimelineMaterial setDoc={setDoc}/>
            </Box>
            
            <Card variant="outlined" style={{ flex:'flex: 1 1 auto', alignItems: 'stretch', height: '100%', width: '100%', borderRadius: '0.5em' }}>
                {false && JSON.stringify(doc)}
                {true && <DocViewer  config={{header:{overrideComponent: NoHeader}}} style={{maxWidth: 'calc(100vw - 500px)', maxHeight: 'calc(100vh - 100px)'}} pluginRenderers={DocViewerRenderers} documents={doc} />}

            </Card>
        </Box>
    )
}


export default ProcessosShow;

const Icon = ({i}) => <i className={`fa ${i} fa-lg`} aria-hidden="true"/>

const TimelineMaterial = ({setDoc}) => {
    const record = useRecordContext();
	
	
    const {tramites} = record; 

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
                    
                    
                                {event.conteudo.map(arquivo => (
                                    <div onClick={(e)=>{e.preventDefault(); setDoc([{uri:(arquivo.dataPrefix??'')+arquivo.data, nome: arquivo.nome}])}}><Icon  i="fa-file-pdf-o"/> {arquivo.nome} <br/></div>
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