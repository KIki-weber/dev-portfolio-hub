import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Plus, Edit2, Trash2, LogOut, X } from "lucide-react";
import { toast } from "sonner";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  color: string;
  image_url: string | null;
  live_url: string | null;
  github_url: string | null;
}

const emptyProject = { title: "", description: "", tech: [] as string[], color: "174 72% 56%", image_url: "", live_url: "", github_url: "" };

const AdminDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Partial<Project> & { techStr?: string } | null>(null);
  const [isNew, setIsNew] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) navigate("/admin/login");
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin/login");
    });
    fetchProjects();
    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProjects = async () => {
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (data) setProjects(data);
  };

  const handleSave = async () => {
    if (!editing) return;
    const tech = (editing.techStr || "").split(",").map((t) => t.trim()).filter(Boolean);
    const payload = {
      title: editing.title || "",
      description: editing.description || "",
      tech,
      color: editing.color || "174 72% 56%",
      image_url: editing.image_url || null,
      live_url: editing.live_url || null,
      github_url: editing.github_url || null,
    };

    if (isNew) {
      const { error } = await supabase.from("projects").insert(payload);
      if (error) { toast.error(error.message); return; }
      toast.success("Project created!");
    } else {
      const { error } = await supabase.from("projects").update(payload).eq("id", editing.id!);
      if (error) { toast.error(error.message); return; }
      toast.success("Project updated!");
    }
    setEditing(null);
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    toast.success("Project deleted!");
    fetchProjects();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const openEdit = (p: Project) => {
    setIsNew(false);
    setEditing({ ...p, techStr: p.tech.join(", ") });
  };

  const openNew = () => {
    setIsNew(true);
    setEditing({ ...emptyProject, techStr: "" });
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-display text-xl font-bold"><span className="text-gradient">Admin</span> Dashboard</h1>
          <div className="flex gap-3">
            <button onClick={openNew} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" /> Add Project
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Modal */}
        {editing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
            <div className="w-full max-w-lg rounded-xl bg-card border border-border p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-display text-lg font-semibold">{isNew ? "New Project" : "Edit Project"}</h2>
                <button onClick={() => setEditing(null)}><X className="w-5 h-5 text-muted-foreground" /></button>
              </div>
              <input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="Title" className="w-full rounded-lg bg-secondary border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
              <textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} placeholder="Description" rows={3} className="w-full rounded-lg bg-secondary border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none" />
              <input value={editing.techStr || ""} onChange={(e) => setEditing({ ...editing, techStr: e.target.value })} placeholder="Tech (comma separated: React, Node.js)" className="w-full rounded-lg bg-secondary border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
              <input value={editing.color || ""} onChange={(e) => setEditing({ ...editing, color: e.target.value })} placeholder="Color HSL (e.g. 174 72% 56%)" className="w-full rounded-lg bg-secondary border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
              <input value={editing.live_url || ""} onChange={(e) => setEditing({ ...editing, live_url: e.target.value })} placeholder="Live URL (optional)" className="w-full rounded-lg bg-secondary border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
              <input value={editing.github_url || ""} onChange={(e) => setEditing({ ...editing, github_url: e.target.value })} placeholder="GitHub URL (optional)" className="w-full rounded-lg bg-secondary border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
              <button onClick={handleSave} className="w-full rounded-lg bg-primary py-2.5 font-display font-medium text-primary-foreground hover:opacity-90 transition-opacity">
                {isNew ? "Create Project" : "Save Changes"}
              </button>
            </div>
          </div>
        )}

        {/* Projects list */}
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-xl bg-card border border-border p-4 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg" style={{ background: `linear-gradient(135deg, hsl(${p.color} / 0.3), hsl(${p.color} / 0.1))` }} />
                <div>
                  <h3 className="font-display font-semibold text-sm">{p.title}</h3>
                  <p className="text-xs text-muted-foreground">{p.tech.join(", ")}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-secondary transition-colors"><Edit2 className="w-4 h-4 text-muted-foreground" /></button>
                <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"><Trash2 className="w-4 h-4 text-destructive" /></button>
              </div>
            </div>
          ))}
          {projects.length === 0 && <p className="text-center text-muted-foreground py-12">No projects yet. Add one!</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
