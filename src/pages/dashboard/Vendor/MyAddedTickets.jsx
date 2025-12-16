import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { toast } from "react-hot-toast";

const imgbbKey = import.meta.env.VITE_IMGBB_KEY;
const perksList = ["AC", "WiFi", "Foods", "Charging", "Recliner"];

const MyAddedTickets = () => {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [uploading, setUploading] = useState(false);

  /* ================= FETCH ================= */
  const fetchTickets = () => {
    fetch(`${import.meta.env.VITE_API_URL}/tickets`)
      .then((res) => res.json())
      .then((data) =>
        setTickets(data.filter((t) => t.vendorEmail === user.email))
      );
  };

  useEffect(() => {
    document.title = "SeatPao | My Added Tickets";
    fetchTickets();
  }, []);

  /* ================= IMAGE UPLOAD ================= */
  const uploadImage = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploading(false);
    return data.data.display_url;
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    let imageUrl = selectedTicket.image;
    if (form.image.files[0]) {
      imageUrl = await uploadImage(form.image.files[0]);
    }

    const updatedTicket = {
      title: form.title.value,
      from: form.from.value,
      to: form.to.value,
      type: form.type.value,
      price: Number(form.price.value),
      seats: Number(form.seats.value),
      date: form.date.value,
      time: form.time.value,
      perks: perksList.filter((p) => form[p].checked),
      image: imageUrl,
    };

    fetch(`${import.meta.env.VITE_API_URL}/tickets/${selectedTicket._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTicket),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Ticket updated");
        setSelectedTicket(null);
        fetchTickets();
      })
      .catch(() => toast.error("Update failed"));
  };

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    if (!confirm("Delete this ticket?")) return;

    fetch(`${import.meta.env.VITE_API_URL}/tickets/${id}`, {
      method: "DELETE",
    }).then(() => {
      toast.success("Ticket deleted");
      fetchTickets();
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Added Tickets</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tickets.map((t) => (
          <div key={t._id} className="card bg-base-100 shadow">
            <figure>
              <img src={t.image} className="h-40 w-full object-cover" />
            </figure>

            <div className="card-body">
              <h3 className="font-bold">{t.title}</h3>
              <p>
                {t.from} → {t.to}
              </p>
              <p>Price: ৳{t.price}</p>

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

              <div className="card-actions mt-4">
                <button
                  disabled={t.status === "rejected"}
                  onClick={() => setSelectedTicket(t)}
                  className="btn btn-sm btn-info"
                >
                  Update
                </button>

                <button
                  disabled={t.status === "rejected"}
                  onClick={() => handleDelete(t._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= UPDATE MODAL ================= */}
      {selectedTicket && (
        <dialog open className="modal">
          <div className="modal-box max-w-3xl">
            <h3 className="font-bold text-lg mb-4">Update Ticket</h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                name="title"
                defaultValue={selectedTicket.title}
                className="input input-bordered w-full"
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  name="from"
                  defaultValue={selectedTicket.from}
                  className="input input-bordered"
                />
                <input
                  name="to"
                  defaultValue={selectedTicket.to}
                  className="input input-bordered"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <select
                  name="type"
                  defaultValue={selectedTicket.type}
                  className="select select-bordered"
                >
                  <option>bus</option>
                  <option>train</option>
                  <option>launch</option>
                </select>

                <input
                  type="number"
                  name="price"
                  defaultValue={selectedTicket.price}
                  className="input input-bordered"
                />

                <input
                  type="number"
                  name="seats"
                  defaultValue={selectedTicket.seats}
                  className="input input-bordered"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  name="date"
                  defaultValue={selectedTicket.date}
                  className="input input-bordered"
                />
                <input
                  type="time"
                  name="time"
                  defaultValue={selectedTicket.time}
                  className="input input-bordered"
                />
              </div>

              {/* Perks */}
              <div className="grid grid-cols-3 gap-2">
                {perksList.map((perk) => (
                  <label key={perk} className="flex gap-2">
                    <input
                      type="checkbox"
                      name={perk}
                      defaultChecked={selectedTicket.perks?.includes(perk)}
                    />
                    {perk}
                  </label>
                ))}
              </div>

              {/* Image */}
              <div>
                <img src={selectedTicket.image} className="h-32 rounded mb-2" />
                <input type="file" name="image" />
                {uploading && <p className="text-sm">Uploading...</p>}
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTicket(null)}
                  className="btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyAddedTickets;
