import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { toast } from "react-hot-toast";

const AddTicket = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // perks list example:
  const perksList = ["AC", "Foods", "WiFi", "Charging", "Recliner"];

  const handleAddTicket = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    // image upload to imgbb if provided
    const imageFile = form.image.files[0];
    let imageUrl = "";
    try {
      if (imageFile) {
        const imgbbKey = import.meta.env.VITE_IMGBB_KEY;
        const fd = new FormData();
        fd.append("image", imageFile);
        const imgbbRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
          { method: "POST", body: fd }
        );
        const imgbbData = await imgbbRes.json();
        if (imgbbData.success) imageUrl = imgbbData.data.url;
      }
    } catch (err) {
      console.error("imgbb error:", err);
      toast.error("Image upload failed. Try again.");
      setLoading(false);
      return;
    }

    // collect perks
    const perks = [];
    perksList.forEach((p) => {
      if (form[`perk_${p}`]?.checked) perks.push(p);
    });

    const ticketData = {
      title: form.title.value,
      from: form.from.value,
      to: form.to.value,
      route: `${form.from.value} → ${form.to.value}`,
      type: form.type.value,
      date: form.date.value,
      time: form.time.value,
      price: Number(form.price.value),
      seats: Number(form.seats.value),
      perks,
      image: imageUrl,
      vendorEmail: user.email,
      vendorName: user.displayName || "Vendor",
      status: "pending",
      advertised: false,
      createdAt: new Date(),
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticketData),
      });
      const data = await res.json();
      if (data.insertedId) {
        toast.success("Ticket added successfully!");
        form.reset();
      } else {
        toast.error("Failed to add ticket.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    document.title = "SeatPao | Add Tickets";
  }, []);

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
            className="input input-bordered w-full mt-1"
            placeholder="e.g., Dhaka to Chittagong Express"
            required
          />
        </div>

        {/* From / To */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">From (Location)</label>
            <input
              type="text"
              name="from"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>
          <div>
            <label className="font-medium">To (Location)</label>
            <input
              type="text"
              name="to"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>
        </div>

        {/* Type */}
        <div>
          <label className="font-medium">Transport Type</label>
          <select
            name="type"
            className="select select-bordered w-full mt-1"
            required
          >
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="plane">Plane</option>
            <option value="launch">Launch</option>
          </select>
        </div>

        {/* Date & Time */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Departure Date</label>
            <input
              type="date"
              name="date"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>
          <div>
            <label className="font-medium">Departure Time</label>
            <input
              type="time"
              name="time"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>
        </div>

        {/* Price & Seats */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Price (৳)</label>
            <input
              type="number"
              name="price"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>
          <div>
            <label className="font-medium">Ticket Quantity</label>
            <input
              type="number"
              name="seats"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>
        </div>

        {/* Perks */}
        <div>
          <label className="font-medium">Perks</label>
          <div className="flex flex-wrap gap-3 mt-2">
            {["AC", "Foods", "WiFi", "Charging", "Recliner"].map((p) => (
              <label key={p} className="cursor-pointer">
                <input type="checkbox" name={`perk_${p}`} className="mr-2" />{" "}
                {p}
              </label>
            ))}
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="font-medium">Image (optional)</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="file-input file-input-bordered w-full mt-1"
          />
        </div>

        {/* Vendor (readonly) */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Vendor Name</label>
            <input
              type="text"
              value={user?.displayName || "Vendor"}
              readOnly
              className="input input-bordered w-full mt-1"
            />
          </div>
          <div>
            <label className="font-medium">Vendor Email</label>
            <input
              type="text"
              value={user?.email}
              readOnly
              className="input input-bordered w-full mt-1"
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
