import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import { getAccount } from "../../services/authService"
function AccounInfo() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchAccount = async () => {
    try {
      const res = await getAccount(id);
      setAccount(res.data.data);
      console.log(res.data.data);
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchAccount();
    }
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  return (
    <div>
      <h1>Account Info</h1>

      {account ? (
        <>
          <p>Name: {account.name}</p>
          <p>Balance: ₹{account.initialBalance}</p>
          <p>Type: {account.type}</p>
        </>
      ) : (
        <p>No account found</p>
      )}
    </div>
  );
}

export default AccounInfo
