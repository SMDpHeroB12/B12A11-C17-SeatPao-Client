import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-hot-toast";

const AddTicket = () => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const handleAddTicket = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const ticketData = {
      title: form.title.value,
      type: form.type.value,
      route: form.route.value,
      date: form.date.value,
      time: form.time.value,
      price: Number(form.price.value),
      seats: Number(form.seats.value),
      vendorEmail: user.email,
      vendorName: user.displayName || "Vendor",
      createdAt: new Date(),
    };

    // Send to backend
    fetch(`${import.meta.env.VITE_API_URL}/tickets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticketData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Ticket added successfully!");
          form.reset();
        } else {
          toast.error("Failed to add ticket.");
        }
      })
      .catch(() => toast.error("Server error. Try again."))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Add New Ticket</h2>

      <form
        onSubmit={handleAddTicket}
        className="space-y-5 bg-base-200 p-6 rounded-xl shadow"
      >
        {/* Title */}
        <div>
          <label className="font-medium">Ticket Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g., Dhaka to Chittagong Express"
            className="input input-bordered w-full mt-1"
            required
          />
        </div>

        {/* Transport Type */}
        <div>
          <label className="font-medium">Transport Type</label>
          <select
            name="type"
            className="select select-bordered w-full mt-1"
            required
          >
            <option>Bus</option>
            <option>Train</option>
            <option>Plane</option>
            <option>Launch</option>
          </select>
        </div>

        {/* Route */}
        <div>
          <label className="font-medium">Route</label>
          <input
            type="text"
            name="route"
            placeholder="e.g., Dhaka → Cox’s Bazar"
            className="input input-bordered w-full mt-1"
            required
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Date</label>
            <input
              type="date"
              name="date"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>
          <div>
            <label className="font-medium">Time</label>
            <input
              type="time"
              name="time"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>
        </div>

        {/* Price & Seats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Price (৳)</label>
            <input
              type="number"
              name="price"
              className="input input-bordered w-full mt-1"
              placeholder="e.g., 1200"
              required
            />
          </div>
          <div>
            <label className="font-medium">Available Seats</label>
            <input
              type="number"
              name="seats"
              className="input input-bordered w-full mt-1"
              placeholder="e.g., 40"
              required
            />
          </div>
        </div>

        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Adding Ticket..." : "Add Ticket"}
        </button>
      </form>
    </div>
  );
};

export default AddTicket;
