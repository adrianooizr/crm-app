import { useState, useEffect } from 'react';
import ClientTableRow from './ClientTableRow';

const ClientList: React.FC = () => {
 const [clients, setClients] = useState<Client[]>([]);
 const [name, setName] = useState('');
 const [status, setStatus] = useState('');
 const [searchTerm, setSearchTerm] = useState('');
 const [error, setError] = useState('');

 const validateFields = () => {
  if (!name || !status) {
     setError("Client's Name or Activity status missing!");
  } else {
     setError('');
  }
 };

 const activityOptions = [
   { value: '', label: 'Select an option'},
   { value: 'Active', label: 'Active' },
   { value: 'Inactive', label: 'Inactive' },
 ];

 useEffect(() => {
    const savedClients = localStorage.getItem('clients');
    if (savedClients) {
      setClients(JSON.parse(savedClients));
    }
 }, []);

 type Client = {
    id: string;
    name: string;
    status: string;
    email: string;
 }
 
 const addClient = () => {

  validateFields();
  if (!name || !status) {
      return;
  }
  
  if (name && status) {
      const activityOption = activityOptions.find((option) => option.value === status);
      if (activityOption) {
        const newClient: Client = {
          id: Date.now().toString(),
          name,
          status: activityOption.value,
          email: ''
        };
        setClients([...clients, newClient]);
        localStorage.setItem('clients', JSON.stringify([...clients, newClient]));
        setName('');
        setStatus('');
      }
  }
 };
 
 const removeClient = (id: string) => {
    setClients(clients.filter((client) => client.id !== id));
 };

 const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 setSearchTerm(e.target.value);
};

 return (
    <div className="clientList">
      <input
       className="inputField"
       type="text"
       placeholder="Search Client Name or ID "
       value={searchTerm}
       onChange={handleSearchTermChange}
      />

      <input
        className="inputField"
        type="text"
        placeholder="Client Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      
      <select className="inputField" 
      value={status} onChange={(e) => setStatus(e.target.value)}>
        {activityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>

      <button className="button" onClick={addClient}>Add Client</button>
      {error && <p className="error">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client Name</th>
            <th>Activity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients
            .filter((client) => client.name.toLowerCase().includes(searchTerm.toLowerCase()) || client.id.includes(searchTerm))
            .map((client) => (
              <ClientTableRow key={client.id} client={client} onRemove={removeClient} />
            ))}
        </tbody>
      </table>
    </div>
 );
};

export default ClientList;