import React, { useState } from "react";
import "./ServiceQuote.css";
import "./ProjectPlanning.css";

interface TechOption {
  id: string;
  name: string;
}

interface TechCategory {
  label: string;
  options: TechOption[];
}

interface DurationOption {
  id: string;
  label: string;
  hint: string;
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    label: "Frontend",
    options: [
      { id: "react", name: "React" },
      { id: "nextjs", name: "Next.js" },
      { id: "vue", name: "Vue" },
      { id: "angular", name: "Angular" },
      { id: "svelte", name: "Svelte" },
      { id: "tailwind", name: "Tailwind CSS" },
    ],
  },
  {
    label: "Backend",
    options: [
      { id: "node", name: "Node.js" },
      { id: "python", name: "Python / Django" },
      { id: "laravel", name: "Laravel / PHP" },
      { id: "go", name: "Go" },
      { id: "dotnet", name: ".NET" },
    ],
  },
  {
    label: "Mobile",
    options: [
      { id: "reactnative", name: "React Native" },
      { id: "flutter", name: "Flutter" },
      { id: "swift", name: "Swift / iOS" },
      { id: "kotlin", name: "Kotlin / Android" },
    ],
  },
  {
    label: "Database",
    options: [
      { id: "postgres", name: "PostgreSQL" },
      { id: "mongodb", name: "MongoDB" },
      { id: "mysql", name: "MySQL" },
      { id: "firebase", name: "Firebase" },
      { id: "supabase", name: "Supabase" },
    ],
  },
  {
    label: "Cloud & DevOps",
    options: [
      { id: "aws", name: "AWS" },
      { id: "gcp", name: "Google Cloud" },
      { id: "azure", name: "Azure" },
      { id: "docker", name: "Docker" },
      { id: "vercel", name: "Vercel" },
    ],
  },
  {
    label: "AI & Data",
    options: [
      { id: "llm", name: "LLM / OpenAI" },
      { id: "tensorflow", name: "TensorFlow" },
      { id: "cv", name: "Computer Vision" },
      { id: "analytics", name: "Data Analytics" },
    ],
  },
];

const DURATIONS: DurationOption[] = [
  { id: "1-2w", label: "1–2 Weeks", hint: "Prototype / MVP" },
  { id: "3-4w", label: "3–4 Weeks", hint: "Focused build" },
  { id: "1-2m", label: "1–2 Months", hint: "Standard project" },
  { id: "3-6m", label: "3–6 Months", hint: "Full product" },
  { id: "6m+", label: "6+ Months", hint: "Long-term / ongoing" },
];

function ProjectPlanning() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTech, setSelectedTech] = useState<Set<string>>(() => new Set());
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [duration, setDuration] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [planText, setPlanText] = useState("");
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "", visible: false });

  const techNameById = (id: string): string => {
    for (const cat of TECH_CATEGORIES) {
      const found = cat.options.find((o) => o.id === id);
      if (found) return found.name;
    }
    return id;
  };

  const toggleTech = (id: string) => {
    setSelectedTech((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addFeature = () => {
    const value = featureInput.trim();
    if (!value) return;
    setFeatures((prev) => [...prev, value]);
    setFeatureInput("");
  };

  const removeFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFeatureKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addFeature();
    }
  };

  const showStatus = (text: string, type: "success" | "error") => {
    setStatusMessage({ text, type, visible: true });
    setTimeout(() => setStatusMessage({ text: "", type: "", visible: false }), 3000);
  };

  const buildPlanText = (): string => {
    const durationLabel = DURATIONS.find((d) => d.id === duration)?.label ?? "Not specified";
    const techList = Array.from(selectedTech).map(techNameById);

    const lines: string[] = [];
    lines.push("PROJECT PLAN");
    lines.push("Cre8tive Sync");
    lines.push(new Date().toLocaleDateString());
    lines.push("");
    lines.push(`Project: ${projectName.trim() || "Untitled Project"}`);
    lines.push(`Estimated Duration: ${durationLabel}`);
    lines.push("");
    lines.push("Description:");
    lines.push(description.trim() || "—");
    lines.push("");
    lines.push("Tech Stack:");
    lines.push(techList.length ? techList.map((t) => `  • ${t}`).join("\n") : "  —");
    lines.push("");
    lines.push("Requested Features:");
    lines.push(features.length ? features.map((f, i) => `  ${i + 1}. ${f}`).join("\n") : "  —");

    return lines.join("\n");
  };

  const generatePlan = () => {
    if (!description.trim() && selectedTech.size === 0 && features.length === 0 && !duration) {
      showStatus("Add some details before generating a plan.", "error");
      return;
    }
    setPlanText(buildPlanText());
    setShowModal(true);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(planText);
      showStatus("Plan copied to clipboard!", "success");
    } catch {
      showStatus("Could not copy. Please use download instead.", "error");
    }
  };

  const downloadPlan = () => {
    const blob = new Blob([planText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `project-plan-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showStatus("Plan downloaded successfully!", "success");
  };

  return (
    <div className="flex items-center justify-center p-4 relative min-h-screen">
      <main className="glass-panel rounded-3xl p-6 w-full max-w-2xl relative z-10">
        <header className="mb-3 relative">
          <img src="/light.png" alt="Logo" className="absolute top-0 left-0 h-12 w-auto" />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">Project Planning</h1>
            <p className="text-white/70 text-xs font-medium tracking-wide uppercase">
              Shape your project before we build it
            </p>
          </div>
        </header>

        <div className="scroll-container space-y-4 mb-3 pr-2">
          {/* Project name */}
          <div>
            <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. Acme Storefront Revamp"
              className="planning-input"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe your project, goals, and any context we should know..."
              className="planning-input resize-none"
            />
          </div>

          {/* Tech stack */}
          <div>
            <div className="section-header px-3 py-2 rounded-r-lg mb-2">
              <h3 className="text-white/90 text-xs font-bold uppercase tracking-wider">Tech Stack</h3>
            </div>
            <div className="space-y-3">
              {TECH_CATEGORIES.map((cat) => (
                <div key={cat.label}>
                  <p className="text-white/50 text-[0.65rem] font-semibold uppercase tracking-wider mb-1.5">
                    {cat.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cat.options.map((opt) => {
                      const selected = selectedTech.has(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => toggleTech(opt.id)}
                          className={`tech-chip ${selected ? "selected" : ""}`}
                        >
                          {opt.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature requests */}
          <div>
            <div className="section-header px-3 py-2 rounded-r-lg mb-2">
              <h3 className="text-white/90 text-xs font-bold uppercase tracking-wider">Requested Features</h3>
            </div>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={handleFeatureKeyDown}
                placeholder="e.g. User authentication"
                className="planning-input flex-1"
              />
              <button type="button" onClick={addFeature} className="add-feature-btn shrink-0">
                Add
              </button>
            </div>
            {features.length > 0 && (
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div
                    key={`${feature}-${index}`}
                    className="glass-card rounded-lg compact-row flex items-center justify-between"
                  >
                    <span className="text-white text-sm truncate mr-2">{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-white/50 hover:text-white text-lg leading-none shrink-0"
                      aria-label="Remove feature"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Duration */}
          <div>
            <div className="section-header px-3 py-2 rounded-r-lg mb-2">
              <h3 className="text-white/90 text-xs font-bold uppercase tracking-wider">Estimated Duration</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDuration(d.id)}
                  className={`duration-option glass-card rounded-lg p-3 text-left ${
                    duration === d.id ? "selected" : ""
                  }`}
                >
                  <span className="block text-white font-semibold text-sm">{d.label}</span>
                  <span className="block text-white/50 text-xs">{d.hint}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="divider-glass my-4"></div>

        <button
          onClick={generatePlan}
          className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 rounded-xl border border-white/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm text-sm"
        >
          Generate Plan
        </button>

        {statusMessage.visible && !showModal && (
          <p
            className={`text-center text-sm mt-3 ${
              statusMessage.type === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {statusMessage.text}
          </p>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel rounded-2xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl font-bold">Project Plan</h2>
              <button onClick={() => setShowModal(false)} className="text-white/60 hover:text-white text-2xl">
                ×
              </button>
            </div>
            <pre className="plan-preview bg-black/30 rounded-lg p-4 mb-4 text-white/90 text-sm whitespace-pre-wrap font-mono overflow-y-auto">
              {planText}
            </pre>
            <div className="flex gap-3">
              <button
                onClick={downloadPlan}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 rounded-xl border border-white/30 transition-all"
              >
                Download .txt
              </button>
              <button
                onClick={copyToClipboard}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 rounded-xl border border-white/30 transition-all"
              >
                Copy to Clipboard
              </button>
            </div>
            {statusMessage.visible && (
              <p
                className={`text-center text-sm mt-3 ${
                  statusMessage.type === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {statusMessage.text}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { ProjectPlanning };
