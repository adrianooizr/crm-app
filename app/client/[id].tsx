import { useRouter } from 'next/router';
import ClientDetails from '../components/ClientDetails';
import { useEffect, useState } from 'react';

export default function ClientDetailsPage() {
 const router = useRouter();
 const { id } = router.query;

 // Use a state hook to manage the client details
 const [clientDetails, setClientDetails] = useState<{ email?: string }>({});

 // Use the useEffect hook to fetch the client details when the component mounts
 useEffect(() => {
    async function fetchClientDetails() {
      const response = await fetch(`/api/clients/${id}`);
      const data = await response.json();
      setClientDetails(data);
    }

    fetchClientDetails();
 }, [id]);

 // Function to handle the form submission
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form inputs and send the updated client details back to the data source
    // For example, you can send a PUT request to the API
    await fetch(`/api/clients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientDetails),
    });

    // Redirect the user back to the client list page
    router.back();
 };

 // Function to handle input changes
 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target as HTMLInputElement;
  setClientDetails({ ...clientDetails, [name]: value });
 };
 
 return (
    <div>
      <h1>Client Details</h1>
      <button onClick={() => router.back()}>Back to Client List</button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={ClientDetails.name}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={clientDetails.email}
          onChange={handleInputChange}
        />
        {/* Render additional form inputs for other fields in the client details object */}
        <button type="submit">Save</button>
      </form>
    </div>
 );
}