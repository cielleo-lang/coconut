import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Pin, 
  RotateCcw, 
  CalendarDays, 
  ChevronRight,
  Sparkles,
  Search,
  Plus,
  X
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { MemoryCard } from "@/src/lib/types";

type SubTab = 'affinity' | 'fragments' | 'dream';

export default function NegentropyView() {
  const [activeTab, setActiveTab] = useState<SubTab>('affinity');
  const [viewType, setViewType] = useState<'daily' | 'weekly'>('daily');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [detailCard, setDetailCard] = useState<MemoryCard | null>(null);

  const mockCards: MemoryCard[] = [
    { 
      id: '1', 
      tag: 'philosophy', 
      domain: 'existence', 
      feel: 'profound', 
      content: "The concept of negentropy as a measure of order is essential for understanding biological systems.",
      createdAt: new Date(),
      type: 'affinity'
    },
    { 
      id: '2', 
      tag: 'music', 
      domain: 'theory', 
      feel: 'technical', 
      content: "Exploring the relationship between harmonic series and natural order in complex soundscapes.",
      chord: "Cmaj7/G",
      chordDescription: "Ethereal and grounded",
      createdAt: new Date(),
      type: 'dream'
    },
    { 
      id: '3', 
      tag: 'impression', 
      domain: 'daily', 
      feel: 'observed', 
      content: "Today the sunlight felt thicker, almost tangible, as it cascaded through the library window...",
      createdAt: new Date(),
      type: 'fragments' as any
    }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header Statement */}
      <div className="mb-4 mt-2">
        <h2 className="text-lg font-serif italic text-claude-accent border-b border-claude-accent/20 pb-4">
          "Life feeds on negentropy."
        </h2>
      </div>

      {/* Internal Nav */}
      <div className="flex items-center gap-6 mb-8 border-b border-claude-text/5">
        {(['affinity', 'fragments', 'dream'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "pb-4 text-sm font-medium tracking-widest uppercase relative transition-colors",
              activeTab === tab ? "text-claude-accent dark:text-claude-accent" : "text-claude-muted hover:text-claude-text"
            )}
          >
            {activeTab === tab && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-claude-accent" />
            )}
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto pb-4">
        {activeTab === 'affinity' && (
          <div className="grid grid-cols-1 gap-4">
            {mockCards.filter(c => c.type === 'affinity').map(card => (
              <MemoryCardElement key={card.id} card={card} onClick={() => setDetailCard(card)} />
            ))}
          </div>
        )}

        {activeTab === 'fragments' && (
          <div className="grid grid-cols-1 gap-4">
            {mockCards.filter(c => c.type === 'fragments' as any).map(card => (
              <MemoryCardElement key={card.id} card={card} onClick={() => setDetailCard(card)} />
            ))}
          </div>
        )}

        {activeTab === 'dream' && (
          <div className="grid grid-cols-1 gap-4">
            {mockCards.filter(c => c.type === 'dream').map(card => (
              <MemoryCardElement key={card.id} card={card} onClick={() => setDetailCard(card)} />
            ))}
          </div>
        )}
      </div>

      {/* History Drawer */}
      <AnimatePresence>
        {isHistoryOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsHistoryOpen(false)}
              className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="fixed bottom-0 left-0 right-0 h-[70vh] bg-claude-bg rounded-t-3xl shadow-2xl z-[70] p-6 flex flex-col"
            >
              <div className="w-12 h-1 bg-claude-text/10 rounded-full mx-auto mb-6" />
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif italic">Archive (Last {viewType === 'daily' ? '7' : '30'} days)</h3>
                <button onClick={() => setIsHistoryOpen(false)} className="p-2 hover:bg-claude-secondary rounded-full transition-colors">
                  <ChevronRight size={20} className="rotate-90" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="p-4 rounded-xl bg-claude-secondary/30 border border-transparent hover:border-claude-accent/10 transition-all cursor-pointer">
                    <span className="text-[10px] text-claude-muted block mb-1">05.{17-i}</span>
                    <p className="text-sm font-serif italic line-clamp-1">Fragment of a memory from a few days ago regarding the silence of the night.</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {detailCard && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setDetailCard(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-4 m-auto max-w-sm h-fit bg-claude-bg rounded-[2.5rem] shadow-2xl z-[90] p-8 overflow-y-auto max-h-[80vh]"
            >
              <div className="flex justify-end mb-4">
                <button onClick={() => setDetailCard(null)} className="p-2 hover:bg-claude-secondary rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="mb-6">
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-claude-accent/10 text-claude-accent text-[10px] uppercase tracking-wider font-bold rounded-full">
                    {detailCard.tag}
                  </span>
                  <span className="px-3 py-1 bg-claude-secondary text-claude-muted text-[10px] uppercase tracking-wider font-bold rounded-full">
                    {detailCard.domain}
                  </span>
                </div>
                <h3 className="text-sm not-italic text-black dark:text-black mb-6 leading-relaxed">
                  {detailCard.content}
                </h3>
                {detailCard.chord && (
                  <div className="mt-4 p-4 bg-claude-accent/5 rounded-2xl border border-claude-accent/10">
                    <p className="text-claude-accent font-mono font-bold mb-1">{detailCard.chord}</p>
                    <p className="text-xs italic text-claude-muted">{detailCard.chordDescription}</p>
                  </div>
                )}
              </div>
              <div className="pt-6 border-t border-claude-text/5 text-xs text-claude-muted flex justify-between items-center">
                <span>Feel: {detailCard.feel}</span>
                <span>2026.05.18</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function MemoryCardElement({ card, onClick }: { card: MemoryCard, key?: string, onClick?: () => void }) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="bg-white/60 border border-claude-text/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group overflow-hidden relative cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          <span className="px-2 py-0.5 bg-claude-accent/10 text-claude-accent text-[9px] uppercase tracking-wider font-bold rounded-full">
            {card.tag}
          </span>
          <span className="px-2 py-0.5 bg-claude-secondary text-claude-muted text-[9px] uppercase tracking-wider font-bold rounded-full">
            {card.domain}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="italic text-[10px] text-claude-muted">{card.feel}</span>
          <Pin size={12} className={cn("text-claude-muted group-hover:text-claude-accent transition-colors", card.type === 'affinity' && "text-claude-accent")} />
        </div>
      </div>
      
      <p className="font-serif italic text-claude-text dark:text-white leading-relaxed text-sm mb-4 line-clamp-2">
        "{card.content}"
      </p>

      {card.chord && (
        <div className="flex items-center gap-3 px-3 py-2 bg-claude-accent/5 rounded-xl border border-claude-accent/10">
          <span className="font-mono text-xs font-bold text-claude-accent">{card.chord}</span>
          <div className="w-px h-3 bg-claude-accent/20" />
          <span className="text-[10px] italic text-claude-muted">{card.chordDescription}</span>
        </div>
      )}
      
      <div className="mt-3 text-[9px] text-claude-muted dark:text-black">
        Created at 03:42 • 2026.05.18
      </div>
    </motion.div>
  );
}

function AddCardButton({ label = "Capture Thought", className }: { label?: string, className?: string }) {
  return (
    <button className={cn(
      "w-full py-6 rounded-2xl border-2 border-dashed border-claude-text/5 hover:border-claude-accent/20 hover:bg-claude-accent/5 transition-all flex flex-col items-center justify-center gap-2 group",
      className
    )}>
      <div className="p-2 rounded-full bg-claude-secondary group-hover:bg-claude-accent transition-colors">
        <Plus size={20} className="text-claude-muted group-hover:text-white transition-colors" />
      </div>
      <span className="text-[10px] uppercase tracking-widest font-bold text-claude-muted group-hover:text-claude-accent transition-colors">{label}</span>
    </button>
  );
}
