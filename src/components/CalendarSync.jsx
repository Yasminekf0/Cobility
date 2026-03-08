// CalendarSync: mock Google Calendar / Outlook connection UI
import { useState } from 'react';
import { CalendarDays } from 'lucide-react';

function ProviderButton({ label, accentColor, connected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        connected
          ? 'bg-slate-900 text-white focus:ring-slate-400'
          : 'bg-white text-[var(--color-text)] focus:ring-slate-300'
      }`}
    >
      <span
        className="flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold text-white"
        style={{ backgroundColor: accentColor }}
      >
        <CalendarDays className="h-3 w-3" />
      </span>
      <span>{label}</span>
    </button>
  );
}

export default function CalendarSync() {
  const [googleConnected, setGoogleConnected] = useState(false);
  const [outlookConnected, setOutlookConnected] = useState(false);

  const sampleEvents = [
    {
      id: 1,
      time: 'Today · 8:15 – 8:45 AM',
      title: 'Morning journey to school',
      location: 'Home → Oakwood Primary',
      color: '#4285F4',
    },
    {
      id: 2,
      time: 'Today · 3:05 – 3:40 PM',
      title: 'Pick-up and return home',
      location: 'Oakwood Primary → Home',
      color: '#0F9D58',
    },
    {
      id: 3,
      time: 'Tomorrow · 10:00 – 10:30 AM',
      title: 'Practice journey to library',
      location: 'Home → Riverside Library',
      color: '#F4B400',
    },
  ];

  return (
    <div className="space-y-2 card">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[var(--color-text)]">
          Sync to your calendar
        </p>
        <p className="text-[10px] text-slate-500">
          Mock connection — no real access yet
        </p>
      </div>

      <div className="flex gap-2">
        <ProviderButton
          label={googleConnected ? 'Google connected' : 'Google Calendar'}
          accentColor="#4285F4"
          connected={googleConnected}
          onClick={() => setGoogleConnected((prev) => !prev)}
        />
        <ProviderButton
          label={outlookConnected ? 'Outlook connected' : 'Outlook'}
          accentColor="#127AD6"
          connected={outlookConnected}
          onClick={() => setOutlookConnected((prev) => !prev)}
        />
      </div>

      {(googleConnected || outlookConnected) && (
        <div className="space-y-2">
          <p className="text-[10px] text-emerald-600">
            Your current route will appear as an event with gentle reminders.
          </p>

          <div className="space-y-1.5">
            {sampleEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start card text-xs shadow-sm"
              >
                {/* Color bar */}
                <div
                  className="mr-2 h-8 w-1 rounded-full"
                  style={{ backgroundColor: event.color }}
                />
                <div className="flex-1">
                  <p className="text-[10px] font-medium text-slate-500">
                    {event.time}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-[var(--color-text)]">
                    {event.title}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-500">
                    {event.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

