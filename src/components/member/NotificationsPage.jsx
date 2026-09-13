import React, { useState, useEffect } from 'react';
import { notificationsApi } from '../../api';
import { formatDate } from '../../utils/formatters';
import { useWanderlust } from '../../context/WanderlustContext';
import { EmptyState } from '../ui/EmptyState';
import {
  Bell,
  CheckCircle2,
  CalendarCheck,
  DollarSign,
  ArrowUpRight,
  Sparkles,
  Check
} from 'lucide-react';

export const NotificationsPage = () => {
  const { navigateTo, showToast } = useWanderlust();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    notificationsApi
      .getAll()
      .then((res) => {
        if (res.success) setNotifications(res.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleMarkAllRead = async () => {
    const res = await notificationsApi.markAllRead();
    if (res.success) {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      showToast('All notifications marked as read.', 'info');
    }
  };

  const handleNotificationClick = async (notif) => {
    await notificationsApi.markRead(notif.id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
    );
    if (notif.actionUrl) {
      navigateTo(notif.actionUrl);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h1 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight">
            Notification Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time updates regarding booking status, approved commission payouts, and system alerts.
          </p>
        </div>

        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={handleMarkAllRead}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer self-start sm:self-auto"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications"
          description="You're completely caught up with your travel and reward alerts."
        />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100/90 overflow-hidden shadow-xs divide-y divide-slate-100">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleNotificationClick(n)}
              className={`p-4 sm:p-5 flex items-start gap-4 transition-colors cursor-pointer ${
                !n.isRead ? 'bg-blue-50/30 hover:bg-blue-50/50' : 'hover:bg-slate-50/80'
              }`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${
                n.type === 'REWARD_APPROVED'
                  ? 'bg-emerald-50 text-emerald-600'
                  : n.type === 'BOOKING_CONFIRMED'
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-purple-50 text-purple-600'
              }`}>
                {n.type === 'REWARD_APPROVED' ? (
                  <DollarSign className="w-5 h-5" />
                ) : n.type === 'BOOKING_CONFIRMED' ? (
                  <CalendarCheck className="w-5 h-5" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`text-xs sm:text-sm font-bold ${!n.isRead ? 'text-slate-900' : 'text-slate-700'}`}>
                    {n.title}
                  </h4>
                  <span className="font-mono text-[10px] text-slate-400 shrink-0">
                    {formatDate(n.timestamp)}
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {n.message}
                </p>
              </div>

              {!n.isRead && (
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
