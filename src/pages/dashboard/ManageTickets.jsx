import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all tickets (admin)
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tickets`)
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Delete Ticket
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This ticket will be removed permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (!result.isConfirmed) return;

      fetch(`${import.meta.env.VITE_API_URL}/tickets/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            Swal.fire("Deleted!", "Ticket removed successfully!", "success");

            setTickets(tickets.filter((t) => t._id !== id));
          }
        });
    });
  };

  if (loading) {
    return <div className="text-center text-xl py-10">Loading Tickets...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage All Tickets</h2>

      {tickets.length === 0 ? (
        <p className="opacity-70">No tickets available.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Route</th>
                <th>Type</th>
                <th>Price</th>
                <th>Vendor</th>
                <th>Seats</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((t, index) => (
                <tr key={t._id}>
                  <th>{index + 1}</th>

                  <td className="font-medium">{t.title}</td>
                  <td>{t.route}</td>

                  <td>
                    <span className="badge badge-primary">{t.type}</span>
                  </td>

                  <td>৳ {t.price}</td>

                  <td className="opacity-80">{t.vendorEmail}</td>

                  <td>{t.seats}</td>

                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
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

export default ManageTickets;
