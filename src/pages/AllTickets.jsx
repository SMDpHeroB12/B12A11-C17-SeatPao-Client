import { useEffect, useState } from "react";
import TicketCard from "../components/Shared/TicketCard";
import LoadingSpinner from "../components/LoadingSpinner";

const ITEMS_PER_PAGE = 6;

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // filters
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("default");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tickets`)
      .then((res) => res.json())
      .then((data) => {
        const safeData = Array.isArray(data) ? data : [];
        setTickets(safeData);
        setFiltered(safeData);
      })
      .catch(() => {
        setTickets([]);
        setFiltered([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // SEARCH + FILTER + SORT
  useEffect(() => {
    let data = [...tickets];

    // Search by FROM
    if (from.trim()) {
      data = data.filter((t) =>
        (t.from || "").toLowerCase().includes(from.toLowerCase())
      );
    }

    // Search by TO
    if (to.trim()) {
      data = data.filter((t) =>
        (t.to || "").toLowerCase().includes(to.toLowerCase())
      );
    }

    // Filter by transport type
    if (type !== "all") {
      data = data.filter((t) => (t.type || "").toLowerCase() === type);
    }

    // Sort by price
    if (sort === "low") {
      data.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sort === "high") {
      data.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    setFiltered(data);
    setCurrentPage(1);
  }, [from, to, type, sort, tickets]);

  // Pagination calculation
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentTickets = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="w-11/12 mx-auto py-10 text-center">
        <p className="text-xl">Loading tickets...</p>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6">All Tickets</h2>

      {/*  FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <input
          type="text"
          placeholder="From location"
          className="input "
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <input
          type="text"
          placeholder="To location"
          className="input "
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <select
          className="select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="launch">Launch</option>
          <option value="plane">Plane</option>
        </select>

        <select
          className="select "
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort by Price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>

        <button
          className="btn btn-outline"
          onClick={() => {
            setFrom("");
            setTo("");
            setType("all");
            setSort("default");
          }}
        >
          Reset
        </button>
      </div>

      {/* TICKETS */}
      {currentTickets.length === 0 ? (
        <p className="opacity-70">No tickets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentTickets.map((t) => (
            <TicketCard key={t._id} ticket={t} />
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {[...Array(totalPages).keys()].map((n) => (
            <button
              key={n}
              className={`btn btn-sm ${
                currentPage === n + 1 ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setCurrentPage(n + 1)}
            >
              {n + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTickets;
