import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submission (e.g., API call)
    alert('Message sent!');
  };

  return (
    <section className="mt-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-semibold mb-6">Contact Us</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="border rounded-lg p-3"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="border rounded-lg p-3"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="6"
              className="md:col-span-2 border rounded-lg p-3"
              required
            ></textarea>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-orange-700 text-white rounded-lg px-5 py-3 hover:bg-orange-800 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
        <div className="bg-gradient-to-b from-orange-800 to-red-700 text-white rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">Reach Us</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaPhone />
              <span>+977 984-3340949</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope />
              <span>info@karigarkodukaan.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt />
              <span>123 Karigar Ave, Handicraft City</span>
            </div>
          </div>
          <div className="mt-6">
            <img
              src="https://plus.unsplash.com/premium_photo-1679811672048-9d4b810a7588?q=80&w=800&auto=format&fit=crop"
              alt="Contact Illustration"
              className="w-full h-40 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
