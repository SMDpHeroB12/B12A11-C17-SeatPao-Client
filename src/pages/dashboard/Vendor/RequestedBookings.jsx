import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";

const RequestedBookings = () => {
  const { user } = useContext(AuthContext);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load Pending Booking Requests for Vendor
  useEffect(() => {
    if (!user?.email) return;

    fetch(`${import.meta.env.VITE_API_URL}/vendor/requests?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.email]);

  // ACCEPT Booking
  const handleAccept = (id) => {
    Swal.fire({
      title: "Accept Booking?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Accept",
    }).then((result) => {
      if (!result.isConfirmed) return;

      fetch(`${import.meta.env.VITE_API_URL}/vendor/requests/accept/${id}`, {
        method: "PATCH",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            Swal.fire("Accepted!", "Booking accepted!", "success");

            setRequests(requests.filter((r) => r._id !== id));
          }
        });
    });
  };

  // REJECT Booking
  const handleReject = (id) => {
    Swal.fire({
      title: "Reject Booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
    }).then((result) => {
      if (!result.isConfirmed) return;

      fetch(`${import.meta.env.VITE_API_URL}/vendor/requests/reject/${id}`, {
        method: "PATCH",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            Swal.fire("Rejected!", "Booking rejected!", "success");

            setRequests(requests.filter((r) => r._id !== id));
          }
        });
    });
  };

  if (loading) {
    return (
      <div className="text-center text-xl py-10">
        Loading Requested Bookings...
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Requested Bookings</h2>

      {requests.length === 0 ? (
        <p>No new booking requests.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow bg-base-200 p-4">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Ticket</th>
                <th>Qty</th>
                <th>Total (৳)</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((b, index) => (
                <tr key={b._id}>
                  <td>{index + 1}</td>
                  <td>
                    <p className="font-medium">{b.userName}</p>
                    <p className="text-sm opacity-70">{b.userEmail}</p>
                  </td>
                  <td>{b.ticketTitle}</td>
                  <td>{b.quantity}</td>
                  <td>৳{b.total}</td>

                  <td className="text-center flex gap-3 justify-center">
                    <button
                      onClick={() => handleAccept(b._id)}
                      className="btn btn-sm btn-success"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => handleReject(b._id)}
                      className="btn btn-sm btn-error"
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

export default RequestedBookings;
