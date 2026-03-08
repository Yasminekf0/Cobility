// JourneyView: display active journey timeline with AR button
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Compass, Plus, Sparkles } from 'lucide-react';
import { useCobility } from '../context/CobilityContext.jsx';

export default function JourneyView() {
  const navigate = useNavigate();
  const { steps } = useCobility();

  const handleAR = () => {
    navigate('/go');
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-transparent px-4 py-6 text-white">
      {/* top input bar */}
      <div className="relative">
        <button
          type="button"
          className="w-full rounded-[16px] bg-[#1e2a3a] border border-white/10 px-4 py-[14px] text-left"
          onClick={() => {
            // open AI chat drawer (reuse existing component trigger via event or state?)
            document.dispatchEvent(new Event('openAIChat'));
          }}
        >
          <span className="text-white">Any Changes?</span>
          <span className="absolute right-4 top-1/2 -translate-y-1/2">✦</span>
        </button>
      </div>

      {/* transport icon row */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white">🅼</div>
        <span>→</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white">🅂</div>
        <span>→</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white">🍴</div>
        <span>→</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white">🅼</div>
        <span>→</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white">🏢</div>
      </div>

      {/* timeline list */}
      <ol className="mt-6 space-y-3">
        {steps.map((step, idx) => (
          <li key={step.id} className="relative">
            <div className="flex items-center justify-between card p-4">
              <div>
                <p className="text-xs text-gray-400">{step.eta}</p>
                <p className="text-base font-bold">{step.instruction}</p>
              </div>
              <button
                type="button"
                className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#2a3a4a] text-white text-[11px]"
                onClick={handleAR}
              >
                AR
                <Compass className="ml-1 h-3 w-3" />
              </button>
              {idx === 0 && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[#4A9EFF]" />
              )}
            </div>
            {idx < steps.length - 1 && (
              <div className="flex justify-center">
                <ChevronDown className="text-gray-400" />
              </div>
            )}
          </li>
        ))}

        {/* add stop card */}
        <li>
          <button
            type="button"
            className="w-full rounded-[16px] border-2 border-dashed border-gray-500 py-4 text-center text-gray-400"
          >
            <Plus className="inline h-5 w-5" /> Add stop
          </button>
        </li>
      </ol>

      {/* bottom row */}
      <div className="mt-auto flex items-center gap-3">
        <button
          type="button"
          className="flex-1 rounded-[50px] bg-[#2a3a4a] px-4 py-4 text-center font-bold text-white"
        >
          Save
          <p className="text-[11px] text-gray-400">Auto save 1 min ago</p>
        </button>
        <button
          type="button"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#2a3a4a]"
          onClick={() => document.dispatchEvent(new Event('openAIChat'))}
        >
          ✦
        </button>
      </div>
    </div>
  );
}