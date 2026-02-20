import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCampaign } from "../Context/CampaignContext";
import { frontendTemplates } from "../data/templateData";
import { Zap, Sparkles } from "lucide-react";

export default function TemplateLibrary() {
  const navigate = useNavigate();
  const { setCampaign } = useCampaign();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  /* ================= FILTER TEMPLATES ================= */

  const categories = [
    { name: "All", count: frontendTemplates.length },
    { name: "Modern", count: frontendTemplates.filter(t => t.category === "Modern").length },
    { name: "Marketing", count: frontendTemplates.filter(t => t.category === "Marketing").length },
    { name: "Newsletter", count: frontendTemplates.filter(t => t.category === "Newsletter").length },
    { name: "Announcement", count: frontendTemplates.filter(t => t.category === "Announcement").length },
    { name: "Onboarding", count: frontendTemplates.filter(t => t.category === "Onboarding").length },
    { name: "Transactional", count: frontendTemplates.filter(t => t.category === "Transactional").length },
    { name: "Event", count: frontendTemplates.filter(t => t.category === "Event").length },
  ];

  const filteredTemplates = frontendTemplates.filter(template => {
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  /* ================= HANDLERS ================= */

  const handleSelectTemplate = (template) => {
    setCampaign((prev) => ({
      ...prev,
      templateId: template.id,
      templateName: template.name,
      subject: template.name,
      blocks: template.blocks,
    }));
    navigate("/campaign/editor");
  };

  const handleStartFromScratch = () => {
    setCampaign((prev) => ({
      ...prev,
      templateId: null,
      templateName: "Blank Template",
      subject: "",
      blocks: [],
    }));
    navigate("/campaign/editor");
  };

  /* ================= UI ================= */

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shadow-sm">
        {/* Logo */}
        <div className="h-20 flex items-center px-8 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Zap size={22} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">EmailSpark</span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <div className="mb-4">
            <h3 className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-4">
              Explore Templates
            </h3>
          </div>
          <nav className="space-y-1.5">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-semibold transition-all duration-200 ${
                  selectedCategory === cat.name
                    ? "bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${selectedCategory === cat.name ? "bg-indigo-200/50 text-indigo-700" : "bg-slate-100 text-slate-500"}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-2 px-4 py-3 text-[14px] font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
          >
            <span className="text-lg">←</span> Back to Home
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Template Gallery</h1>
            <p className="text-sm text-slate-500 font-medium">Select a premium starting point</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative group">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search premium templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 pl-11 pr-4 w-72 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
              />
            </div>
            <button 
              onClick={handleStartFromScratch} 
              className="h-11 px-6 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95 flex items-center gap-2"
            >
              <span>+</span> Blank Canvas
            </button>
          </div>
        </header>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {/* Featured AI Section */}
          <div className="mb-12 relative rounded-3xl overflow-hidden p-8 flex items-center justify-between bg-indigo-600 text-white shadow-2xl shadow-indigo-200">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_40%)]" />
            <div className="relative z-10 max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 mb-6 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-300 animate-pulse"></span>
                <span className="text-[11px] font-bold uppercase tracking-wider">New AI Integration</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 tracking-tight">Generate custom templates with Magic AI</h2>
              <p className="text-indigo-100 text-base mb-8 leading-relaxed">
                Describe your campaign goal and our AI will craft a high-converting layout in seconds. 
                Save time and launch faster.
              </p>
              <button 
                onClick={() => navigate("/campaign/editor")}
                className="h-12 px-8 bg-white text-indigo-700 rounded-xl font-bold hover:bg-indigo-50 transition-all active:scale-95 shadow-xl"
              >
                Try Magic AI →
              </button>
            </div>
            <div className="hidden lg:block relative group">
              <div className="absolute -inset-4 bg-white/10 blur-2xl rounded-full animate-pulse group-hover:bg-white/20 transition-all"></div>
              <Zap size={160} className="relative z-10 text-white/20 group-hover:text-white/40 transition-colors" />
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900">
              {selectedCategory === "All" ? "All Premium Templates" : `${selectedCategory} Templates`}
            </h3>
            <div className="h-[2px] flex-1 mx-6 bg-slate-100"></div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                onClick={() => handleSelectTemplate(template)}
                className="group relative flex flex-col bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2 transition-all duration-300"
              >
                {/* Preview Container */}
                <div className="aspect-[4/5] bg-slate-100 overflow-hidden relative border-b border-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 group-hover:from-indigo-50 group-hover:to-indigo-100 transition-colors duration-500"></div>
                  
                  {/* Mini Canvas */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-white rounded-2xl shadow-xl overflow-hidden scale-90 group-hover:scale-100 transition-all duration-500">
                     {/* Mini Content Renderer */}
                     <div className="p-3 scale-75 origin-top-left w-[133%] h-[133%]" style={{ pointerEvents: 'none' }}>
                        {template.blocks.slice(0, 6).map((block, idx) => (
                          <div key={idx} className="mb-2 last:mb-0">
                            {block.type === "text" && (
                              <div 
                                style={{ 
                                  height: 8, 
                                  width: block.data.text.length > 50 ? '100%' : '70%', 
                                  backgroundColor: block.data.color, 
                                  borderRadius: 4,
                                  opacity: 0.2,
                                  textAlign: block.data.align === 'center' ? 'center' : 'left',
                                  margin: block.data.align === 'center' ? 'auto' : '0'
                                }}
                              />
                            )}
                            {block.type === "image" && (
                              <div className="w-full h-24 bg-slate-200 rounded-lg overflow-hidden flex items-center justify-center">
                                <span className="text-slate-400 text-[10px] font-bold">IMAGE</span>
                              </div>
                            )}
                            {block.type === "button" && (
                              <div 
                                className="h-6 rounded-md w-1/2 mx-auto" 
                                style={{ backgroundColor: block.data.bg }}
                              />
                            )}
                          </div>
                        ))}
                     </div>
                  </div>

                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:scale-110 transition-all">
                    <Zap size={18} />
                  </div>
                </div>

                {/* Footer Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider rounded-lg">
                      {template.category}
                    </span>
                    {template.category === "Modern" && (
                      <span className="flex items-center gap-1 text-amber-500 text-[10px] font-bold uppercase tracking-wider">
                         <Sparkles size={10} /> Hot
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
                    {template.name}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                {/* Hover CTA */}
                <div className="absolute inset-0 bg-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                   <div className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold shadow-2xl scale-75 group-hover:scale-100 transition-all duration-300">
                      Use Template
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTemplates.length === 0 && (
            <div className="text-center py-32 animate-in fade-in slide-in-from-bottom-5 duration-500">
              <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No templates found</h3>
              <p className="text-slate-500 font-medium">
                Try adjusting your search or filter criteria. We're adding new designs weekly!
              </p>
              <button 
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                className="mt-8 text-indigo-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
