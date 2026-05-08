import { BarChart3, CheckCircle2, Clock3, TrendingUp } from "lucide-react";

const weekly = [42, 58, 36, 72, 64, 88, 76];

const Analytics = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-950">Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">A clear performance view for tasks, completion, and team velocity.</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Completion Rate", value: "76%", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Cycle Time", value: "3.4d", icon: Clock3, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Velocity", value: "+18%", icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <article key={metric.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className={`w-10 h-10 rounded-lg ${metric.bg} ${metric.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-500">{metric.label}</p>
              <h2 className="mt-1 text-3xl font-bold text-slate-950">{metric.value}</h2>
            </article>
          );
        })}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-950">Weekly Throughput</h2>
        </div>
        <div className="h-72 flex items-end gap-3">
          {weekly.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full rounded-t-lg bg-slate-900" style={{ height: `${value}%` }} />
              <span className="text-xs font-semibold text-slate-500">D{index + 1}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Analytics;
