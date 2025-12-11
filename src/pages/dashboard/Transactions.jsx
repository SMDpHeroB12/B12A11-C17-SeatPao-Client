import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Transactions = () => {
  const { user } = useContext(AuthContext);

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${import.meta.env.VITE_API_URL}/payments?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.email]);

  if (loading) {
    return <p className="text-xl text-center py-10">Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Transaction History</h2>

      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Ticket</th>
                <th>Amount</th>
                <th>Transaction ID</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p, i) => (
                <tr key={p._id}>
                  <td>{i + 1}</td>
                  <td>{p.ticketTitle}</td>
                  <td>৳{p.amount}</td>
                  <td>{p.transactionId}</td>
                  <td>{new Date(p.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
