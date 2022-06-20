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

const docs = [
    { uri: 'data:application/pdf;base64,JVBERi0xLjMKJf////8KOSAwIG9iago8PAovVHlwZSAvRXh0R1N0YXRlCi9jYSAxCj4+CmVuZG9iago4IDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL01lZGlhQm94IFswIDAgNTk1LjI4MDAyOSA4NDEuODkwMDE1XQovQ29udGVudHMgNiAwIFIKL1Jlc291cmNlcyA3IDAgUgovVXNlclVuaXQgMQo+PgplbmRvYmoKNyAwIG9iago8PAovUHJvY1NldCBbL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSV0KL0V4dEdTdGF0ZSA8PAovR3MxIDkgMCBSCj4+Ci9Gb250IDw8Ci9GMSAxMCAwIFIKPj4KPj4KZW5kb2JqCjEyIDAgb2JqCihyZWFjdC1wZGYpCmVuZG9iagoxMyAwIG9iagoocmVhY3QtcGRmKQplbmRvYmoKMTQgMCBvYmoKKEQ6MjAyMjA2MTYyMjIyMzlaKQplbmRvYmoKMTEgMCBvYmoKPDwKL1Byb2R1Y2VyIDEyIDAgUgovQ3JlYXRvciAxMyAwIFIKL0NyZWF0aW9uRGF0ZSAxNCAwIFIKPj4KZW5kb2JqCjEwIDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwo+PgplbmRvYmoKNCAwIG9iago8PAo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMSAwIFIKL05hbWVzIDIgMCBSCi9WaWV3ZXJQcmVmZXJlbmNlcyA1IDAgUgo+PgplbmRvYmoKMSAwIG9iago8PAovVHlwZSAvUGFnZXMKL0NvdW50IDEKL0tpZHMgWzggMCBSXQo+PgplbmRvYmoKMiAwIG9iago8PAovRGVzdHMgPDwKICAvTmFtZXMgWwpdCj4+Cj4+CmVuZG9iago1IDAgb2JqCjw8Ci9EaXNwbGF5RG9jVGl0bGUgdHJ1ZQo+PgplbmRvYmoKNiAwIG9iago8PAovTGVuZ3RoIDYxMgovRmlsdGVyIC9GbGF0ZURlY29kZQo+PgpzdHJlYW0KeJzNVs1q3DAQvusp9ALrSNY/hD0kbQM9FLZr6CHkpHjbQBwIC+3rd2xtbMkr2WIXlVrG1vfZMyPNjDSimEDbUHhoTittCKEC2w69Q6PDR/c8Ue+ICQx3h4QkVa0JqU2PX2d4CdngXzmTPcdLyCJ4DDLu7d92GOvwTbgxurd/W/QL/cBvqDaqknyYvNftRsmF2fY9AhcF2ilzZruouWvcdvOp/f1i2+8Pd/h+j0iluCHUSKI0Z5QphvOo/f03VOM/aI8enyCyz2jnwjpNpFv0WO9dMXo84XkZ+CWAaXAuJ9IwDewUh9mc8qSXJl8uBjtvxZ2shcuwb+MypEJBbjBjFHzrfFjzyWFROp+0oEDG9U40W6HzycAcCfURnAYROZWEafCRNkrD+qfGaLwRvOKum+Pi3hYZnk5ROkbLwygVzJL7R9RkB+7wZ+CjVN/2f7FAJoFSfVswPVVcb5l4XZKOc4dHs9GP0NWjvCTEs0wcNriVLdE7hHxQUCEdNf1DSaV7zjNgjycDR/uGbh6OFP88gsykO3L6uWs8nd6nBjR/AU/UuDmgx1tuZCvlFjOCb+VB1Vu8qQV0nyVtVcvkYYvJE26+os8N2BuHbSojuZtOZIa7sbmdXvSOUwauYRfxoO/3KJ1PwsGkz+iY3olmK3Q+GZgjoT6C0yAix5MwDcYDAoftTbu1RSEs9bCy1j0cqTFOYTpWy8MpFdSSO37UZMmTyOreu0bnk7Zg3vO43jIJcEGe551zzvLdz4Grh/2PTkA5dSc8m/1nBUhAyelrj1BMEahATHFJ40WHVFLrjKLjt7/O3TDKCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDE1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDY4MSAwMDAwMCBuIAowMDAwMDAwNzM4IDAwMDAwIG4gCjAwMDAwMDA1OTQgMDAwMDAgbiAKMDAwMDAwMDU3MyAwMDAwMCBuIAowMDAwMDAwNzg1IDAwMDAwIG4gCjAwMDAwMDA4MjggMDAwMDAgbiAKMDAwMDAwMDE4OSAwMDAwMCBuIAowMDAwMDAwMDU5IDAwMDAwIG4gCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDQ3NSAwMDAwMCBuIAowMDAwMDAwMzk5IDAwMDAwIG4gCjAwMDAwMDAzMDcgMDAwMDAgbiAKMDAwMDAwMDMzNSAwMDAwMCBuIAowMDAwMDAwMzYzIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgMTUKL1Jvb3QgMyAwIFIKL0luZm8gMTEgMCBSCj4+CnN0YXJ0eHJlZgoxNTEyCiUlRU9GCg==' , name:'eee'},
    { uri: 'data:application/pdf;base64,JVBERi0xLjMKJf////8KOSAwIG9iago8PAovVHlwZSAvRXh0R1N0YXRlCi9jYSAxCj4+CmVuZG9iago4IDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL01lZGlhQm94IFswIDAgNTk1LjI4MDAyOSA4NDEuODkwMDE1XQovQ29udGVudHMgNiAwIFIKL1Jlc291cmNlcyA3IDAgUgovVXNlclVuaXQgMQo+PgplbmRvYmoKNyAwIG9iago8PAovUHJvY1NldCBbL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSV0KL0V4dEdTdGF0ZSA8PAovR3MxIDkgMCBSCj4+Ci9Gb250IDw8Ci9GMSAxMCAwIFIKPj4KPj4KZW5kb2JqCjEyIDAgb2JqCihyZWFjdC1wZGYpCmVuZG9iagoxMyAwIG9iagoocmVhY3QtcGRmKQplbmRvYmoKMTQgMCBvYmoKKEQ6MjAyMjA2MTYyMjIyMzlaKQplbmRvYmoKMTEgMCBvYmoKPDwKL1Byb2R1Y2VyIDEyIDAgUgovQ3JlYXRvciAxMyAwIFIKL0NyZWF0aW9uRGF0ZSAxNCAwIFIKPj4KZW5kb2JqCjEwIDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwo+PgplbmRvYmoKNCAwIG9iago8PAo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMSAwIFIKL05hbWVzIDIgMCBSCi9WaWV3ZXJQcmVmZXJlbmNlcyA1IDAgUgo+PgplbmRvYmoKMSAwIG9iago8PAovVHlwZSAvUGFnZXMKL0NvdW50IDEKL0tpZHMgWzggMCBSXQo+PgplbmRvYmoKMiAwIG9iago8PAovRGVzdHMgPDwKICAvTmFtZXMgWwpdCj4+Cj4+CmVuZG9iago1IDAgb2JqCjw8Ci9EaXNwbGF5RG9jVGl0bGUgdHJ1ZQo+PgplbmRvYmoKNiAwIG9iago8PAovTGVuZ3RoIDYxMgovRmlsdGVyIC9GbGF0ZURlY29kZQo+PgpzdHJlYW0KeJzNVs1q3DAQvusp9ALrSNY/hD0kbQM9FLZr6CHkpHjbQBwIC+3rd2xtbMkr2WIXlVrG1vfZMyPNjDSimEDbUHhoTittCKEC2w69Q6PDR/c8Ue+ICQx3h4QkVa0JqU2PX2d4CdngXzmTPcdLyCJ4DDLu7d92GOvwTbgxurd/W/QL/cBvqDaqknyYvNftRsmF2fY9AhcF2ilzZruouWvcdvOp/f1i2+8Pd/h+j0iluCHUSKI0Z5QphvOo/f03VOM/aI8enyCyz2jnwjpNpFv0WO9dMXo84XkZ+CWAaXAuJ9IwDewUh9mc8qSXJl8uBjtvxZ2shcuwb+MypEJBbjBjFHzrfFjzyWFROp+0oEDG9U40W6HzycAcCfURnAYROZWEafCRNkrD+qfGaLwRvOKum+Pi3hYZnk5ROkbLwygVzJL7R9RkB+7wZ+CjVN/2f7FAJoFSfVswPVVcb5l4XZKOc4dHs9GP0NWjvCTEs0wcNriVLdE7hHxQUCEdNf1DSaV7zjNgjycDR/uGbh6OFP88gsykO3L6uWs8nd6nBjR/AU/UuDmgx1tuZCvlFjOCb+VB1Vu8qQV0nyVtVcvkYYvJE26+os8N2BuHbSojuZtOZIa7sbmdXvSOUwauYRfxoO/3KJ1PwsGkz+iY3olmK3Q+GZgjoT6C0yAix5MwDcYDAoftTbu1RSEs9bCy1j0cqTFOYTpWy8MpFdSSO37UZMmTyOreu0bnk7Zg3vO43jIJcEGe551zzvLdz4Grh/2PTkA5dSc8m/1nBUhAyelrj1BMEahATHFJ40WHVFLrjKLjt7/O3TDKCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDE1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDY4MSAwMDAwMCBuIAowMDAwMDAwNzM4IDAwMDAwIG4gCjAwMDAwMDA1OTQgMDAwMDAgbiAKMDAwMDAwMDU3MyAwMDAwMCBuIAowMDAwMDAwNzg1IDAwMDAwIG4gCjAwMDAwMDA4MjggMDAwMDAgbiAKMDAwMDAwMDE4OSAwMDAwMCBuIAowMDAwMDAwMDU5IDAwMDAwIG4gCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDQ3NSAwMDAwMCBuIAowMDAwMDAwMzk5IDAwMDAwIG4gCjAwMDAwMDAzMDcgMDAwMDAgbiAKMDAwMDAwMDMzNSAwMDAwMCBuIAowMDAwMDAwMzYzIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgMTUKL1Jvb3QgMyAwIFIKL0luZm8gMTEgMCBSCj4+CnN0YXJ0eHJlZgoxNTEyCiUlRU9GCg==' }
  ];

const ProcessoTitle = () => {
    const record = useRecordContext();
	const { data, isLoading, error } = useGetOne('forms', { id: 1 });
	
    return (
        <span>
            Processo - {data?.title} - {record?.numero}
        </span>
    );
};

const ProcessosEdit = () => (
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

const Visao2 =  () => {
    const record = useRecordContext();
    console.log(record)

    return (
        <>
                <div style={{ display:"flex"}}>
                    <div className="xp_sidebar"><TimelineMaterial /></div>
                
                    <div style={{width:'calc(100% - 16em)'}}>
                        {false && <DocViewer  config={{}} style={{maxWidth: 'calc(100vw - 500px)'}} pluginRenderers={DocViewerRenderers} documents={docs} />}
                    </div>
                </div>
        </>  
    )
};


const Visao1 =  () => (
    <>
            <Box display="flex" style={{transform: 'translateX(-17px)'}}>
                <ASide />
                <Box width={'calc(100% - 350px)'} >
                    {true && <DocViewer  config={{}} style={{maxWidth: 'calc(100vw - 500px)'}} pluginRenderers={DocViewerRenderers} documents={docs} />}
                    {false && (<SimpleForm>
                        <TextInput disabled label="Id" source="id" />
                        <TextInput source="title" validate={required()} />
                        <TextInput multiline source="teaser" validate={required()} />
                    
                        <DateInput label="Publication date" source="published_at" />
                    </SimpleForm>)}
                </Box>
            </Box>


    </>
);



export default ProcessosEdit;

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
                                    <div onClick={(e)=>{e.preventDefault(); setDoc([{uri:arquivo.data, nome: arquivo.nome}])}}><Icon  i="fa-file-pdf-o"/> {arquivo.nome} <br/></div>
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
								<div onClick={(e)=>{e.preventDefault(); setDoc([{uri:arquivo.data, nome: arquivo.nome}])}}><Icon  i="fa-file-pdf-o"/> {arquivo.nome} <br/></div>
							))}
						</div>
					</>
				))}

			</div>
		</>
	)
}