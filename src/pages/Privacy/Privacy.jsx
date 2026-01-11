import { useEffect } from "react";

const Privacy = () => {
  useEffect(() => {
    document.title = "SeatPao | Privacy Policy";
  }, []);

  return (
    <>
      <div className="min-h-screen max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Privacy Policy & Terms
        </h1>

        <div className="space-y-4 text-gray-600">
          <p>
            SeatPao respects your privacy. We collect only necessary information
            required to provide our services.
          </p>

          <p>
            User account data is securely handled and never shared with third
            parties without consent.
          </p>

          <p>
            Users are responsible for maintaining the confidentiality of their
            account credentials.
          </p>

          <p>
            SeatPao is not responsible for third-party service issues including
            payment gateways or event cancellations.
          </p>
        </div>
      </div>
    </>
  );
};

export default Privacy;
