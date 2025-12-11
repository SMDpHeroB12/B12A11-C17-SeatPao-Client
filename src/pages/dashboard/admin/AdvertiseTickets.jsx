import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AdvertiseTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch approved tickets
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/advertise-list`)
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Toggle Advertise
  const toggleAd = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/advertise/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return toast.error(data.error);

        toast.success("Updated");

        setTickets((prev) =>
          prev.map((t) =>
            t._id === id ? { ...t, advertised: !t.advertised } : t
          )
        );
      });
  };

  if (loading) {
    return <p className="text-center text-xl py-10">Loading Tickets...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Advertise Tickets</h2>

      {tickets.length === 0 ? (
        <p>No approved tickets available.</p>
      ) : (
        <div className="overflow-x-auto mt-5">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Route</th>
                <th>Price</th>
                <th>Advertise</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((t, index) => (
                <tr key={t._id}>
                  <td>{index + 1}</td>
                  <td>{t.title}</td>
                  <td>{t.route}</td>
                  <td>৳{t.price}</td>

                  <td>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={t.advertised === true}
                      onChange={() => toggleAd(t._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdvertiseTickets;
