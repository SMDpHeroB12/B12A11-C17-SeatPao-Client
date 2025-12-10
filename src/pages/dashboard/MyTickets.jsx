import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2"; // <-- Added

const MyTickets = () => {
  const { user } = useContext(AuthContext);

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch vendor tickets
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

  // Delete Ticket using SweetAlert2
  const handleDelete = (id) => {
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

            setTickets(tickets.filter((t) => t._id !== id));
          }
        });
    });
  };

  if (loading) {
    return (
      <div className="text-center text-xl py-10">Loading My Tickets...</div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Tickets</h2>

      {tickets.length === 0 ? (
        <p className="opacity-70">You have not added any tickets yet.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="p-5 bg-base-200 rounded-xl shadow hover:shadow-lg duration-300"
            >
              <h3 className="text-lg font-semibold">{ticket.title}</h3>
              <p className="opacity-80">{ticket.route}</p>
              <p className="font-medium mt-2">৳ {ticket.price}</p>

              <div className="mt-3 flex justify-between items-center">
                <span className="badge badge-primary">{ticket.type}</span>
                <span className="badge">{ticket.seats} seats</span>
              </div>

              <div className="mt-4 flex justify-center items-center gap-3">
                <button className="btn btn-sm btn-outline w-[50%]" disabled>
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(ticket._id)}
                  className="btn btn-sm btn-error w-[50%]"
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
