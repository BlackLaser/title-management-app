import React, { useEffect, useState, useContext } from 'react';
import { getTitles, addTitle, deleteTitle } from '../api/title';
import { AuthContext } from '../contexts/AuthContext';
import useMetaMask from '../hooks/useMetaMask';
import TitleForm from '../components/Dashboard/TitleForm';
import TitleList from '../components/Dashboard/TitleList';

const DashboardPage = () => {
  const { token, logout } = useContext(AuthContext);
  const { account, connectWallet } = useMetaMask();
  const [titles, setTitles] = useState([]);
  const [error, setError] = useState(null);

  // Fetch titles on component mount if the user is authenticated
  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await getTitles(token);
        setTitles(response.data);
      } catch (err) {
        setError('Error fetching titles');
      }
    };

    if (token) fetchTitles();
  }, [token]);

  // Add a title, but only if wallet is connected
  const handleAddTitle = async (title) => {
    if (!account) {
      setError('Connect your MetaMask wallet to add titles.');
      return;
    }

    try {
      const response = await addTitle(title, token);
      setTitles([...titles, response.data]);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Error adding title');
    }
  };

  // Delete a title, but only if wallet is connected
  const handleDeleteTitle = async (uuid) => {
    if (!account) {
      setError('Connect your MetaMask wallet to delete titles.');
      return;
    }

    try {
      await deleteTitle(uuid, token);
      setTitles(titles.filter((title) => title.uuid !== uuid));
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Error deleting title');
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={logout}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Logout
        </button>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Title Form */}
      
      <TitleForm onAddTitle={handleAddTitle} isWalletConnected={!!account}/>

      {/* Title List */}
      <TitleList titles={titles} onDeleteTitle={handleDeleteTitle} isWalletConnected={!!account}/>

      {/* MetaMask Connection */}
      {account ? (
        <p className="mt-4 text-gray-700">Connected Wallet: {account}</p>
      ) : (
        <button
          onClick={connectWallet}
          className="mt-4 px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
        >
          Connect MetaMask
        </button>
      )}
    </div>
  );
};

export default DashboardPage;

