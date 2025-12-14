import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submission (e.g., API call)
    alert('Message sent!');
  };

  return (
    <section className="mt-20 mb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 gradient-text">Contact Us</h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto"></div>
          <p className="text-gray-600 mt-4 text-lg">We'd love to hear from you</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-soft p-8 lg:p-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Send us a message</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="border-2 border-gray-200 rounded-xl p-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-200"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="border-2 border-gray-200 rounded-xl p-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-200"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="6"
                className="md:col-span-2 border-2 border-gray-200 rounded-xl p-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-200 resize-none"
                required
              ></textarea>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl px-8 py-4 font-semibold hover:from-orange-700 hover:to-red-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
          <div className="bg-gradient-to-br from-orange-700 via-orange-600 to-red-700 text-white rounded-2xl p-8 lg:p-10 shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Reach Us</h2>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-lg" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Phone</p>
                  <a href="tel:+9779843340949" className="text-white/90 hover:text-white transition-colors">
                    +977 984-3340949
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-lg" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Email</p>
                  <a href="mailto:info@karigarkodukaan.com" className="text-white/90 hover:text-white transition-colors break-all">
                    info@karigarkodukaan.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-lg" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Address</p>
                  <p className="text-white/90">123 Karigar Ave, Handicraft City</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <img
                src="https://plus.unsplash.com/premium_photo-1679811672048-9d4b810a7588?q=80&w=800&auto=format&fit=crop"
                alt="Contact Illustration"
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
