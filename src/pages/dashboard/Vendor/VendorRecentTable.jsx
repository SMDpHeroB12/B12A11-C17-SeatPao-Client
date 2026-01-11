const VendorRecentTable = ({ tickets }) => {
  return (
    <div className="bg-base-100 p-6 rounded-xl shadow border border-gray-200">
      <h3 className="text-xl font-semibold mb-4">Recent Tickets</h3>

      {tickets.length === 0 ? (
        <p className="opacity-70">No recent tickets found.</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Route</th>
              <th>Price</th>
              <th>Transport</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t._id}>
                <td>{t.route}</td>
                <td>৳{t.price}</td>
                <td className="capitalize">{t.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VendorRecentTable;
