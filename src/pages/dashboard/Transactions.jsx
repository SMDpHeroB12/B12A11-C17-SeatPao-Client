import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import LoadingSpinner from "../../components/LoadingSpinner";

const Transactions = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${import.meta.env.VITE_API_URL}/payments?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .finally(() => setLoading(false));
  }, [user?.email]);

  if (loading) {
    return (
      <div>
        <p className="text-center py-10">Loading transactions...</p>
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Transaction History</h2>

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Ticket</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={t._id}>
                <td>{i + 1}</td>
                <td className="text-xs">{t.transactionId}</td>
                <td>{t.ticketTitle}</td>
                <td>৳{t.amount}</td>
                <td>{new Date(t.paymentDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Transactions;
