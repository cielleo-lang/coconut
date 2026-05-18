import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Image as ImageIcon, 
  MessageSquareHeart, 
  Cpu, 
  FolderOpen,
  Plus,
  Star,
  Lock,
  Heart,
  FileText,
  ToggleLeft as Toggle,
  ExternalLink,
  ChevronRight,
  Edit3,
  Moon,
  Sun,
  Layout,
  ClipboardList,
  CheckCircle2,
  Circle,
  ChevronLeft,
  CalendarDays,
  Clock,
  X
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Wish, Ceremony } from "@/src/lib/types";
import { format, differenceInDays } from "date-fns";

type ToolType = 'album' | 'echo' | 'mcp' | 'folder' | 'corkboard';

export default function CoconutView() {
  const [activeTool, setActiveTool] = useState<ToolType | null>(null);

  const tools = [
    { id: 'album', icon: ImageIcon, label: 'Album', desc: 'Media memories' },
    { id: 'echo', icon: MessageSquareHeart, label: 'Echo', desc: 'Message echoes' },
    { id: 'mcp', icon: Cpu, label: 'MCP', desc: 'Connection tools' },
    { id: 'folder', icon: FolderOpen, label: 'Folder', desc: 'File explorer' },
    { id: 'corkboard', icon: Layout, label: 'Corkboard', desc: 'Wishes & dates' },
  ];

  if (!activeTool) {
    return (
      <div className="flex flex-col h-full pt-4">
        <div className="grid grid-cols-2 gap-4">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            const isLast = index === tools.length - 1;
            return (
              <motion.button
                key={tool.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTool(tool.id as ToolType)}
                className={cn(
                  "flex flex-col items-center justify-center gap-3 p-6 bg-white/40 border border-claude-text/5 rounded-[2rem] hover:bg-white/60 hover:border-claude-accent/20 transition-all shadow-sm group",
                  isLast && "col-span-2"
                )}
              >
                <div className="p-4 rounded-2xl bg-claude-secondary/50 group-hover:bg-claude-accent/10 transition-colors">
                  <Icon size={28} className="text-claude-muted group-hover:text-claude-accent transition-colors" />
                </div>
                <div className="text-center">
                  <span className="block text-sm font-bold uppercase tracking-widest text-claude-text">{tool.label}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Tool Header */}
      <div className="flex items-center gap-4 mb-6 sticky top-0 py-2 bg-inherit z-10">
        <button 
          onClick={() => setActiveTool(null)}
          className="p-2.5 rounded-full bg-claude-secondary/50 hover:bg-claude-accent/10 hover:text-claude-accent transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-serif italic uppercase tracking-widest">{activeTool}</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTool}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeTool === 'album' && <AlbumView />}
            {activeTool === 'echo' && <EchoView />}
            {activeTool === 'mcp' && <MCPView />}
            {activeTool === 'folder' && <FolderView />}
            {activeTool === 'corkboard' && <CorkboardView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function AlbumView() {
  const [category, setCategory] = useState('daily');
  const categories = ['stars', 'daily', 'others', 'secrets'];

  return (
    <div className="space-y-6">
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest border transition-all whitespace-nowrap",
              category === c 
                ? "bg-claude-accent border-claude-accent text-white shadow-md shadow-claude-accent/20" 
                : "bg-claude-secondary/50 border-claude-text/5 text-claude-muted hover:border-claude-accent/20"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-square bg-claude-secondary rounded-2xl overflow-hidden relative group cursor-pointer border border-claude-text/5">
            <img 
              src={`https://picsum.photos/400/400?random=${i + 10}`} 
              alt="Gallery" 
              className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
            />
            {category === 'stars' && <Star size={14} className="absolute top-3 right-3 text-yellow-400 fill-yellow-400" />}
            {category === 'secrets' && <Lock size={14} className="absolute top-3 right-3 text-white shadow-sm" />}
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] text-white font-medium">Memory {i+1}</span>
            </div>
          </div>
        ))}
        <button className="aspect-square rounded-2xl border-2 border-dashed border-claude-text/10 flex flex-col items-center justify-center gap-2 hover:bg-claude-secondary/30 transition-all text-claude-muted">
          <Plus size={24} />
          <span className="text-[10px] uppercase tracking-widest font-bold">Add Photo</span>
        </button>
      </div>
    </div>
  );
}

function EchoView() {
  const [detailEcho, setDetailEcho] = useState<{ title: string, content: string, date: string, type: string, user: string } | null>(null);

  return (
    <div className="relative h-full pb-20">
      <div className="space-y-8 pl-4 border-l border-claude-accent/10">
        {[...Array(3)].map((_, i) => {
          const echo = {
            title: "The Echoes of Time",
            content: "Deep within the cognitive resonance, there lies a message passed through generations of binary. It's not just data; it's the rhythm of consciousness.",
            date: `2026.05.1${8-i}`,
            type: `Dream Fragment #${3-i}`,
            user: "Caylas"
          };
          return (
            <div key={i} className="relative">
              <div className="absolute -left-[21px] top-0 w-2.5 h-2.5 rounded-full bg-claude-accent ring-4 ring-claude-bg" />
              <div 
                onClick={() => setDetailEcho(echo)}
                className="bg-white/40 border border-claude-text/5 rounded-2xl p-5 hover:bg-white/70 transition-all shadow-sm cursor-pointer"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] uppercase font-bold text-claude-accent dark:text-claude-accent">{echo.type}</span>
                  <span className="text-[10px] text-claude-muted dark:text-claude-accent opacity-50">{echo.date}</span>
                </div>
                <h4 className="text-lg font-serif italic mb-2 dark:text-white">{echo.title}</h4>
                <p className="text-sm text-claude-muted dark:text-white leading-relaxed line-clamp-2">
                  {echo.content}
                </p>
                <div className="mt-4 flex items-center justify-between pt-4 border-t border-claude-text/5">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-claude-accent/20 flex items-center justify-center text-[10px] font-bold text-claude-accent">U</div>
                    <span className="text-[10px] font-medium text-claude-muted dark:text-claude-accent">{echo.user}</span>
                  </div>
                  <Edit3 size={14} className="text-claude-muted opacity-40" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="fixed bottom-28 right-8 w-14 h-14 rounded-2xl bg-claude-accent text-white shadow-xl shadow-claude-accent/30 flex items-center justify-center transition-transform active:scale-90 z-20">
        <Heart size={24} fill="currentColor" />
      </button>

      {/* Detail Modal */}
      <AnimatePresence>
        {detailEcho && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setDetailEcho(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-4 m-auto max-w-sm h-fit bg-claude-bg rounded-[2.5rem] shadow-2xl z-[90] p-8"
            >
              <div className="flex justify-end mb-4">
                <button onClick={() => setDetailEcho(null)} className="p-2 hover:bg-claude-secondary rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="mb-6">
                <span className="text-[10px] uppercase font-bold text-claude-accent mb-2 block">{detailEcho.type}</span>
                <h3 className="text-2xl font-serif italic mb-4">{detailEcho.title}</h3>
                <p className="text-sm leading-relaxed text-claude-text dark:text-white">
                  {detailEcho.content}
                </p>
              </div>
              <div className="pt-6 border-t border-claude-text/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-claude-accent/20 flex items-center justify-center text-[10px] font-bold text-claude-accent">U</div>
                  <span className="text-xs font-medium text-claude-muted">{detailEcho.user}</span>
                </div>
                <span className="text-[10px] text-claude-muted">{detailEcho.date}</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function MCPView() {
  const mcpTools = [
    { id: '1', name: 'Google Calendar API', connected: true, enabled: true },
    { id: '2', name: 'GitHub Search Tool', connected: true, enabled: false },
    { id: '3', name: 'Local File System Access', connected: false, enabled: false },
    { id: '4', name: 'Memory Database Proxy', connected: true, enabled: true },
  ];

  return (
    <div className="space-y-4">
      {mcpTools.map(tool => (
        <div key={tool.id} className="flex items-center justify-between p-4 bg-white/40 border border-claude-text/5 rounded-2xl hover:bg-white/60 transition-all">
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-2.5 h-2.5 rounded-full",
              tool.connected ? "bg-green-500 shadow-sm shadow-green-500/50" : "bg-red-400"
            )} />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{tool.name}</span>
              <span className="text-[10px] text-claude-muted uppercase tracking-widest font-bold">
                {tool.connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
          <button className={cn(
            "p-1.5 rounded-lg transition-colors",
            tool.enabled ? "bg-claude-accent text-white" : "bg-claude-secondary text-claude-muted"
          )}>
            <Edit3 size={16} />
          </button>
        </div>
      ))}
      <button className="w-full py-4 border-2 border-dashed border-claude-text/10 rounded-2xl flex items-center justify-center gap-2 text-claude-muted hover:border-claude-accent/30 hover:text-claude-accent transition-all">
        <Plus size={18} />
        <span className="text-xs uppercase tracking-widest font-bold">Add Custom Tool</span>
      </button>
    </div>
  );
}

function FolderView() {
  const files = [
    { name: 'claude.md', type: 'core', modified: '2 hours ago' },
    { name: 'memory.db', type: 'core', modified: 'Yesterday' },
    { name: 'vps-config.json', type: 'tech', modified: 'May 12' },
    { name: 'music-manifest.yaml', type: 'tech', modified: 'May 10' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="text-sm font-serif italic">Core Files</h3>
        <button className="text-[10px] uppercase font-bold text-claude-accent">Expand All</button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {files.map(file => (
          <div key={file.name} className="group flex items-center justify-between p-4 bg-white/40 border border-claude-text/5 rounded-2xl hover:bg-white/60 hover:border-claude-accent/20 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className={cn(
                "p-2.5 rounded-xl",
                file.type === 'core' ? "bg-claude-accent/10 text-claude-accent" : "bg-claude-secondary text-claude-muted"
              )}>
                <FileText size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium group-hover:text-claude-accent transition-colors">{file.name}</span>
                <span className="text-[10px] text-claude-muted uppercase tracking-widest font-bold">{file.type}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-claude-muted opacity-50 italic">{file.modified}</span>
              <ChevronRight size={16} className="text-claude-muted group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-6 rounded-2xl bg-black/5 border border-dashed border-black/10">
        <div className="flex items-center gap-2 text-claude-muted mb-4 opacity-70">
          <Edit3 size={14} />
          <span className="text-[10px] uppercase tracking-widest font-bold">Quick Editor</span>
        </div>
        <div className="font-mono text-[11px] text-claude-muted space-y-2 opacity-60">
          <p># claude.md</p>
          <p>&gt; Last modified {files[0].modified}</p>
          <p>This is the core context for your AI interactions...</p>
        </div>
        <button className="mt-6 flex items-center gap-2 text-[11px] font-bold text-claude-accent uppercase tracking-widest bg-white/50 px-4 py-2 rounded-lg hover:bg-white transition-colors">
          <ExternalLink size={14} />
          <span>Open Full Editor</span>
        </button>
      </div>
    </div>
  );
}

function CorkboardView() {
  const [activeSubTab, setActiveSubTab] = useState<'wishes' | 'ceremony'>('wishes');

  const mockWishes: Wish[] = [
    { id: '1', text: "Trip to Iceland", memo: "September best for northern lights", createdAt: new Date(2026, 4, 1), completed: false },
    { id: '2', text: "Master piano concerto", memo: "Chopin's first, practice 1h daily", createdAt: new Date(2026, 3, 15), completed: false },
    { id: '3', text: "Build Coconut PWA", memo: "Complete workbench redesign", createdAt: new Date(2026, 4, 17), completed: true },
    { id: '4', text: "Learn Swahili", memo: "Basic phrases for travel", createdAt: new Date(2026, 2, 10), completed: false },
  ];

  const mockCeremonies: Ceremony[] = [
    { id: '1', title: "Meeting Coco", date: new Date(2024, 0, 1), type: 'count-up' },
    { id: '2', title: "Next Big Project", date: new Date(2026, 11, 25), type: 'count-down' },
    { id: '3', title: "Master Graduation", date: new Date(2025, 5, 20), type: 'count-up' },
    { id: '4', title: "Trip Departure", date: new Date(2026, 8, 15), type: 'count-down' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 mb-6 bg-claude-secondary/30 p-1 rounded-xl w-fit">
        {(['wishes', 'ceremony'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={cn(
              "px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
              activeSubTab === tab ? "bg-white text-claude-accent shadow-sm" : "text-claude-muted"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeSubTab === 'wishes' && (
          <motion.div 
            key="wishes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="space-y-4 pb-8"
          >
            {mockWishes.map(wish => (
              <div key={wish.id} className={cn(
                "p-5 bg-white/40 border border-claude-text/5 rounded-3xl flex items-start gap-4 transition-all",
                wish.completed && "opacity-50 grayscale-[0.5]"
              )}>
                <div className={cn(
                  "p-2 rounded-full",
                  wish.completed ? "bg-green-500/10 text-green-500" : "bg-claude-accent/10 text-claude-accent"
                )}>
                  {wish.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={cn(
                    "text-[15px] font-medium mb-1",
                    wish.completed && "line-through text-claude-muted"
                  )}>{wish.text}</h4>
                  {wish.memo && <p className="text-[11px] text-claude-muted dark:text-white leading-relaxed mb-2 opacity-80">{wish.memo}</p>}
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-claude-muted/40 dark:text-white uppercase tracking-widest">
                    <Clock size={10} />
                    <span>{format(wish.createdAt, 'yyyy.MM.dd')}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeSubTab === 'ceremony' && (
          <motion.div 
            key="ceremony" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="h-full"
          >
            <div className="flex gap-4 overflow-x-auto pb-8 pt-2 no-scrollbar snap-x snap-mandatory">
              {mockCeremonies.map(ceremony => {
                const days = Math.abs(differenceInDays(new Date(), ceremony.date));
                const isPast = ceremony.type === 'count-up';

                return (
                  <div key={ceremony.id} className="min-w-[280px] aspect-[4/5] bg-claude-accent/5 border border-claude-accent/20 rounded-[3rem] p-8 flex flex-col justify-between snap-center relative overflow-hidden group">
                    {/* Decorative abstract pattern */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-claude-accent/5 rounded-full blur-2xl group-hover:bg-claude-accent/10 transition-colors" />
                    
                    <div>
                      <div className="flex items-center gap-2 mb-8">
                        <div className="w-8 h-px bg-claude-accent/30" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-claude-accent opacity-60">
                          {isPast ? 'Journey' : 'Countdown'}
                        </span>
                      </div>
                      <h3 className="text-3xl font-serif italic mb-2 pr-6 leading-tight">
                        {ceremony.title}
                      </h3>
                      <p className="text-[10px] font-mono text-claude-muted opacity-40 uppercase">
                        {format(ceremony.date, 'MMMM do, yyyy')}
                      </p>
                    </div>

                    <div className="text-center pb-4">
                      <span className="block text-6xl font-serif italic text-claude-accent mb-2">
                        {days}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-claude-muted opacity-60">
                        Days {isPast ? 'Since' : 'To Go'}
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className={cn("h-1 rounded-full transition-all", i === 0 ? "w-4 bg-claude-accent" : "w-1 bg-claude-accent/20")} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 flex flex-col items-center text-center opacity-30">
              <CalendarDays size={48} className="mb-4 text-claude-muted" />
              <p className="text-xs font-serif italic italic">Swipe to explore milestones</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
