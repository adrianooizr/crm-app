import { useState } from 'react';
import Link from 'next/link';

interface Client {
 id: string;
 name: string;
 status: string;
 // Other client details
}

interface ClientTableRowProps {
 client: Client;
 onRemove: (id: string) => void;
}

const ClientTableRow: React.FC<ClientTableRowProps> = ({ client, onRemove }) => {
 const [confirmDelete, setConfirmDelete] = useState(false);

 const handleRemove = () => {
    setConfirmDelete(true);
    setTimeout(() => {
      onRemove(client.id);
      setConfirmDelete(false);
    }, 2000);
 };

 return (
    <tr>
      <td>{client.id}</td>
      <td>{client.name}</td>
      <td>{client.status}</td>
      <td>
      <td>
        <Link href={`/client/${client.id}`} passHref>
          <button className='details-btn'>Details</button>
        </Link>
      </td>
        {confirmDelete ? (
          <p className='removing-btn'>Removing...</p>
        ) : (
          <button className='remove-btn' onClick={handleRemove}>Remove</button>
        )}
      </td>
    </tr>
 );
};

export default ClientTableRow;