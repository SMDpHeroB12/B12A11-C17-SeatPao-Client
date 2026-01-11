const AdminActivityTable = ({ stats }) => {
  const activities = [
    { type: "User", value: `${stats.users} users registered` },
    { type: "Ticket", value: `${stats.tickets} tickets created` },
    { type: "Booking", value: `${stats.bookings} bookings made` },
    { type: "Revenue", value: `৳${stats.revenue} earned` },
  ];

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow border border-gray-200">
      <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Type</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((a, i) => (
            <tr key={i}>
              <td className="font-medium">{a.type}</td>
              <td className="opacity-70">{a.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminActivityTable;
