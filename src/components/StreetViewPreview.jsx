// StreetViewPreview: Google Street View iframe for walking segments
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

export default function StreetViewPreview({ lat, lng, heading }) {
  if (!API_KEY) {
    return (
      <div className="flex h-24 w-full items-center justify-center rounded-xl bg-slate-200 text-[10px] text-slate-600">
        Street View preview (add VITE_GOOGLE_MAPS_KEY to enable)
      </div>
    );
  }

  const src = `https://www.google.com/maps/embed/v1/streetview?key=${API_KEY}&location=${lat},${lng}&heading=${heading}&fov=80`;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <iframe
        title="Street View preview"
        src={src}
        loading="lazy"
        className="h-28 w-full"
        style={{ border: 0 }}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

