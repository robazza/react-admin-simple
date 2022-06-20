import * as React from 'react';
import { useGetList } from 'react-admin';

import { FormBuilder } from "react-formio";

import BookIcon from '@mui/icons-material/Book';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { Document, Page } from 'react-pdf';

import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;






const Icon = ({i}) => <i className={`fa ${i} fa-lg`} aria-hidden="true"/>

const docs = [
    { uri: 'data:application/pdf;base64,JVBERi0xLjMKJf////8KOSAwIG9iago8PAovVHlwZSAvRXh0R1N0YXRlCi9jYSAxCj4+CmVuZG9iago4IDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL01lZGlhQm94IFswIDAgNTk1LjI4MDAyOSA4NDEuODkwMDE1XQovQ29udGVudHMgNiAwIFIKL1Jlc291cmNlcyA3IDAgUgovVXNlclVuaXQgMQo+PgplbmRvYmoKNyAwIG9iago8PAovUHJvY1NldCBbL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSV0KL0V4dEdTdGF0ZSA8PAovR3MxIDkgMCBSCj4+Ci9Gb250IDw8Ci9GMSAxMCAwIFIKPj4KPj4KZW5kb2JqCjEyIDAgb2JqCihyZWFjdC1wZGYpCmVuZG9iagoxMyAwIG9iagoocmVhY3QtcGRmKQplbmRvYmoKMTQgMCBvYmoKKEQ6MjAyMjA2MTYyMjIyMzlaKQplbmRvYmoKMTEgMCBvYmoKPDwKL1Byb2R1Y2VyIDEyIDAgUgovQ3JlYXRvciAxMyAwIFIKL0NyZWF0aW9uRGF0ZSAxNCAwIFIKPj4KZW5kb2JqCjEwIDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwo+PgplbmRvYmoKNCAwIG9iago8PAo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMSAwIFIKL05hbWVzIDIgMCBSCi9WaWV3ZXJQcmVmZXJlbmNlcyA1IDAgUgo+PgplbmRvYmoKMSAwIG9iago8PAovVHlwZSAvUGFnZXMKL0NvdW50IDEKL0tpZHMgWzggMCBSXQo+PgplbmRvYmoKMiAwIG9iago8PAovRGVzdHMgPDwKICAvTmFtZXMgWwpdCj4+Cj4+CmVuZG9iago1IDAgb2JqCjw8Ci9EaXNwbGF5RG9jVGl0bGUgdHJ1ZQo+PgplbmRvYmoKNiAwIG9iago8PAovTGVuZ3RoIDYxMgovRmlsdGVyIC9GbGF0ZURlY29kZQo+PgpzdHJlYW0KeJzNVs1q3DAQvusp9ALrSNY/hD0kbQM9FLZr6CHkpHjbQBwIC+3rd2xtbMkr2WIXlVrG1vfZMyPNjDSimEDbUHhoTittCKEC2w69Q6PDR/c8Ue+ICQx3h4QkVa0JqU2PX2d4CdngXzmTPcdLyCJ4DDLu7d92GOvwTbgxurd/W/QL/cBvqDaqknyYvNftRsmF2fY9AhcF2ilzZruouWvcdvOp/f1i2+8Pd/h+j0iluCHUSKI0Z5QphvOo/f03VOM/aI8enyCyz2jnwjpNpFv0WO9dMXo84XkZ+CWAaXAuJ9IwDewUh9mc8qSXJl8uBjtvxZ2shcuwb+MypEJBbjBjFHzrfFjzyWFROp+0oEDG9U40W6HzycAcCfURnAYROZWEafCRNkrD+qfGaLwRvOKum+Pi3hYZnk5ROkbLwygVzJL7R9RkB+7wZ+CjVN/2f7FAJoFSfVswPVVcb5l4XZKOc4dHs9GP0NWjvCTEs0wcNriVLdE7hHxQUCEdNf1DSaV7zjNgjycDR/uGbh6OFP88gsykO3L6uWs8nd6nBjR/AU/UuDmgx1tuZCvlFjOCb+VB1Vu8qQV0nyVtVcvkYYvJE26+os8N2BuHbSojuZtOZIa7sbmdXvSOUwauYRfxoO/3KJ1PwsGkz+iY3olmK3Q+GZgjoT6C0yAix5MwDcYDAoftTbu1RSEs9bCy1j0cqTFOYTpWy8MpFdSSO37UZMmTyOreu0bnk7Zg3vO43jIJcEGe551zzvLdz4Grh/2PTkA5dSc8m/1nBUhAyelrj1BMEahATHFJ40WHVFLrjKLjt7/O3TDKCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDE1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDY4MSAwMDAwMCBuIAowMDAwMDAwNzM4IDAwMDAwIG4gCjAwMDAwMDA1OTQgMDAwMDAgbiAKMDAwMDAwMDU3MyAwMDAwMCBuIAowMDAwMDAwNzg1IDAwMDAwIG4gCjAwMDAwMDA4MjggMDAwMDAgbiAKMDAwMDAwMDE4OSAwMDAwMCBuIAowMDAwMDAwMDU5IDAwMDAwIG4gCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDQ3NSAwMDAwMCBuIAowMDAwMDAwMzk5IDAwMDAwIG4gCjAwMDAwMDAzMDcgMDAwMDAgbiAKMDAwMDAwMDMzNSAwMDAwMCBuIAowMDAwMDAwMzYzIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgMTUKL1Jvb3QgMyAwIFIKL0luZm8gMTEgMCBSCj4+CnN0YXJ0eHJlZgoxNTEyCiUlRU9GCg==' , name:'eee'},
    { uri: 'data:application/pdf;base64,JVBERi0xLjMKJf////8KOSAwIG9iago8PAovVHlwZSAvRXh0R1N0YXRlCi9jYSAxCj4+CmVuZG9iago4IDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL01lZGlhQm94IFswIDAgNTk1LjI4MDAyOSA4NDEuODkwMDE1XQovQ29udGVudHMgNiAwIFIKL1Jlc291cmNlcyA3IDAgUgovVXNlclVuaXQgMQo+PgplbmRvYmoKNyAwIG9iago8PAovUHJvY1NldCBbL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSV0KL0V4dEdTdGF0ZSA8PAovR3MxIDkgMCBSCj4+Ci9Gb250IDw8Ci9GMSAxMCAwIFIKPj4KPj4KZW5kb2JqCjEyIDAgb2JqCihyZWFjdC1wZGYpCmVuZG9iagoxMyAwIG9iagoocmVhY3QtcGRmKQplbmRvYmoKMTQgMCBvYmoKKEQ6MjAyMjA2MTYyMjIyMzlaKQplbmRvYmoKMTEgMCBvYmoKPDwKL1Byb2R1Y2VyIDEyIDAgUgovQ3JlYXRvciAxMyAwIFIKL0NyZWF0aW9uRGF0ZSAxNCAwIFIKPj4KZW5kb2JqCjEwIDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwo+PgplbmRvYmoKNCAwIG9iago8PAo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMSAwIFIKL05hbWVzIDIgMCBSCi9WaWV3ZXJQcmVmZXJlbmNlcyA1IDAgUgo+PgplbmRvYmoKMSAwIG9iago8PAovVHlwZSAvUGFnZXMKL0NvdW50IDEKL0tpZHMgWzggMCBSXQo+PgplbmRvYmoKMiAwIG9iago8PAovRGVzdHMgPDwKICAvTmFtZXMgWwpdCj4+Cj4+CmVuZG9iago1IDAgb2JqCjw8Ci9EaXNwbGF5RG9jVGl0bGUgdHJ1ZQo+PgplbmRvYmoKNiAwIG9iago8PAovTGVuZ3RoIDYxMgovRmlsdGVyIC9GbGF0ZURlY29kZQo+PgpzdHJlYW0KeJzNVs1q3DAQvusp9ALrSNY/hD0kbQM9FLZr6CHkpHjbQBwIC+3rd2xtbMkr2WIXlVrG1vfZMyPNjDSimEDbUHhoTittCKEC2w69Q6PDR/c8Ue+ICQx3h4QkVa0JqU2PX2d4CdngXzmTPcdLyCJ4DDLu7d92GOvwTbgxurd/W/QL/cBvqDaqknyYvNftRsmF2fY9AhcF2ilzZruouWvcdvOp/f1i2+8Pd/h+j0iluCHUSKI0Z5QphvOo/f03VOM/aI8enyCyz2jnwjpNpFv0WO9dMXo84XkZ+CWAaXAuJ9IwDewUh9mc8qSXJl8uBjtvxZ2shcuwb+MypEJBbjBjFHzrfFjzyWFROp+0oEDG9U40W6HzycAcCfURnAYROZWEafCRNkrD+qfGaLwRvOKum+Pi3hYZnk5ROkbLwygVzJL7R9RkB+7wZ+CjVN/2f7FAJoFSfVswPVVcb5l4XZKOc4dHs9GP0NWjvCTEs0wcNriVLdE7hHxQUCEdNf1DSaV7zjNgjycDR/uGbh6OFP88gsykO3L6uWs8nd6nBjR/AU/UuDmgx1tuZCvlFjOCb+VB1Vu8qQV0nyVtVcvkYYvJE26+os8N2BuHbSojuZtOZIa7sbmdXvSOUwauYRfxoO/3KJ1PwsGkz+iY3olmK3Q+GZgjoT6C0yAix5MwDcYDAoftTbu1RSEs9bCy1j0cqTFOYTpWy8MpFdSSO37UZMmTyOreu0bnk7Zg3vO43jIJcEGe551zzvLdz4Grh/2PTkA5dSc8m/1nBUhAyelrj1BMEahATHFJ40WHVFLrjKLjt7/O3TDKCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDE1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDY4MSAwMDAwMCBuIAowMDAwMDAwNzM4IDAwMDAwIG4gCjAwMDAwMDA1OTQgMDAwMDAgbiAKMDAwMDAwMDU3MyAwMDAwMCBuIAowMDAwMDAwNzg1IDAwMDAwIG4gCjAwMDAwMDA4MjggMDAwMDAgbiAKMDAwMDAwMDE4OSAwMDAwMCBuIAowMDAwMDAwMDU5IDAwMDAwIG4gCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDQ3NSAwMDAwMCBuIAowMDAwMDAwMzk5IDAwMDAwIG4gCjAwMDAwMDAzMDcgMDAwMDAgbiAKMDAwMDAwMDMzNSAwMDAwMCBuIAowMDAwMDAwMzYzIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgMTUKL1Jvb3QgMyAwIFIKL0luZm8gMTEgMCBSCj4+CnN0YXJ0eHJlZgoxNTEyCiUlRU9GCg==' }
  ];
  
  const myHeader = (state, previousDocument, nextDocument) => {
    if (!state.currentDocument || state.config?.header?.disableFileName) {
      return null;
    }
 
    
    return (
      <>
        <div>{state.currentDocument.uri || ""}</div>
        <div>
          <button
            onClick={previousDocument}
            disabled={state.currentFileNo === 0}
          >
            Previous Document
          </button>
          <button
            onClick={nextDocument}
            disabled={state.currentFileNo >= state.documents.length - 1}
          >
            Next Document
          </button>
        </div>
      </>
    );
  };

  const config = {
    header: {
      overrideComponent: myHeader
      }
    };

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

            <div className="p_main">
              {false && <FormBuilder form={{ display: "form" }}></FormBuilder>}
              {true && <DocViewer  config={config} style={{maxWidth: 'calc(100vw - 500px)'}} pluginRenderers={DocViewerRenderers} documents={docs} />}
              <div style={{border:'1px solid black', maxWidth: '@calc(100wv - 800px)'}} > XXXX </div>
              {false && <Document file={'data:application/pdf;base64,JVBERi0xLjMKJf////8KOSAwIG9iago8PAovVHlwZSAvRXh0R1N0YXRlCi9jYSAxCj4+CmVuZG9iago4IDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL01lZGlhQm94IFswIDAgNTk1LjI4MDAyOSA4NDEuODkwMDE1XQovQ29udGVudHMgNiAwIFIKL1Jlc291cmNlcyA3IDAgUgovVXNlclVuaXQgMQo+PgplbmRvYmoKNyAwIG9iago8PAovUHJvY1NldCBbL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSV0KL0V4dEdTdGF0ZSA8PAovR3MxIDkgMCBSCj4+Ci9Gb250IDw8Ci9GMSAxMCAwIFIKPj4KPj4KZW5kb2JqCjEyIDAgb2JqCihyZWFjdC1wZGYpCmVuZG9iagoxMyAwIG9iagoocmVhY3QtcGRmKQplbmRvYmoKMTQgMCBvYmoKKEQ6MjAyMjA2MTYyMjIyMzlaKQplbmRvYmoKMTEgMCBvYmoKPDwKL1Byb2R1Y2VyIDEyIDAgUgovQ3JlYXRvciAxMyAwIFIKL0NyZWF0aW9uRGF0ZSAxNCAwIFIKPj4KZW5kb2JqCjEwIDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwo+PgplbmRvYmoKNCAwIG9iago8PAo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMSAwIFIKL05hbWVzIDIgMCBSCi9WaWV3ZXJQcmVmZXJlbmNlcyA1IDAgUgo+PgplbmRvYmoKMSAwIG9iago8PAovVHlwZSAvUGFnZXMKL0NvdW50IDEKL0tpZHMgWzggMCBSXQo+PgplbmRvYmoKMiAwIG9iago8PAovRGVzdHMgPDwKICAvTmFtZXMgWwpdCj4+Cj4+CmVuZG9iago1IDAgb2JqCjw8Ci9EaXNwbGF5RG9jVGl0bGUgdHJ1ZQo+PgplbmRvYmoKNiAwIG9iago8PAovTGVuZ3RoIDYxMgovRmlsdGVyIC9GbGF0ZURlY29kZQo+PgpzdHJlYW0KeJzNVs1q3DAQvusp9ALrSNY/hD0kbQM9FLZr6CHkpHjbQBwIC+3rd2xtbMkr2WIXlVrG1vfZMyPNjDSimEDbUHhoTittCKEC2w69Q6PDR/c8Ue+ICQx3h4QkVa0JqU2PX2d4CdngXzmTPcdLyCJ4DDLu7d92GOvwTbgxurd/W/QL/cBvqDaqknyYvNftRsmF2fY9AhcF2ilzZruouWvcdvOp/f1i2+8Pd/h+j0iluCHUSKI0Z5QphvOo/f03VOM/aI8enyCyz2jnwjpNpFv0WO9dMXo84XkZ+CWAaXAuJ9IwDewUh9mc8qSXJl8uBjtvxZ2shcuwb+MypEJBbjBjFHzrfFjzyWFROp+0oEDG9U40W6HzycAcCfURnAYROZWEafCRNkrD+qfGaLwRvOKum+Pi3hYZnk5ROkbLwygVzJL7R9RkB+7wZ+CjVN/2f7FAJoFSfVswPVVcb5l4XZKOc4dHs9GP0NWjvCTEs0wcNriVLdE7hHxQUCEdNf1DSaV7zjNgjycDR/uGbh6OFP88gsykO3L6uWs8nd6nBjR/AU/UuDmgx1tuZCvlFjOCb+VB1Vu8qQV0nyVtVcvkYYvJE26+os8N2BuHbSojuZtOZIa7sbmdXvSOUwauYRfxoO/3KJ1PwsGkz+iY3olmK3Q+GZgjoT6C0yAix5MwDcYDAoftTbu1RSEs9bCy1j0cqTFOYTpWy8MpFdSSO37UZMmTyOreu0bnk7Zg3vO43jIJcEGe551zzvLdz4Grh/2PTkA5dSc8m/1nBUhAyelrj1BMEahATHFJ40WHVFLrjKLjt7/O3TDKCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDE1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDY4MSAwMDAwMCBuIAowMDAwMDAwNzM4IDAwMDAwIG4gCjAwMDAwMDA1OTQgMDAwMDAgbiAKMDAwMDAwMDU3MyAwMDAwMCBuIAowMDAwMDAwNzg1IDAwMDAwIG4gCjAwMDAwMDA4MjggMDAwMDAgbiAKMDAwMDAwMDE4OSAwMDAwMCBuIAowMDAwMDAwMDU5IDAwMDAwIG4gCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDQ3NSAwMDAwMCBuIAowMDAwMDAwMzk5IDAwMDAwIG4gCjAwMDAwMDAzMDcgMDAwMDAgbiAKMDAwMDAwMDMzNSAwMDAwMCBuIAowMDAwMDAwMzYzIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgMTUKL1Jvb3QgMyAwIFIKL0luZm8gMTEgMCBSCj4+CnN0YXJ0eHJlZgoxNTEyCiUlRU9GCg=='}>
                <Page pageNumber={1} />
                </Document>}
            </div>

            

        </div>
        </div>
    );
};
