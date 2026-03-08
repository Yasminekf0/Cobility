// AIChatBubble: floating planning assistant connected to Groq
import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const SYSTEM_PROMPT =
  "You are Cobility's planning assistant. Help the user reorder stops, check for delays, and adjust their route. Be brief, warm, and clear. Never use bullet points longer than 3 items.";

export default function AIChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewSuggestion, setHasNewSuggestion] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hi, I can help you make this journey feel calmer. What would you like to adjust?',
    },
  ]);

  const apiKey = import.meta.env.VITE_GROQ_KEY;

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    setHasNewSuggestion(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userContent = input.trim();
    setInput('');

    const userMessage = { role: 'user', content: userContent };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'I need a Groq API key to respond. Please add VITE_GROQ_KEY to your .env file.',
        },
      ]);
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        ],
        max_tokens: 300,
      };

      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      const assistantText =
        data?.choices?.[0]?.message?.content ??
        'I had trouble reading the response, but you can try again in a moment.';

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: assistantText },
      ]);
      setHasNewSuggestion(true);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Something went wrong reaching the planning assistant. Please check your network and API key, then try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={handleToggle}
        className="fixed bottom-6 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300"
        aria-label="Open planning assistant"
      >
        <MessageCircle className="h-6 w-6" />
        {hasNewSuggestion && (
          <span className="absolute -right-0.5 -top-0.5 inline-flex h-3 w-3 animate-pulse rounded-full bg-amber-400 ring-2 ring-white" />
        )}
      </button>

      {/* Slide-up drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/20">
          <div className="w-full max-w-[430px] rounded-t-3xl bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <div>
                <p className="text-sm font-semibold text-[var(--color-text)]">
                  Planning assistant
                </p>
                <p className="text-[11px] text-slate-500">
                  Ask to reorder stops, check delays, or soften the route.
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggle}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex max-h-72 flex-col gap-2 overflow-y-auto px-4 py-3 text-sm">
              {messages.map((msg, index) => (
                <div
                  key={`${msg.role}-${index}`}
                  className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                      msg.role === 'user'
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-slate-100 text-[var(--color-text)]'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <p className="text-[11px] text-slate-500">
                  Thinking about the calmest option…
                </p>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-slate-100 px-3 py-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about this route…"
                className="flex-1 rounded-2xl border border-slate-200 px-3 py-2 text-sm text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="rounded-2xl bg-[var(--color-primary)] px-3 py-2 text-xs font-semibold text-white disabled:opacity-60"
              >
                {isLoading ? 'Sending…' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

