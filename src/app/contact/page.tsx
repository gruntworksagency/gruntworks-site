export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <p className="text-lg text-neutral-600 mb-8">
          This is a template Contact page for the Marketing Site Factory.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-neutral-600 mb-4">
              Contact form and business information will be customized for each
              client.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Business Info</h2>
            <div className="space-y-2 text-neutral-600">
              <p>Phone: (555) 123-4567</p>
              <p>Email: info@business.com</p>
              <p>Address: 123 Business St, City, State 12345</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
