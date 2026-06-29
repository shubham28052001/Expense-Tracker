import { useEffect, useState } from "react";
import { getAllaccount, switchActiveAccount } from "../../services/authService";
import { toast } from "react-hot-toast"
import AddAccount from "../HomePage/AddAccount";
import AccountCard from "../HomePage/AccountCard";
import CreateAccount from "../Forms/CreateAccount";
import Header from "../HomePage/Header";
import AddTransactionForm from "../Forms/AddTransactionForm";
function Home() {
  const [accounts, setAccounts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editAccount, setEditAccount] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const handleRefresh = () => {
    setRefresh(prev => !prev);
  };

  const fetchAccounts = async () => {
    try {
      const res = await getAllaccount();
      setAccounts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [refresh]);

  const handleToggle = async (id) => {
    try {
      const response = await switchActiveAccount(id);
      await fetchAccounts();
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
        "Something went wrong"
      );
    }
  }

  const onAccountChange = async (id) => {
    await switchActiveAccount(id);
    await fetchAccounts();
  };

  const activeAccount = accounts.find(
    (account) => account.isActive
  );

  return (

    <div>
      <Header activeAccount={activeAccount} openForm={openForm} setOpenForm={setOpenForm} accounts={accounts} refresh={refresh} onAccountChange={onAccountChange} handleRefresh={handleRefresh} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <AddAccount setOpenModal={setOpenModal} />

        {accounts.map((account) => (
          <AccountCard key={account._id} account={account} handleToggle={handleToggle} fetchAccounts={fetchAccounts} setEditAccount={setEditAccount} />
        ))}

        {openModal && <CreateAccount setOpenModal={setOpenModal} fetchAccounts={fetchAccounts} />}
        {editAccount && (<CreateAccount account={editAccount} setEditAccount={setEditAccount} fetchAccounts={fetchAccounts} />
        )}
      </div>
    </div>
  )
};

export default Home;