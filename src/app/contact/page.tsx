import ContactForm from './ContactForm'

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-cream text-center">Contact Us</h1>
        
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div>
            <ContactForm />
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-cream">Get in Touch</h2>
              <p className="text-neutral-300 mb-4">
                Ready to take your business to the next level? We're here to help you succeed with tailored solutions and expert guidance.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-cream">Business Info</h2>
              <div className="space-y-3 text-neutral-300">
                <p className="flex items-center">
                  <span className="w-20 text-orange-500 font-medium">Phone:</span>
                  (555) 123-4567
                </p>
                <p className="flex items-center">
                  <span className="w-20 text-orange-500 font-medium">Email:</span>
                  info@gruntworksagency.com
                </p>
                <p className="flex items-start">
                  <span className="w-20 text-orange-500 font-medium">Address:</span>
                  <span>123 Business St,<br />City, State 12345</span>
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-cream">Office Hours</h2>
              <div className="space-y-2 text-neutral-300">
                <p><span className="text-orange-500 font-medium">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
                <p><span className="text-orange-500 font-medium">Saturday:</span> 10:00 AM - 4:00 PM</p>
                <p><span className="text-orange-500 font-medium">Sunday:</span> Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
