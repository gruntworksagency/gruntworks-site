export default function ServicesPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
        <p className="text-lg text-neutral-600 mb-12 text-center">
          This is a template Services page for the Marketing Site Factory.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h3 className="text-xl font-semibold mb-3">Service 1</h3>
            <p className="text-neutral-600">
              Service descriptions will be customized based on the business type
              and specific offerings.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h3 className="text-xl font-semibold mb-3">Service 2</h3>
            <p className="text-neutral-600">
              Each service will include detailed descriptions, pricing, and
              call-to-action buttons.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h3 className="text-xl font-semibold mb-3">Service 3</h3>
            <p className="text-neutral-600">
              Business-type specific services like landscaping, HVAC, roofing,
              or plumbing.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
