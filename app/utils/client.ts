// utils/client.js
import { useState, useEffect } from 'react';

type Client = {
    name: string;
    status: string;
   };

const useClient = (clientId: string): { client: Client } => {
    const [client, setClient] = useState<Client>({
        name: '',
        status: '',
       });


 useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await fetch(`https://your-api-url/clients/${clientId}`);
        const data = await response.json();
        setClient(data);
      } catch (error) {
        console.error('Error fetching client:', error);
      }
    };

    if (clientId) {
      fetchClient();
    }
 }, [clientId]);

 return { client };
};

export default useClient;