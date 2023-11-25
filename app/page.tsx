'use client'

import Head from 'next/head';
import ClientList from './components/ClientList';
import useClient from './utils/client';
import ClientDetails from './components/ClientDetails';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [clientId] = useState('');
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');

  const { client } = useClient(clientId);

  const handleErrorClose = () => {
      setShowError(false);
      setError('');
  };

  const validateFields = () => {
      if (!client.name || !client.status) {
        setError("Client's Name or Activity status missing!");
        setTimeout(handleErrorClose, 10000);
      } else {
        setError('');
      }
  };

 useEffect(() => {
    validateFields();
 }, [client]);



  return (
    <div>
      <Head>
        <title>CRM App</title>
        <meta name="description" content="Client Relationship Management App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>   
        <h1 className="headTitle">Client List</h1>
        <ClientList />
        <ClientDetails clientId={clientId} />
        {showError && <div className="error">{error}</div>}
        
    </div>
  );
}


