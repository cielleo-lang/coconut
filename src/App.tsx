/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  BrainCircuit, 
  Anchor, 
  LayoutGrid, 
  Music,
  Moon,
  Sun
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { View } from "@/src/lib/types";

// Component imports (to be created)
import ChatView from "@/src/components/chat/ChatView";
import NegentropyView from "@/src/components/negentropy/NegentropyView";
import AnchorView from "@/src/components/anchor/AnchorView";
import CoconutView from "@/src/components/coconut/CoconutView";
import ResonanceView from "@/src/components/resonance/ResonanceView";

export default function App() {
  const [activeView, setActiveView] = useState<View>('chat');
  const [darkMode, setDarkMode] = useState(false);

  // Sync with system theme preference
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
  }, []);

  const navItems = [
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'negentropy', label: 'Negentropy', icon: BrainCircuit },
    { id: 'anchor', label: 'Anchor', icon: Anchor },
    { id: 'coconut', label: 'Coconut', icon: LayoutGrid },
    { id: 'resonance', label: 'Resonance', icon: Music },
  ];

  return (
    <div className={cn(
      "min-h-screen flex flex-col font-sans transition-colors duration-500",
      darkMode ? "bg-[#0A0A0A] text-[#F3F0EC]" : "bg-claude-bg text-claude-text"
    )}>
      {/* Top Header Placeholder / Status bar */}
      <header className="px-6 pt-4 pb-4 flex justify-between items-center z-10">
        <h1 className="text-2xl italic font-serif text-claude-accent drop-shadow-sm">
          {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
        </h1>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-claude-secondary/50 hover:bg-claude-accent/10 transition-colors"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 px-4 pb-24 overflow-y-auto"
          >
            {activeView === 'chat' && <ChatView />}
            {activeView === 'negentropy' && <NegentropyView />}
            {activeView === 'anchor' && <AnchorView />}
            {activeView === 'coconut' && <CoconutView />}
            {activeView === 'resonance' && <ResonanceView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className={cn(
        "fixed bottom-0 left-0 right-0 z-50 px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+12px)] flex justify-around items-center border-t backdrop-blur-md",
        darkMode ? "bg-black/80 border-white/10" : "bg-white/80 border-claude-text/5"
      )}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={cn(
                "flex flex-col items-center gap-1 transition-all duration-300",
                isActive ? "text-claude-accent scale-110" : "text-claude-muted opacity-60 hover:opacity-100"
              )}
            >
              <Icon size={isActive ? 24 : 20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium uppercase tracking-widest">{item.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="active-tab"
                  className="absolute -bottom-2 w-1 h-1 bg-claude-accent rounded-full"
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
