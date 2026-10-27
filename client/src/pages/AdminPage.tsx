import React, { useState, useEffect } from 'react';
import { 
  Lock, LogOut, CheckCircle, XCircle, Clock, Trash2, 
  Search, RefreshCw, MessageSquare, DollarSign, Calendar, Users, 
  Phone, Mail, Check, AlertCircle 
} from 'lucide-react';
import { Appointment, AppointmentStatus, AdminUser, ContactMessage } from '../types';
import { api } from '../services/api';

export const AdminPage: React.FC = () => {
  // Auth state
  const [token, setToken] = useState<string>(() => localStorage.getItem('angie_admin_token') || '');
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loginEmail, setLoginEmail] = useState('admin@angiesalon.com');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard state
  const [activeTab, setActiveTab] = useState<'appointments' | 'messages'>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState('');
  const [actionFeedback, setActionFeedback] = useState('');

  // Check auth on mount
  useEffect(() => {
    if (token) {
      api.verifyAuth(token)
        .then((res) => {
          setUser(res.user);
          loadDashboardData(token);
        })
        .catch(() => {
          localStorage.removeItem('angie_admin_token');
          setToken('');
          setUser(null);
        });
    }
  }, [token]);

  const loadDashboardData = async (activeAuthToken: string) => {
    setLoadingData(true);
    try {
      const [apts, msgs, st] = await Promise.all([
        api.getAppointments(activeAuthToken),
        api.getContactMessages(activeAuthToken),
        api.getStats(activeAuthToken),
      ]);
      setAppointments(apts);
      setMessages(msgs);
      setStats(st);
    } catch (err: any) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await api.login(loginEmail, loginPassword);
      localStorage.setItem('angie_admin_token', res.token);
      setToken(res.token);
      setUser(res.user);
      loadDashboardData(res.token);
    } catch (err: any) {
      setLoginError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoginEmail('admin@angiesalon.com');
    setLoginPassword('admin123');
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await api.login('admin@angiesalon.com', 'admin123');
      localStorage.setItem('angie_admin_token', res.token);
      setToken(res.token);
      setUser(res.user);
      loadDashboardData(res.token);
    } catch (err: any) {
      setLoginError(err.message || 'Demo login failed');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('angie_admin_token');
    setToken('');
    setUser(null);
  };

  const handleStatusChange = async (appointmentId: string, newStatus: AppointmentStatus) => {
    try {
      await api.updateAppointmentStatus(appointmentId, newStatus, token);
      setActionFeedback(`Appointment ${appointmentId} updated to ${newStatus}`);
      setTimeout(() => setActionFeedback(''), 3000);
      loadDashboardData(token);
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
  };

  const handleDeleteAppointment = async (appointmentId: string) => {
    if (!window.confirm(`Are you sure you want to delete appointment ${appointmentId}?`)) return;
    try {
      await api.deleteAppointment(appointmentId, token);
      setActionFeedback(`Appointment ${appointmentId} deleted`);
      setTimeout(() => setActionFeedback(''), 3000);
      loadDashboardData(token);
    } catch (err: any) {
      alert(err.message || 'Failed to delete appointment');
    }
  };

  const handleMarkMessageRead = async (messageId: string) => {
    try {
      await api.markMessageRead(messageId, token);
      loadDashboardData(token);
    } catch (err: any) {
      console.error(err);
    }
  };

  // Filter appointments
  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    const matchesSearch =
      apt.customerName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      apt.customerPhone.includes(searchFilter) ||
      apt.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      apt.serviceName.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // ================= LOGIN SCREEN =================
  if (!token || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#F8E1E7] shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-3">
              <img
                src="/assets/aistudio/Angie_s_Salon_98601cce.png"
                alt="Angie's Salon"
                className="h-14 w-auto object-contain"
              />
            </div>
            <h1 className="text-xl font-serif font-bold text-[#1E1E24]">
              Staff Management Portal
            </h1>
            <p className="text-xs text-[#6B6368]">
              Angie's Salon · DHA Phase 5 Karachi Admin Command
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1E1E24]">Staff Email</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#F8E1E7] rounded-xl text-xs text-[#1E1E24] focus:outline-hidden focus:ring-2 focus:ring-[#9A4E65]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1E1E24]">Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#F8E1E7] rounded-xl text-xs text-[#1E1E24] focus:outline-hidden focus:ring-2 focus:ring-[#9A4E65]"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#9A4E65] hover:bg-[#853E54] rounded-full transition-all cursor-pointer shadow-md"
            >
              {loginLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="pt-4 border-t border-[#F8E1E7] space-y-3">
            <div className="text-center">
              <span className="text-[11px] text-[#8C827D] uppercase tracking-wider">
                Instant Preview Access
              </span>
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 text-xs font-semibold text-[#9A4E65] bg-[#FFF9F5] border border-[#F8E1E7] hover:bg-[#F8E1E7] rounded-full transition-colors cursor-pointer"
            >
              1-Click Demo Login (admin@angiesalon.com)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= AUTHENTICATED DASHBOARD =================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#F8E1E7] shadow-xs">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#9A4E65]">
            Administrative Portal
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#1E1E24]">
            Welcome, {user.name}
          </h1>
          <p className="text-xs text-[#6B6368] mt-0.5">
            DHA Phase 5 Karachi · Live Appointment Directory
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => loadDashboardData(token)}
            disabled={loadingData}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#1E1E24] bg-[#FFF9F5] hover:bg-[#F8E1E7] rounded-full border border-[#F8E1E7] transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-full border border-red-200 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {actionFeedback && (
        <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* KPI Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#F8E1E7] shadow-xs space-y-1">
            <span className="text-[11px] text-[#8C827D] uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#9A4E65]" />
              Total Bookings
            </span>
            <p className="text-2xl font-bold font-mono text-[#1E1E24]">{stats.total}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#F8E1E7] shadow-xs space-y-1">
            <span className="text-[11px] text-[#D4AF37] uppercase tracking-wider flex items-center gap-1 font-semibold">
              <Clock className="w-3 h-3" />
              Pending
            </span>
            <p className="text-2xl font-bold font-mono text-[#1E1E24]">{stats.pending}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#F8E1E7] shadow-xs space-y-1">
            <span className="text-[11px] text-emerald-600 uppercase tracking-wider flex items-center gap-1 font-semibold">
              <CheckCircle className="w-3 h-3" />
              Confirmed
            </span>
            <p className="text-2xl font-bold font-mono text-[#1E1E24]">{stats.confirmed}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#F8E1E7] shadow-xs space-y-1">
            <span className="text-[11px] text-blue-600 uppercase tracking-wider flex items-center gap-1 font-semibold">
              <Check className="w-3 h-3" />
              Completed
            </span>
            <p className="text-2xl font-bold font-mono text-[#1E1E24]">{stats.completed}</p>
          </div>

          <div className="col-span-2 lg:col-span-1 bg-white p-5 rounded-2xl border border-[#F8E1E7] shadow-xs space-y-1">
            <span className="text-[11px] text-[#9A4E65] uppercase tracking-wider flex items-center gap-1 font-semibold">
              <DollarSign className="w-3 h-3" />
              Est. Revenue
            </span>
            <p className="text-xl font-bold font-mono text-[#9A4E65]">
              PKR {stats.estimatedRevenuePKR.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#F8E1E7] pb-2">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-4 py-2 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
            activeTab === 'appointments'
              ? 'bg-[#9A4E65] text-white'
              : 'text-[#6B6368] hover:text-[#1E1E24]'
          }`}
        >
          Appointments ({appointments.length})
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
            activeTab === 'messages'
              ? 'bg-[#9A4E65] text-white'
              : 'text-[#6B6368] hover:text-[#1E1E24]'
          }`}
        >
          Client Messages ({messages.length})
        </button>
      </div>

      {/* ================= TAB 1: APPOINTMENTS ================= */}
      {activeTab === 'appointments' && (
        <div className="bg-white rounded-3xl p-6 border border-[#F8E1E7] shadow-xs space-y-6">
          {/* Controls & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-72 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by client, phone, ref, service..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#FFF9F5] border border-[#F8E1E7] rounded-xl text-xs text-[#1E1E24] focus:outline-hidden"
              />
            </div>

            {/* Status filters */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    statusFilter === st
                      ? 'bg-[#1E1E24] text-white'
                      : 'bg-[#FFF9F5] text-[#6B6368] hover:text-[#1E1E24]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FFF9F5] text-[#8C827D] uppercase tracking-wider text-[10px] border-b border-[#F8E1E7]">
                <tr>
                  <th className="py-3 px-4">Ref Code</th>
                  <th className="py-3 px-4">Client Details</th>
                  <th className="py-3 px-4">Treatment & Fee</th>
                  <th className="py-3 px-4">Specialist</th>
                  <th className="py-3 px-4">Date & Slot</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8E1E7]">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-[#8C827D]">
                      No appointments match your search or filter.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((apt) => {
                    const statusColors = {
                      Pending: 'bg-amber-50 text-amber-700 border-amber-200',
                      Confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                      Completed: 'bg-blue-50 text-blue-700 border-blue-200',
                      Cancelled: 'bg-red-50 text-red-700 border-red-200',
                    }[apt.status] || 'bg-gray-100 text-gray-700';

                    return (
                      <tr key={apt.id} className="hover:bg-[#FFF9F5]/60 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-[#9A4E65]">
                          {apt.id}
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-semibold text-[#1E1E24]">{apt.customerName}</p>
                          <p className="text-[11px] text-[#6B6368] flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {apt.customerPhone}
                          </p>
                          {apt.customerEmail && (
                            <p className="text-[11px] text-[#8C827D]">{apt.customerEmail}</p>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-medium text-[#1E1E24]">{apt.serviceName}</p>
                          <p className="font-mono font-semibold text-[#9A4E65]">
                            PKR {apt.servicePricePKR.toLocaleString()}
                          </p>
                        </td>
                        <td className="py-3 px-4 text-[#4A4448]">
                          {apt.stylist}
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-medium text-[#1E1E24]">{apt.date}</p>
                          <p className="text-[11px] text-[#8C827D]">{apt.timeSlot}</p>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${statusColors}`}
                          >
                            {apt.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {apt.status === 'Pending' && (
                              <button
                                onClick={() => handleStatusChange(apt.id, 'Confirmed')}
                                title="Confirm Appointment"
                                className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {apt.status !== 'Completed' && (
                              <button
                                onClick={() => handleStatusChange(apt.id, 'Completed')}
                                title="Mark Completed"
                                className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {apt.status !== 'Cancelled' && (
                              <button
                                onClick={() => handleStatusChange(apt.id, 'Cancelled')}
                                title="Cancel Appointment"
                                className="p-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteAppointment(apt.id)}
                              title="Delete Record"
                              className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 2: CONTACT INQUIRIES ================= */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-3xl p-6 border border-[#F8E1E7] shadow-xs space-y-4">
          <h3 className="text-base font-serif font-bold text-[#1E1E24]">
            Client Contact Inquiries
          </h3>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-xs text-[#8C827D] py-8 text-center">
                No contact messages yet.
              </p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    msg.read ? 'bg-white border-[#F8E1E7]' : 'bg-[#FFF9F5] border-[#9A4E65]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-[#1E1E24]">{msg.name}</span>
                      <span className="text-[11px] text-[#8C827D]">· {msg.phone}</span>
                      {msg.email && (
                        <span className="text-[11px] text-[#8C827D]">· {msg.email}</span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#8C827D]">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-[#9A4E65] mb-1">
                    Subject: {msg.subject}
                  </p>
                  <p className="text-xs text-[#4A4448] leading-relaxed">
                    {msg.message}
                  </p>

                  {!msg.read && (
                    <div className="mt-3 pt-3 border-t border-[#F8E1E7] flex justify-end">
                      <button
                        onClick={() => handleMarkMessageRead(msg.id)}
                        className="text-[11px] font-semibold text-[#9A4E65] hover:underline"
                      >
                        Mark as Read
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
