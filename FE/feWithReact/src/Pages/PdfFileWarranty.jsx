import React, { useEffect, useState } from 'react'
import { Document, Page, PDFViewer, View, Text } from '@react-pdf/renderer'
import { useParams } from 'react-router-dom'
import { createApi } from '../Auth/AuthFunction'

export default function PdfFileWarranty() {
  const { id } = useParams()
  const [warranty, setWarranty] = useState([])
  useEffect(() => {
    const getWarranty = (id) => {
      const url = createApi(`WarrantyDocument?orderId=${id}`)
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(response => response.json())
        .then(data => {
          setWarranty(data)
        })
    }
    getWarranty(id)
  }, [id])

  const headerTableUser = {
    width: '25%',
    textAlign: 'center'
  }

  const headerTableProduct = {
    width: '33.33%',
    textAlign: 'center'
  }

  return (
    <PDFViewer width="100%" height="1200" >
      {warranty && (
        <Document title={warranty?.account?.name}>
          <Page size="A4" orientation='landscape' style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', backgroundColor: '#f2f2f2', padding: 10 }}>
                <Text style={headerTableUser}>Name</Text>
                <Text style={headerTableUser}>Email</Text>
                <Text style={headerTableUser}>Phone Number</Text>
                <Text style={headerTableUser}>Address</Text>
              </View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
                <Text style={headerTableUser}>{warranty?.account?.name}</Text>
                <Text style={headerTableUser}>{warranty?.account?.email}</Text>
                <Text style={headerTableUser}>{warranty?.account?.phoneNumber}</Text>
                <Text style={headerTableUser}>{warranty?.account?.address}</Text>
              </View>
            </View>
          </Page>
          {warranty?.orderProducts?.map((item, index) => (
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
                  Warranty Document
                </Text>
              </View>
              <View style={{ flexDirection: 'row', backgroundColor: '#f2f2f2', padding: 10 }}>
                <Text style={headerTableProduct}>Product Name</Text>
                <Text style={headerTableProduct}>Warranty Period</Text>
                <Text style={headerTableProduct}>Terms and Conditions</Text>
              </View>
              <View key={index} style={{ flexDirection: 'row', padding: 10 }}>
                <Text style={headerTableProduct}>
                  {item?.name}
                </Text>
                <Text style={headerTableProduct}>
                  {warranty.warrantyDocuments && warranty.warrantyDocuments[index] ? new Date(warranty.warrantyDocuments[index].period).toLocaleDateString('en-US') : 'N/A'}
                </Text>
                <Text style={headerTableProduct}>
                  {warranty.warrantyDocuments && warranty.warrantyDocuments[index] ? warranty.warrantyDocuments[index].termsAndConditions.split('\n').map((line, idx) => (
                    <Text key={idx} style={{ display: 'block' }}>{line}</Text>
                  )) : 'N/A'}
                </Text>
              </View>
            </Page>
          ))}
        </Document>
      )}
    </PDFViewer>
  )
}
