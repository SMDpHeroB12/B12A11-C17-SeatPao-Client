import { Ticket, Package, DollarSign } from "lucide-react";

const VendorStats = ({ stats }) => {
  const cards = [
    { label: "My Tickets", value: stats.tickets, icon: <Ticket /> },
    { label: "Bookings", value: stats.bookings, icon: <Package /> },
    { label: "Revenue", value: `৳${stats.revenue}`, icon: <DollarSign /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((c, i) => (
        <div
          key={i}
          className="bg-base-100 p-6 rounded-xl shadow border border-gray-200 flex items-center gap-4"
        >
          <div className="p-3 bg-primary/10 rounded-lg text-primary">
            {c.icon}
          </div>
          <div>
            <p className="text-sm opacity-70">{c.label}</p>
            <h3 className="text-2xl font-bold">{c.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VendorStats;
