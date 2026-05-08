import { FolderKanban, Plus, Users, Clock3 } from "lucide-react";

const projects = [
  { name: "Marketing Launch 2024", status: "Active", tasks: 18, members: 6, color: "bg-blue-500" },
  { name: "Atlas Migration", status: "Planning", tasks: 11, members: 4, color: "bg-teal-500" },
  { name: "Mobile Onboarding", status: "Review", tasks: 7, members: 3, color: "bg-amber-500" },
];

const Projects = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-950">Projects</h1>
          <p className="text-sm text-slate-500 mt-1">Track every workspace initiative from one dedicated page.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <article key={project.name} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <span className={`w-10 h-10 rounded-lg ${project.color} flex items-center justify-center text-white`}>
                <FolderKanban className="w-5 h-5" />
              </span>
              <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">{project.status}</span>
            </div>
            <h2 className="mt-4 text-lg font-bold text-slate-950">{project.name}</h2>
            <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5"><Clock3 className="w-4 h-4" />{project.tasks} tasks</span>
              <span className="inline-flex items-center gap-1.5"><Users className="w-4 h-4" />{project.members} members</span>
            </div>
            <div className="mt-5 h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className={`h-full ${project.color}`} style={{ width: `${Math.min(92, project.tasks * 4)}%` }} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Projects;
