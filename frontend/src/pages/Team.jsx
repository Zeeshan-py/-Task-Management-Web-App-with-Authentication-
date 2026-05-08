import { Mail, ShieldCheck, Users } from "lucide-react";

const members = [
  { name: "Elena Rostova", role: "Engineering Lead", email: "elena@taskflow.dev" },
  { name: "Alex Rivera", role: "Product Designer", email: "alex@taskflow.dev" },
  { name: "Sarah Chen", role: "Product Manager", email: "sarah@taskflow.dev" },
  { name: "Zeeshan QA", role: "Developer", email: "qa@example.com" },
];

const Team = () => {
  return (
    <div className="w-full max-w-[1100px] mx-auto space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-950">Team</h1>
            <p className="text-sm text-slate-500 mt-1">Manage workspace members and roles.</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {members.map((member) => (
          <div key={member.email} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-b border-slate-100 last:border-b-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-slate-950 flex items-center justify-center font-bold">
                {member.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-950">{member.name}</h2>
                <p className="text-xs text-slate-500">{member.role}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 border border-slate-200 px-2 py-1">
                <Mail className="w-3.5 h-3.5" />
                {member.email}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700 px-2 py-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Active
              </span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Team;
