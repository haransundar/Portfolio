import React, { useState } from 'react';
import { SiGmail, SiLinkedin, SiGithub, SiX } from 'react-icons/si';

const socialLinks = [
  { 
    name: 'Email', 
    href: 'mailto:haransundar536@gmail.com',
    icon: <SiGmail className="text-red-500" />,
    color: 'hover:text-red-500'
  },
  { 
    name: 'LinkedIn', 
    href: 'https://linkedin.com/in/haransundar',
    icon: <SiLinkedin className="text-blue-600" />,
    color: 'hover:text-blue-600'
  },
  { 
    name: 'GitHub', 
    href: 'https://github.com/haransundar',
    icon: <SiGithub className="text-gray-800 dark:text-white" />,
    color: 'hover:text-gray-800 dark:hover:text-white'
  },
  { 
    name: 'Twitter/X', 
    href: 'https://x.com/haransundar',
    icon: <SiX className="text-black dark:text-white" />,
    color: 'hover:text-black dark:hover:text-white'
  },
];

const contactInfo = [
  { label: 'Email', value: 'haransundar536@gmail.com' },
  { label: 'Phone', value: '+91 89032 50793' },
  { label: 'Location', value: 'Puliyankulam, Madurai' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields.');
      return;
    }
    // Placeholder: Replace with EmailJS or backend call
    setSuccess('Message sent! (Demo only)');
    setForm({ name: '', email: '', message: '' });
  }

  return (
    <section id="contact" className="mb-16 sm:mb-24">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">Contact</h2>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow p-4 sm:p-6 flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="px-3 sm:px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="px-3 sm:px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="px-3 sm:px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
          />
          {error && <p className="text-red-600 text-xs sm:text-sm">{error}</p>}
          {success && <p className="text-green-600 text-xs sm:text-sm">{success}</p>}
          <button type="submit" className="px-4 sm:px-6 py-2 bg-blue-600 text-white font-bold rounded-full shadow hover:bg-blue-700 transition-all text-sm sm:text-base">Send Message</button>
        </form>
        {/* Contact Info & Social Links */}
        <div className="flex-1 flex flex-col gap-4 sm:gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Contact Information</h3>
            <div className="space-y-2 sm:space-y-3">
              {contactInfo.map(info => (
                <div key={info.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-medium min-w-[60px] sm:min-w-[80px] text-xs sm:text-sm">{info.label}:</span>
                  <span className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">{info.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Connect with me:</h3>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 group ${link.color}`}
                >
                  <div className="text-lg group-hover:scale-110 transition-transform duration-200">
                    {link.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 