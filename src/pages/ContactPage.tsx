import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { SALON_INFO } from '../data/staticContent';
import { api } from '../services/api';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+92 ');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      await api.sendContact({
        name,
        email,
        phone,
        subject,
        message,
      });

      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('+92 ');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#9A4E65]">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E1E24]">
          Contact & Visit Our DHA Studio
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5256] leading-relaxed">
          Located at the vibrant Khadda Market on Khayaban-e-Shamsheer. We welcome inquiries for bridal transformations, private bookings, and custom consultations.
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Address */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F8E1E7] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FFF9F5] border border-[#F8E1E7] text-[#9A4E65] flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-base font-serif font-bold text-[#1E1E24]">Studio Location</h3>
          <p className="text-xs text-[#5E565B] leading-relaxed">
            {SALON_INFO.address}
          </p>
          <p className="text-[11px] text-[#8C827D] pt-1">
            * Dedicated valet assistance available at entrance
          </p>
        </div>

        {/* Direct Phones */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F8E1E7] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FFF9F5] border border-[#F8E1E7] text-[#9A4E65] flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="text-base font-serif font-bold text-[#1E1E24]">Call & WhatsApp</h3>
          <div className="space-y-1.5 text-xs">
            <a
              href={`tel:${SALON_INFO.phonePrimary}`}
              className="block font-semibold text-[#1E1E24] hover:text-[#9A4E65] transition-colors"
            >
              Mobile: {SALON_INFO.phonePrimary}
            </a>
            <a
              href={`tel:${SALON_INFO.phoneLandline}`}
              className="block text-[#5E565B] hover:text-[#9A4E65] transition-colors"
            >
              Landline: {SALON_INFO.phoneLandline}
            </a>
          </div>
          <p className="text-[11px] text-[#8C827D] pt-1">
            Lines open daily during salon operating hours
          </p>
        </div>

        {/* Operating Hours */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F8E1E7] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FFF9F5] border border-[#F8E1E7] text-[#9A4E65] flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-serif font-bold text-[#1E1E24]">Salon Hours</h3>
          <ul className="space-y-1.5 text-xs text-[#5E565B]">
            {SALON_INFO.hours.map((h, i) => (
              <li key={i} className="flex justify-between">
                <span>{h.days}:</span>
                <span className="font-semibold text-[#1E1E24]">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Two-Column Form & Embedded Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Contact Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#F8E1E7] shadow-xs space-y-6">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#1E1E24]">
              Send Us a Note
            </h2>
            <p className="text-xs text-[#6B6368] mt-1">
              Have questions regarding bridal bookings, color consultations, or party packages? We will reply promptly.
            </p>
          </div>

          {success && (
            <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Thank you! Your message has been received. Our reception team will get back to you shortly.</span>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-800 rounded-2xl border border-red-200 text-xs flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1E1E24]">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fatima Tariq"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-[#F8E1E7] rounded-xl text-xs text-[#1E1E24] focus:outline-hidden focus:ring-2 focus:ring-[#9A4E65]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1E1E24]">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+92 300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-[#F8E1E7] rounded-xl text-xs text-[#1E1E24] focus:outline-hidden focus:ring-2 focus:ring-[#9A4E65]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1E1E24]">Email Address (Optional)</label>
              <input
                type="email"
                placeholder="e.g. fatima@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#F8E1E7] rounded-xl text-xs text-[#1E1E24] focus:outline-hidden focus:ring-2 focus:ring-[#9A4E65]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1E1E24]">Subject</label>
              <input
                type="text"
                placeholder="e.g. Bridal Package Inquiry for 3 Days"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#F8E1E7] rounded-xl text-xs text-[#1E1E24] focus:outline-hidden focus:ring-2 focus:ring-[#9A4E65]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1E1E24]">Message *</label>
              <textarea
                rows={4}
                required
                placeholder="Type your message or inquiry here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#F8E1E7] rounded-xl text-xs text-[#1E1E24] focus:outline-hidden focus:ring-2 focus:ring-[#9A4E65]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#9A4E65] hover:bg-[#853E54] disabled:opacity-50 rounded-full transition-all cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Sending...' : 'Send Message'}</span>
            </button>
          </form>
        </div>

        {/* Embedded Google Map for DHA Phase 5 Karachi */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl overflow-hidden border border-[#F8E1E7] shadow-xs h-[420px] relative">
            <iframe
              title="Angie's Salon Khadda Market DHA Phase 5 Karachi Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=24.8144609,67.0508242&t=&z=17&ie=UTF8&iwloc=&output=embed"
            />
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9F5] border border-[#F8E1E7] text-xs text-[#6B6368] flex items-center justify-between">
            <div>
              <p className="font-semibold text-[#1E1E24]">Directions Landmark</p>
              <p>Khadda Market, Khayaban-e-Shamsheer, near Stadium Commercial Area, DHA Phase 5</p>
            </div>
            <a
              href={SALON_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-semibold text-[#9A4E65] hover:underline whitespace-nowrap"
            >
              Open in Maps
            </a>
          </div>
          <a
            href={SALON_INFO.lookupUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex text-xs font-semibold text-[#9A4E65] hover:underline"
          >
            View our Lookup.pk business listing
          </a>
        </div>
      </div>
    </div>
  );
};
