import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import LoadingSpinner from "../../components/LoadingSpinner";

const Transactions = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/payments?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPayments(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Fetch payments error:", err);
      })
      .finally(() => setLoading(false));
  }, [user?.email]);

  if (loading) {
    return (
      <div className="text-center py-10">
        <LoadingSpinner />
      </div>
    );
  }

  if (payments.length === 0) {
    return <p className="text-center py-10">No transactions found.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Transaction History</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
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
            {payments.map((p, i) => (
              <tr key={p._id}>
                <td>{i + 1}</td>
                <td className="font-mono text-sm">{p.transactionId}</td>
                <td>{p.ticketTitle || "-"}</td>
                <td>৳{p.amount}</td>
                <td>{new Date(p.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
