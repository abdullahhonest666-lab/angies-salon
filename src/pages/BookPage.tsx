import React, { useState, useEffect } from 'react';
import { 
  Check, Calendar, Clock, User, Phone, Mail, FileText, 
  Sparkles, ArrowRight, ArrowLeft, MessageCircle, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { Service, Appointment } from '../types';
import { STYLISTS, SALON_INFO } from '../data/staticContent';
import { api } from '../services/api';

interface BookPageProps {
  services: Service[];
  initialServiceId?: string;
  onNavigateHome: () => void;
}

export const BookPage: React.FC<BookPageProps> = ({
  services,
  initialServiceId,
  onNavigateHome,
}) => {
  // Wizard steps: 1: Service, 2: Stylist & Date/Time, 3: Details, 4: Confirmed
  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || '');
  const [selectedStylist, setSelectedStylist] = useState<string>('Any Available Specialist');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('+92 ');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Created appointment result
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
    }
  }, [initialServiceId]);

  // Set default min date to today
  const today = new Date().toISOString().split('T')[0];

  // Available slots for Karachi salon
  const timeSlots = [
    { period: 'Morning', slots: ['10:30 AM', '11:15 AM', '12:00 PM', '12:45 PM'] },
    { period: 'Afternoon', slots: ['01:30 PM', '02:30 PM', '03:15 PM', '04:00 PM', '04:45 PM'] },
    { period: 'Evening', slots: ['05:30 PM', '06:15 PM', '07:00 PM', '07:45 PM'] },
  ];

  const selectedService = services.find((s) => s.id === selectedServiceId);

  // Step 1 Validation
  const canProceedStep1 = Boolean(selectedServiceId);

  // Step 2 Validation
  const canProceedStep2 = Boolean(selectedDate && selectedTimeSlot);

  // Step 3 Validation
  const canProceedStep3 = Boolean(
    customerName.trim().length >= 2 &&
    customerPhone.trim().length >= 9
  );

  const handleSubmitBooking = async () => {
    if (!selectedService) return;
    setSubmitting(true);
    setErrorMessage('');

    try {
      const response = await api.createAppointment({
        customerName,
        customerPhone,
        customerEmail,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        servicePricePKR: selectedService.pricePKR,
        stylist: selectedStylist,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        notes,
      });

      setConfirmedAppointment(response.appointment);
      setStep(4);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to complete appointment. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const generateWhatsAppUrl = (apt: Appointment) => {
    const text = `Assalam-o-Alaikum Angie's Salon!
I have reserved an appointment on your website:
• Ref: ${apt.id}
• Client: ${apt.customerName}
• Service: ${apt.serviceName} (PKR ${apt.servicePricePKR.toLocaleString()})
• Stylist: ${apt.stylist}
• Date: ${apt.date} at ${apt.timeSlot}
• Phone: ${apt.customerPhone}
${apt.notes ? `• Notes: ${apt.notes}` : ''}

Please confirm my slot. Thank you!`;

    return `https://wa.me/${SALON_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#9A4E65]">
          Online Reservations
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E1E24]">
          Book Your Sanctuary Experience
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5256]">
          Khadda Market, Khayaban-e-Shamsheer, DHA Phase 5, Karachi
        </p>
      </div>

      {/* Step Indicator Progress Bar */}
      {step < 4 && (
        <div className="bg-white rounded-2xl p-4 border border-[#F8E1E7] shadow-xs">
          <div className="flex items-center justify-between max-w-lg mx-auto relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#F8E1E7] -translate-y-1/2 -z-0" />
            
            {[
              { num: 1, label: 'Service' },
              { num: 2, label: 'Stylist & Time' },
              { num: 3, label: 'Your Details' },
            ].map((s) => {
              const isPassed = step > s.num;
              const isCurrent = step === s.num;
              return (
                <div key={s.num} className="flex flex-col items-center relative z-1 bg-white px-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isPassed
                        ? 'bg-[#9A4E65] text-white'
                        : isCurrent
                        ? 'bg-[#9A4E65] text-white ring-4 ring-[#F8E1E7]'
                        : 'bg-[#FFF9F5] text-gray-400 border border-gray-200'
                    }`}
                  >
                    {isPassed ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span
                    className={`text-[11px] mt-1 whitespace-nowrap font-medium ${
                      isCurrent ? 'text-[#9A4E65] font-semibold' : 'text-[#8C827D]'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= STEP 1: SERVICE SELECTION ================= */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F8E1E7] shadow-xs space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-[#F8E1E7] pb-4">
            <h2 className="text-xl font-serif font-bold text-[#1E1E24]">
              Step 1: Choose Your Treatment
            </h2>
            <p className="text-xs text-[#6B6368] mt-1">
              Select the service you wish to book. Pricing in PKR is fully transparent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[480px] overflow-y-auto pr-1">
            {services.map((service) => {
              const isSelected = selectedServiceId === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#9A4E65] bg-[#FFF9F5] shadow-xs ring-1 ring-[#9A4E65]'
                      : 'border-[#F8E1E7] hover:border-[#C9A9A6] bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-[#9A4E65] font-semibold uppercase tracking-wider text-[10px]">
                        {service.category}
                      </span>
                      <span className="text-[#8C827D] text-[11px]">
                        {service.durationMinutes} mins
                      </span>
                    </div>
                    <h3 className="text-sm font-serif font-bold text-[#1E1E24] leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-xs text-[#5E565B] mt-1 line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#F8E1E7] flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1E1E24] font-mono tabular-nums">
                      PKR {service.pricePKR.toLocaleString()}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        isSelected
                          ? 'bg-[#9A4E65] text-white'
                          : 'border border-gray-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              disabled={!canProceedStep1}
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#9A4E65] hover:bg-[#853E54] disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-all cursor-pointer shadow-xs"
            >
              <span>Continue to Schedule</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2: STYLIST, DATE & TIME ================= */}
      {step === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F8E1E7] shadow-xs space-y-8 animate-in fade-in duration-200">
          <div className="border-b border-[#F8E1E7] pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#1E1E24]">
                Step 2: Specialist & Preferred Schedule
              </h2>
              <p className="text-xs text-[#6B6368] mt-1">
                Selected: <span className="font-semibold text-[#1E1E24]">{selectedService?.name}</span> (PKR {selectedService?.pricePKR.toLocaleString()})
              </p>
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs text-[#9A4E65] hover:underline"
            >
              Change Service
            </button>
          </div>

          {/* Stylist Selector */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#1E1E24] block">
              Select Preferred Stylist
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setSelectedStylist('Any Available Specialist')}
                className={`p-3 text-left rounded-xl border text-xs transition-all cursor-pointer ${
                  selectedStylist === 'Any Available Specialist'
                    ? 'border-[#9A4E65] bg-[#FFF9F5] font-semibold text-[#9A4E65]'
                    : 'border-[#F8E1E7] hover:border-[#C9A9A6] text-[#4A4448]'
                }`}
              >
                <p className="font-medium">First Available Specialist</p>
                <p className="text-[10px] text-[#8C827D] mt-0.5">Quickest appointment opening</p>
              </button>

              {STYLISTS.map((stylist) => (
                <button
                  key={stylist.id}
                  type="button"
                  onClick={() => setSelectedStylist(stylist.name)}
                  className={`p-3 text-left rounded-xl border text-xs transition-all cursor-pointer ${
                    selectedStylist === stylist.name
                      ? 'border-[#9A4E65] bg-[#FFF9F5] font-semibold text-[#9A4E65]'
                      : 'border-[#F8E1E7] hover:border-[#C9A9A6] text-[#4A4448]'
                  }`}
                >
                  <p className="font-medium">{stylist.name}</p>
                  <p className="text-[10px] text-[#8C827D] mt-0.5">{stylist.specialty}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Date Picker */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#1E1E24] block">
              Select Appointment Date
            </label>
            <div className="max-w-xs relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A4E65]" />
              <input
                type="date"
                min={today}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-[#F8E1E7] rounded-xl text-xs text-[#1E1E24] focus:outline-hidden focus:ring-2 focus:ring-[#9A4E65]"
              />
            </div>
          </div>

          {/* Time Slot Picker */}
          <div className="space-y-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#1E1E24] block">
              Select Preferred Time Slot
            </label>
            <div className="space-y-3">
              {timeSlots.map((group) => (
                <div key={group.period} className="space-y-1.5">
                  <span className="text-[11px] font-medium text-[#8C827D] uppercase tracking-wider">
                    {group.period}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {group.slots.map((slot) => {
                      const isSlotActive = selectedTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2 px-3 text-xs rounded-xl font-medium transition-all cursor-pointer text-center ${
                            isSlotActive
                              ? 'bg-[#9A4E65] text-white shadow-xs'
                              : 'bg-[#FFF9F5] text-[#1E1E24] border border-[#F8E1E7] hover:border-[#9A4E65]'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#F8E1E7] flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B6368] hover:text-[#1E1E24]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              disabled={!canProceedStep2}
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#9A4E65] hover:bg-[#853E54] disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-all cursor-pointer shadow-xs"
            >
              <span>Continue to Contact</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 3: CLIENT PARTICULARS ================= */}
      {step === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F8E1E7] shadow-xs space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-[#F8E1E7] pb-4">
            <h2 className="text-xl font-serif font-bold text-[#1E1E24]">
              Step 3: Client Information
            </h2>
            <p className="text-xs text-[#6B6368] mt-1">
              Please provide your contact details for appointment confirmation and SMS/WhatsApp reminders.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1E1E24] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#9A4E65]" />
                <span>Full Name *</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Mahnoor Khan"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#F8E1E7] rounded-xl text-xs text-[#1E1E24] focus:outline-hidden focus:ring-2 focus:ring-[#9A4E65]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1E1E24] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#9A4E65]" />
                <span>Phone / WhatsApp *</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+92 300 1234567"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#F8E1E7] rounded-xl text-xs text-[#1E1E24] focus:outline-hidden focus:ring-2 focus:ring-[#9A4E65]"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-[#1E1E24] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#9A4E65]" />
                <span>Email Address (Optional)</span>
              </label>
              <input
                type="email"
                placeholder="e.g. mahnoor@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#F8E1E7] rounded-xl text-xs text-[#1E1E24] focus:outline-hidden focus:ring-2 focus:ring-[#9A4E65]"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-[#1E1E24] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#9A4E65]" />
                <span>Special Instructions or Skin/Hair Sensitivities</span>
              </label>
              <textarea
                rows={3}
                placeholder="Mention allergies, bridal event date, preferred hair length, or questions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#F8E1E7] rounded-xl text-xs text-[#1E1E24] focus:outline-hidden focus:ring-2 focus:ring-[#9A4E65]"
              />
            </div>
          </div>

          {/* Booking Summary Box */}
          <div className="p-4 rounded-2xl bg-[#FFF9F5] border border-[#F8E1E7] space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#9A4E65]">
              Reservation Breakdown
            </h4>
            <div className="text-xs text-[#4A4448] space-y-1">
              <div className="flex justify-between">
                <span>Treatment:</span>
                <span className="font-semibold text-[#1E1E24]">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Specialist:</span>
                <span className="font-semibold text-[#1E1E24]">{selectedStylist}</span>
              </div>
              <div className="flex justify-between">
                <span>Schedule:</span>
                <span className="font-semibold text-[#1E1E24]">{selectedDate} at {selectedTimeSlot}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#F8E1E7] text-sm">
                <span className="font-semibold">Estimated Amount:</span>
                <span className="font-bold text-[#9A4E65] font-mono tabular-nums">
                  PKR {selectedService?.pricePKR.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F8E1E7] flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B6368] hover:text-[#1E1E24]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              disabled={!canProceedStep3 || submitting}
              onClick={handleSubmitBooking}
              className="inline-flex items-center gap-2 px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#9A4E65] hover:bg-[#853E54] disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-all cursor-pointer shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>{submitting ? 'Confirming...' : 'Confirm Appointment'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 4: SUCCESS CONFIRMATION ================= */}
      {step === 4 && confirmedAppointment && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#F8E1E7] shadow-xl text-center space-y-8 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#9A4E65]">
              Booking Successfully Reserved
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#1E1E24]">
              We Look Forward to Welcoming You
            </h2>
            <p className="text-xs sm:text-sm text-[#5A5256] max-w-lg mx-auto">
              Your appointment has been registered in our DHA Phase 5 booking directory. Our front desk concierge has been notified.
            </p>
          </div>

          {/* Reference Card */}
          <div className="max-w-md mx-auto bg-[#FFF9F5] rounded-2xl p-6 border border-[#F8E1E7] text-left space-y-3">
            <div className="flex items-center justify-between border-b border-[#F8E1E7] pb-3">
              <span className="text-xs text-[#8C827D]">Booking Reference</span>
              <span className="text-base font-bold text-[#9A4E65] font-mono tracking-wider">
                {confirmedAppointment.id}
              </span>
            </div>
            <div className="text-xs space-y-1.5 text-[#4A4448]">
              <div className="flex justify-between">
                <span className="text-[#8C827D]">Client:</span>
                <span className="font-semibold text-[#1E1E24]">{confirmedAppointment.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C827D]">Service:</span>
                <span className="font-semibold text-[#1E1E24]">{confirmedAppointment.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C827D]">Specialist:</span>
                <span className="font-semibold text-[#1E1E24]">{confirmedAppointment.stylist}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C827D]">Date & Time:</span>
                <span className="font-semibold text-[#1E1E24]">{confirmedAppointment.date} at {confirmedAppointment.timeSlot}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#F8E1E7]">
                <span className="text-[#8C827D]">Total Investment:</span>
                <span className="font-bold text-[#1E1E24] font-mono">PKR {confirmedAppointment.servicePricePKR.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Dispatch Button */}
          <div className="space-y-3 max-w-md mx-auto">
            <a
              href={generateWhatsAppUrl(confirmedAppointment)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-xs sm:text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20BD5A] rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Send Confirmation on WhatsApp</span>
            </a>
            <p className="text-[11px] text-[#8C827D]">
              Directly notifies Angie's Front Desk at {SALON_INFO.phonePrimary}
            </p>
          </div>

          <div className="pt-4 flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setStep(1);
                setSelectedServiceId('');
                setConfirmedAppointment(null);
              }}
              className="px-6 py-2.5 text-xs font-semibold text-[#9A4E65] border border-[#F8E1E7] hover:bg-[#FFF9F5] rounded-full transition-colors cursor-pointer"
            >
              Book Another Appointment
            </button>
            <button
              onClick={onNavigateHome}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#1E1E24] hover:bg-[#332E32] rounded-full transition-colors cursor-pointer"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
