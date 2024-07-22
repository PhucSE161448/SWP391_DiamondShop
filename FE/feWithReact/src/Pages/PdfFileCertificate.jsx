import React, { useEffect, useState } from 'react'
import { Document, Page, PDFViewer, View, Text } from '@react-pdf/renderer'
import { useParams } from 'react-router-dom'
import { createApi } from '../Auth/AuthFunction'

export default function PdfFileCertificate() {
  const { id } = useParams()
  const [Certificate, setCertificate] = useState([])
  useEffect(() => {
    const getCertificate = (id) => {
      const url = createApi(`Certificate/GetExportCertificate?orderId=${id}`)
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(response => response.json())
        .then(data => {
          setCertificate(data.certificates)
        })
    }
    getCertificate(id)
  }, [id])

  console.log(Certificate)

  const headerTableUser = {
    width: '25%',
    textAlign: 'center'
  }

  const headerTableProduct = {
    width: '33.33%',
    textAlign: 'center'
  }

  const headerTableCertificate = ['Report Number', 'Origin', 'Color', 'Clarity', 'Cut', 'Carat weight', 'Date of issue']

  return (
    <PDFViewer width="100%" height="1200" >
      {Certificate && (
        <Document>
          {Certificate?.map((item, index) => (
            <Page size="A4" orientation='landscape'>
              <View style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{
                  fontSize: 20,
                  padding: 10,
                  fontWeight: 'bold',
                  textDecoration: 'underline'
                }}>
                  Certificate Document
                </Text>
              </View>
              <View style={{ flexDirection: 'row', backgroundColor: '#f2f2f2', padding: 10 }}>
                {headerTableCertificate.map((header, index) => (
                  <Text key={index} style={headerTableProduct}>
                    {header}
                  </Text>
                ))}
              </View>
              <View key={index} style={{ flexDirection: 'row', padding: 10 }}>
                <Text style={headerTableProduct}>
                  {item.reportNumber}
                </Text>
                <Text style={headerTableProduct}>
                  {item.origin}
                </Text>
                <Text style={headerTableProduct}>
                  {item.color}
                </Text>
                <Text style={headerTableProduct}>
                  {item.clarity}
                </Text>
                <Text style={headerTableProduct}>
                  {item.cut}
                </Text>
                <Text style={headerTableProduct}>
                  {item.caratWeight}
                </Text>
                <Text style={headerTableProduct}>
                  {new Date(item.dateOfIssue).toLocaleDateString('en-US')}
                </Text>
              </View>
            </Page>
          ))}
        </Document>
      )}
    </PDFViewer>
  )
}
