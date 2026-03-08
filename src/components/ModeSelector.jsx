// ModeSelector: redesigned home screen per Figma
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Plus, Edit2 } from 'lucide-react';

export default function ModeSelector() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="relative flex min-h-screen flex-col bg-transparent px-4 py-6 text-white">
      {/* top controls */}
      <button
        type="button"
        onClick={() => setDarkMode((d) => !d)}
        className="absolute top-4 right-4 p-2 rounded-full bg-[#1e2a3a]/80"
        aria-label="Toggle dark mode"
      >
        <Sun className="h-6 w-6 text-white" />
      </button>
      <div className="absolute top-4 left-4 text-sm text-gray-400">cobility</div>

      {/* greeting */}
      <div className="mt-16">
        <p className="text-[18px]">Hi,</p>
        <p className="mt-1 text-[36px] font-extrabold">How can I help u</p>
      </div>

      {/* input card */}
      <button
        type="button"
        onClick={() => navigate('/plan')}
        className="relative mt-8 w-full rounded-[16px] bg-[#1e2a3a] border border-white/10 px-4 py-[20px] text-left"
      >
        <input
          type="text"
          placeholder="2 hour trip to Nyhavn..."
          className="w-full bg-transparent border-none placeholder-gray-400 text-white text-[16px] focus:outline-none"
          readOnly
        />
        <span className="absolute bottom-2 right-2 text-white">✦</span>
      </button>

      {/* icon buttons */}
      <div className="mt-4 flex justify-center gap-4">
        <button
          type="button"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#1e2a3a] border border-white/15"
        >
          <Plus className="h-6 w-6 text-white" />
        </button>
        <button
          type="button"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#1e2a3a] border border-white/15"
        >
          <Edit2 className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* next trip header */}
      <p className="mt-8 text-[14px] font-semibold">Next Trip ---</p>

      {/* pill card */}
      <button
        type="button"
        onClick={() => navigate('/journey')}
        className="mt-2 flex w-full items-center justify-between rounded-[50px] bg-[#1e2a3a] px-[20px] py-[14px]"
      >
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">11:15-11:30  8.Mar 2026</span>
          <span className="text-sm font-bold">Centrifugevej 374</span>
        </div>
        <span className="rounded-[50px] bg-[#2a3a4a] px-[16px] py-[8px] text-xs font-bold">
          6:30
        </span>
      </button>
    </div>
  );
}

