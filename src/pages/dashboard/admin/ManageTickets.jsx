import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch ALL tickets (admin)
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tickets/admin/all`)
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Approve Ticket
  const handleApprove = (id) => {
    Swal.fire({
      title: "Approve Ticket?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Approve",
    }).then((result) => {
      if (!result.isConfirmed) return;

      fetch(`${import.meta.env.VITE_API_URL}/tickets/approve/${id}`, {
        method: "PATCH",
      })
        .then((res) => res.json())
        .then(() => {
          toast.success("Ticket Approved!");

          setTickets((prev) =>
            prev.map((t) =>
              t._id === id ? { ...t, status: "approved", hidden: false } : t
            )
          );
        });
    });
  };

  // Reject Ticket
  const handleReject = (id) => {
    Swal.fire({
      title: "Reject Ticket?",
      text: "The ticket will NOT appear publicly.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
    }).then((result) => {
      if (!result.isConfirmed) return;

      fetch(`${import.meta.env.VITE_API_URL}/tickets/reject/${id}`, {
        method: "PATCH",
      })
        .then((res) => res.json())
        .then(() => {
          toast.success("Ticket Rejected!");

          setTickets((prev) =>
            prev.map((t) =>
              t._id === id ? { ...t, status: "rejected", hidden: true } : t
            )
          );
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
                <th>Status</th>
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

                  <td>
                    <span
                      className={`badge ${
                        t.status === "approved"
                          ? "badge-success"
                          : t.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {t.status || "pending"}
                    </span>
                  </td>

                  <td className="text-center flex gap-2 justify-center">
                    <button
                      onClick={() => handleApprove(t._id)}
                      className="btn btn-sm btn-success"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(t._id)}
                      className="btn btn-sm btn-warning"
                    >
                      Reject
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
