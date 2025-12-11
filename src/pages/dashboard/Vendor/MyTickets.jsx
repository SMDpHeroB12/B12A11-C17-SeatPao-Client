import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const MyTickets = () => {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    fetch(
      `${import.meta.env.VITE_API_URL}/vendor/my-tickets?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.email]);

  const handleDelete = (id, status) => {
    if (status === "rejected") return;
    Swal.fire({
      title: "Are you sure?",
      text: "This ticket will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (!result.isConfirmed) return;
      fetch(`${import.meta.env.VITE_API_URL}/tickets/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            Swal.fire("Deleted!", "Ticket deleted successfully!", "success");
            setTickets((prev) => prev.filter((t) => t._id !== id));
          }
        });
    });
  };

  // Edit handler (simple navigation to update page — you may already have route)
  const handleEdit = (id, status) => {
    if (status === "rejected") return;
    // assume you have /dashboard/vendor/edit-ticket/:id route else implement
    window.location.href = `/dashboard/vendor/edit-ticket/${id}`;
  };

  if (loading)
    return (
      <div className="text-center text-xl py-10">Loading My Tickets...</div>
    );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Tickets</h2>

      {tickets.length === 0 ? (
        <p className="opacity-70">You have not added any tickets yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="p-5 bg-base-200 rounded-xl shadow hover:shadow-lg duration-300"
            >
              <img
                src={ticket.image || "/default-ticket.jpg"}
                alt="img"
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold">{ticket.title}</h3>
              <p className="opacity-80">{ticket.route}</p>
              <p className="font-medium mt-2">৳ {ticket.price}</p>

              <div className="mt-3 flex justify-between items-center">
                <span className="badge">{ticket.type}</span>
                <span className="badge">{ticket.seats} seats</span>
              </div>

              <div className="mt-3">
                <span
                  className={`badge ${
                    ticket.status === "approved"
                      ? "badge-success"
                      : ticket.status === "rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {ticket.status || "pending"}
                </span>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  className="btn btn-sm btn-outline w-1/2"
                  onClick={() => handleEdit(ticket._id, ticket.status)}
                  disabled={ticket.status === "rejected"}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-error w-1/2"
                  onClick={() => handleDelete(ticket._id, ticket.status)}
                  disabled={ticket.status === "rejected"}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;
