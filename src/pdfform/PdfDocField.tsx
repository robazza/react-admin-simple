// Não está pronto
// Não testado
// formioFormData -> uri base64 pdf

import React from 'react';

import {useState} from 'react';

import { Page, Text, Image, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

import ReactPDF from '@react-pdf/renderer';

import _ from 'lodash';

// Create Document Component
export const PdfDocField = ({formData}) => {

    console.log(formData)

    const Table = ({ children }) => (
        <View style={styles.table}>
            <View style={styles.tableRow}> 
                <View style={styles.tableCol1Header}> 
                <Text style={styles.tableCellHeader}>Informação</Text> 
                </View> 
                <View style={styles.tableColHeader}> 
                <Text style={styles.tableCellHeader}>Resposta</Text> 
                </View> 
            </View>
            {children}
        </View>
    )
      
    const Row = ({ item, value }) => (
        <View style={styles.tableRow}> 
            <View style={styles.tableCol1}> 
                <Text style={styles.tableCell}>{item}</Text> 
            </View> 
            <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{_.isArray(value)?value.join("\n"):value}</Text> 
          </View> 
        </View> 
    )

    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const Doc = (
        <Document>
            <Page style={styles.body}>
                <Table>
                    {_.map(formData,(v,i,obj) => {
                        return (<Row item={i} value={JSON.stringify(v)} />)
                    })}
                </Table>
            </Page>
        </Document>
    )


    const [pdfData, setPdfData] = useState("");

    const [instance, updateInstance] = ReactPDF.usePDF({ document: Doc });

    if (instance.loading) return <div>Loading ...</div>;

    if (instance.error) return <div>Something went wrong: {error}</div>;

    if (instance.blob)
      getBase64(instance.blob, setPdfData)

    return (<>{pdfData}</>)

};



Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });
  
  const BORDER_COLOR = '#bfbfbf'
  const BORDER_STYLE = 'solid'
  const COL1_WIDTH = 30
  const COLN_WIDTH = (100 - COL1_WIDTH) / 1

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    table: { 
        display: "table", 
        width: "auto", 
        borderStyle: BORDER_STYLE, 
        borderColor: BORDER_COLOR,
        borderWidth: 1, 
        borderRightWidth: 0, 
        borderBottomWidth: 0 
      }, 
      tableRow: { 
        margin: "auto", 
        flexDirection: "row" 
      }, 
      tableCol1Header: { 
        width: COL1_WIDTH + '%', 
        borderStyle: BORDER_STYLE, 
        borderColor: BORDER_COLOR,
        borderBottomColor: '#000',
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0
      },     
      tableColHeader: { 
        width: COLN_WIDTH + "%", 
        borderStyle: BORDER_STYLE, 
        borderColor: BORDER_COLOR,
        borderBottomColor: '#000',
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0
      },   
      tableCol1: { 
        width: COL1_WIDTH + '%', 
        borderStyle: BORDER_STYLE, 
        borderColor: BORDER_COLOR,
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      },   
      tableCol: { 
        width: COLN_WIDTH + "%", 
        borderStyle: BORDER_STYLE, 
        borderColor: BORDER_COLOR,
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      }, 
      tableCellHeader: {
        margin: 5, 
        fontSize: 12,
        fontWeight: 500
      },  
      tableCell: { 
        margin: 5, 
        fontSize: 10 
      },

    title: {
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Oswald'
    },
    author: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: 'Oswald'
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman'
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
  });
