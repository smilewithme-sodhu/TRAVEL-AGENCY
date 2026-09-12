import React, { useState, useEffect } from 'react';
import { supportApi } from '../../api';
import { formatDate } from '../../utils/formatters';
import { WhatsAppConciergeButton } from '../ui/WhatsAppConciergeButton';
import { useWaypoint } from '../../context/WaypointContext';
import { Send } from 'lucide-react';

const SupportHeader = () => (
  <div className="pb-2 border-b border-slate-100">
    <h1 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight">
      Member Concierge & Support Desk
    </h1>
    <p className="text-xs text-slate-500 mt-0.5">
      Reach our dedicated luxury travel consultants on WhatsApp or submit a formal support inquiry.
    </p>
  </div>
);

const ConciergeBanner = () => (
  <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
    <div className="space-y-2 text-center sm:text-left">
      <span className="font-mono text-[10px] uppercase font-bold text-[#C9A455] tracking-widest block">
        24/7 DEDICATED CONCIERGE HOTLINE
      </span>
      <h3 className="font-sans font-bold text-xl text-white">
        Need Immediate Assistance with a Trip or Booking?
      </h3>
      <p className="text-xs text-slate-300 max-w-lg">
        Our luxury travel curators are available round-the-clock on WhatsApp to assist with itinerary modifications, private transfers, and bespoke travel requests.
      </p>
    </div>

    <WhatsAppConciergeButton
      size="lg"
      customMessage="Hi Wanderlust Travel Concierge, I need priority member support regarding my travel arrangements."
      className="shrink-0"
    />
  </div>
);

const CreateTicketForm = ({ onTicketCreated, showToast }) => {
  const [category, setCategory] = useState('BOOKING');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !message) {
      showToast('Please fill in both subject and description.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await supportApi.createTicket({ category, subject, message });
      if (res.success) {
        showToast(`Ticket #${res.data.ticketNumber} created successfully!`, 'success');
        setSubject('');
        setMessage('');
        if (onTicketCreated) {
          onTicketCreated();
        }
      }
    } catch {
      showToast('Failed to create ticket.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-5">
      <h3 className="font-sans font-extrabold text-base text-slate-900">
        Submit a Formal Member Inquiry
      </h3>

      <form onSubmit={handleTicketSubmit} className="space-y-4 text-xs">
        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
            Inquiry Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none"
          >
            <option value="BOOKING">Booking & Itinerary Modification</option>
            <option value="MEMBERSHIP">Membership & Travel Cycle</option>
            <option value="REWARD">Reward Calculation & Points</option>
            <option value="WALLET">Wallet & Bank Withdrawal</option>
            <option value="TECHNICAL">Technical & App Support</option>
            <option value="OTHER">General Inquiries</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Brief summary of your inquiry..."
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
            Detailed Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Describe your inquiry in detail..."
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{isSubmitting ? 'Submitting...' : 'Submit Support Ticket'}</span>
        </button>
      </form>
    </div>
  );
};

const TicketHistory = ({ tickets }) => (
  <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-4">
    <h3 className="font-sans font-extrabold text-base text-slate-900">
      Ticket History & Status
    </h3>

    <div className="divide-y divide-slate-100">
      {tickets.map((t) => (
        <div key={t.id} className="py-3.5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-xs text-slate-900">{t.ticketNumber}</span>
            <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full ${
              t.status === 'RESOLVED'
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-blue-50 text-blue-700'
            }`}>
              {t.status}
            </span>
          </div>
          <h4 className="font-bold text-xs text-slate-900">{t.subject}</h4>
          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{t.message}</p>
          <div className="text-[10px] text-slate-400 font-mono pt-1">
            Submitted {formatDate(t.createdAt)} • Category: {t.category}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const SupportPage = () => {
  const { showToast } = useWaypoint();
  const [tickets, setTickets] = useState([]);

  const fetchTickets = () => {
    supportApi.getTickets().then((res) => {
      if (res.success) setTickets(res.data);
    });
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      <SupportHeader />
      <ConciergeBanner />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <CreateTicketForm onTicketCreated={fetchTickets} showToast={showToast} />
        <TicketHistory tickets={tickets} />
      </div>
    </div>
  );
};
