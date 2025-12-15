import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = () => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/tickets`)
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load tickets");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleApprove = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/tickets/approve/${id}`, {
      method: "PATCH",
    }).then(() => {
      toast.success("Ticket approved");
      fetchTickets();
    });
  };

  const handleReject = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/tickets/reject/${id}`, {
      method: "PATCH",
    }).then(() => {
      toast.success("Ticket rejected");
      fetchTickets();
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-center py-10">Loading Tickets...</p>
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Tickets</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Route</th>
              <th>Vendor</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((t, idx) => (
              <tr key={t._id}>
                <td>{idx + 1}</td>

                <td>
                  <img
                    src={t.image}
                    alt="ticket"
                    className="w-16 h-10 object-cover rounded"
                  />
                </td>

                <td>{t.title}</td>
                <td>
                  {t.from} → {t.to}
                </td>

                <td>{t.vendorEmail}</td>

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
                    {t.status}
                  </span>
                </td>

                <td className=" flex gap-3 justify-center items-center">
                  <button
                    disabled={t.status !== "pending"}
                    onClick={() => handleApprove(t._id)}
                    className="btn btn-xs btn-success"
                  >
                    Approve
                  </button>

                  <button
                    disabled={t.status !== "pending"}
                    onClick={() => handleReject(t._id)}
                    className="btn btn-xs btn-error"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTickets;
