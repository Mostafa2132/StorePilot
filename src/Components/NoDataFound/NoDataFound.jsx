
export default function NoDataFound({ title, icon, des }) {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center">
      <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl flex flex-col items-center">
        <div className="w-20 h-20 mb-4 text-red-600 flex items-center justify-center rounded-full bg-primary/10 border border-primary/20 animate-pulse">
          {icon }
        </div>

        <h2 className="text-2xl font-semibold text-text-primary mb-1">
          {title}
        </h2>

        <p className="text-text-secondary max-w-xs">{des}</p>
      </div>
    </div>
  );
}
