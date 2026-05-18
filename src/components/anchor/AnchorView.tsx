import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Settings2, 
  Menu, 
  X,
  ChevronRight,
  Hash,
  Filter
} from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function AnchorView() {
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [detailItem, setDetailItem] = useState<{ category: string, date: string, content: string, tags: string[] } | null>(null);

  const tags = [
    { name: 'Philosophy', count: 12 },
    { name: 'Music', count: 8 },
    { name: 'Code', count: 24 },
    { name: 'Personal', count: 5 },
    { name: 'Dreams', count: 3 }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Top Search Bar */}
      <div className="flex items-center gap-3 sticky top-0 z-20 bg-inherit py-2 mb-6">
        <button 
          onClick={() => setIsTagsOpen(true)}
          className="p-3 rounded-2xl bg-claude-secondary hover:bg-claude-accent hover:text-white transition-all shadow-sm"
        >
          <Menu size={20} className="dark:text-claude-accent" />
        </button>
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-claude-muted opacity-50" />
          <input 
            type="text"
            placeholder="Search within memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-claude-secondary/30 backdrop-blur-sm border border-claude-text/5 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-claude-accent/30 focus:border-claude-accent/30 transition-all text-sm"
          />
        </div>
        <button className="p-3 rounded-2xl bg-claude-secondary hover:bg-claude-accent hover:text-white transition-all shadow-sm">
          <Settings2 size={20} />
        </button>
      </div>

      {/* memory List (placeholder) */}
      <div className="space-y-4 pb-4">
        <div className="flex items-center gap-2 mb-2 px-1">
          <Filter size={14} className="text-claude-muted" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-claude-muted">Recent Anchors</span>
        </div>
        
        {[...Array(5)].map((_, i) => {
          const item = {
            category: "Category Name",
            date: "05.18.2026",
            content: "The subtle interplay between digital logic and organic memory.",
            tags: ["logic", "memory"]
          };
          return (
            <div 
              key={i} 
              onClick={() => setDetailItem(item)}
              className="group p-5 bg-white/40 border border-claude-text/5 rounded-2xl hover:bg-white/60 hover:border-claude-accent/20 hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="px-2 py-0.5 bg-claude-secondary dark:text-claude-accent rounded-full text-[9px] uppercase tracking-wider font-bold">Category Name</span>
                <span className="text-[10px] text-claude-muted dark:text-white opacity-40 italic">05.18.2026</span>
              </div>
              <h4 className="text-[13px] font-serif italic mb-2 leading-snug line-clamp-2">{item.content}</h4>
              <div className="flex gap-2">
                {item.tags.map(t => (
                  <span key={t} className="text-[10px] text-claude-muted font-mono bg-claude-text/5 dark:bg-black px-2 py-0.5 rounded cursor-pointer hover:bg-claude-accent/20 hover:text-claude-accent">#{t}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {detailItem && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setDetailItem(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-4 m-auto max-w-sm h-fit bg-claude-bg rounded-[2.5rem] shadow-2xl z-[90] p-8"
            >
              <div className="flex justify-end mb-4">
                <button onClick={() => setDetailItem(null)} className="p-2 hover:bg-claude-secondary rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="mb-6">
                <span className="px-2 py-1 bg-claude-secondary dark:text-claude-accent rounded-full text-[10px] uppercase tracking-wider font-bold mb-4 inline-block">
                  {detailItem.category}
                </span>
                <h3 className="text-2xl font-serif italic leading-relaxed">
                  {detailItem.content}
                </h3>
              </div>
              <div className="flex gap-2 mb-8">
                {detailItem.tags.map(t => (
                  <span key={t} className="text-xs text-claude-accent font-mono">#{t}</span>
                ))}
              </div>
              <div className="pt-6 border-t border-claude-text/5 text-xs text-claude-muted">
                Anchored on {detailItem.date}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Left Drawer (Tags) */}
      <AnimatePresence>
        {isTagsOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsTagsOpen(false)}
              className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-claude-bg shadow-2xl z-[70] p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-serif italic">All Tags</h3>
                <button onClick={() => setIsTagsOpen(false)} className="p-2 hover:bg-claude-secondary rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-2">
                <button className="flex items-center justify-between w-full p-4 rounded-xl bg-claude-accent text-white group">
                  <div className="flex items-center gap-3">
                    <Hash size={18} />
                    <span className="font-medium text-sm tracking-wide">All Memories</span>
                  </div>
                  <ChevronRight size={16} />
                </button>
                
                {tags.map(tag => (
                  <button key={tag.name} className="flex items-center justify-between w-full p-4 rounded-xl hover:bg-claude-secondary/50 group transition-all">
                    <div className="flex items-center gap-3 text-claude-muted group-hover:text-claude-text">
                      <Hash size={18} />
                      <span className="font-medium text-sm tracking-wide">{tag.name}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-claude-secondary rounded-lg text-[10px] font-bold text-claude-muted">{tag.count}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
