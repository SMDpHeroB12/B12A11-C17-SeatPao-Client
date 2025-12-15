import { useEffect, useState } from "react";
import TicketCard from "../components/Shared/TicketCard";
import LoadingSpinner from "../components/LoadingSpinner";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch approved tickets (server returns only approved & visible)
    fetch(`${import.meta.env.VITE_API_URL}/tickets`)
      .then((res) => res.json())
      .then((data) => {
        setTickets(Array.isArray(data) ? data : []);
        setFiltered(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch tickets:", err);
        setTickets([]);
        setFiltered([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter logic
  useEffect(() => {
    let data = [...tickets];

    if (search.trim() !== "") {
      data = data.filter((t) =>
        (t.title || "").toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type !== "all") {
      data = data.filter((t) => {
        // normalize type strings (bus/train/launch/air)
        const type = (t.type || "").toString().toLowerCase();
        return type === type.toLowerCase();
      });
    }

    setFiltered(data);
  }, [search, type, tickets]);

  if (loading) {
    return (
      <div className="w-11/12 mx-auto py-10 text-center">
        <p className="text-xl">Loading tickets...</p>
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6">All Tickets</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title..."
          className="input input-bordered w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-40"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="launch">Launch</option>
          <option value="air">Air</option>
        </select>
      </div>

      {/* Ticket List */}
      {filtered.length === 0 ? (
        <p className="opacity-70">No tickets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <TicketCard key={t._id} ticket={t} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTickets;
