import { Link } from "react-router-dom";

const TicketCard = () => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
      <figure className="h-70 overflow-hidden">
        <img
          src="https://i.ibb.co.com/5WXbQsrz/bus-t.jpg"
          alt="ticket"
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">Sample Ticket Title</h2>

        <p className="text-sm text-gray-500">Transport: Bus</p>
        <p className="text-sm text-gray-500">Price: $50</p>
        <p className="text-sm text-gray-500">Quantity: 20</p>

        <div className="card-actions justify-end mt-4">
          <Link to="/ticket/123" className="btn btn-primary btn-sm">
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
