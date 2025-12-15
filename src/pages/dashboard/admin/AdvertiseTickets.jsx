import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AdvertiseTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all tickets
  const fetchTickets = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/admin/tickets`)
      .then((res) => res.json())
      .then((data) => {
        // only approved tickets
        const approved = data.filter((t) => t.status === "approved");
        setTickets(approved);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Advertise toggle
  const handleAdvertise = async (ticketId, currentState) => {
    const advertisedCount = tickets.filter((t) => t.advertised).length;

    if (!currentState && advertisedCount >= 6) {
      return toast.error("You can advertise maximum 6 tickets");
    }

    await fetch(
      `${import.meta.env.VITE_API_URL}/admin/tickets/advertise/${ticketId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ advertised: !currentState }),
      }
    );

    toast.success(!currentState ? "Ticket advertised" : "Ticket unadvertised");
    fetchTickets();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Advertise Tickets</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Route</th>
              <th>Price</th>
              <th>Advertise</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket, idx) => (
              <tr key={ticket._id}>
                <td>{idx + 1}</td>
                <td>
                  <img
                    src={ticket.image}
                    alt="ticket"
                    className="w-16 h-10 rounded object-cover"
                  />
                </td>
                <td>{ticket.title}</td>
                <td>
                  {ticket.from} → {ticket.to}
                </td>
                <td>৳{ticket.price}</td>
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    checked={ticket.advertised === true}
                    onChange={() =>
                      handleAdvertise(ticket._id, ticket.advertised)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {tickets.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No approved tickets found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdvertiseTickets;
