import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Paperclip, 
  Mic, 
  ChevronRight, 
  Search, 
  Calendar,
  Heart,
  MessageSquarePlus,
  History,
  Clock,
  Sparkles,
  Command as CommandIcon,
  ChevronDown,
  ChevronUp,
  X
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Message, Session } from "@/src/lib/types";
import { format } from "date-fns";
import CalendarHeatmap from "./CalendarHeatmap";

export default function ChatView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Coco, your Claude-powered assistant. How can I help you today?",
      sender: 'coco',
      timestamp: new Date(),
      type: 'text',
      thought_process: "Initializing communication protocol... Ready to assist.",
      tokens: 28,
      thinking_time: 0.8
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHeatmapOpen, setIsHeatmapOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sessions: Session[] = [
    { id: '1', name: "Project Planning", createdAt: new Date(), contextLength: 1200 },
    { id: '2', name: "Code Review", createdAt: new Date(Date.now() - 86400000), contextLength: 4500 },
  ];

  const heatmapData = [
    { date: new Date(), count: 8 },
    { date: new Date(Date.now() - 86400000), count: 3 },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    setIsThinking(true);

    // Mock response
    setTimeout(() => {
      const cocoResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Received: ${inputValue}. Processing through Claude...`,
        sender: 'coco',
        timestamp: new Date(),
        type: 'text',
        thought_process: "Analyzing user input... query type: command. Executing VPS task...",
        tokens: 154,
        thinking_time: 2.1,
        tool_calls: ["vps_exec", "file_read"]
      };
      setMessages(prev => [...prev, cocoResponse]);
      setIsThinking(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      {/* Session Drawer Trigger & Search */}
      <div className="flex items-center justify-between mb-4 sticky top-0 z-10 bg-inherit py-2">
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-claude-accent hover:opacity-90 transition-colors text-sm font-medium text-white"
        >
          <History size={16} />
          <span>Sessions</span>
        </button>
        <div className="flex gap-2 items-center">
          <button 
            onClick={() => setIsHeatmapOpen(true)}
            className={cn(
              "p-2 rounded-full transition-colors",
              isHeatmapOpen ? "bg-claude-accent text-white" : "hover:bg-claude-accent/10"
            )}
          >
            <Calendar size={18} />
          </button>
          
          {/* Heartbeat Status in Toolbar */}
          <AnimatePresence>
            {!isThinking && messages.length > 0 && messages[messages.length-1].sender === 'coco' && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0, opacity: 0 }}
                className="text-claude-accent px-1"
              >
                <Heart size={18} fill="currentColor" className="animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>

          <button className="p-2 rounded-full hover:bg-claude-accent/10 transition-colors">
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 pb-4 scroll-smooth"
      >
        <AnimatePresence>
          {isHeatmapOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-8"
            >
              <div className="flex justify-end mb-2">
                <button onClick={() => setIsHeatmapOpen(false)} className="text-[10px] uppercase font-bold text-claude-muted hover:text-claude-accent flex items-center gap-1">
                  <X size={12} /> Close Heatmap
                </button>
              </div>
              <CalendarHeatmap data={heatmapData} onSelectDate={(date) => console.log(date)} />
            </motion.div>
          )}
        </AnimatePresence>

        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-claude-secondary/50 rounded-2xl px-4 py-2 flex items-center gap-2">
              <Sparkles size={14} className="animate-spin text-claude-accent" />
              <span className="text-xs italic text-claude-muted italic">Coco is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="mt-4 pb-2">
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button className="p-1.5 rounded-full hover:bg-claude-accent/10 text-claude-muted transition-colors">
              <Paperclip size={18} />
            </button>
          </div>
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message or /command..."
            className="w-full bg-claude-secondary/30 border border-claude-text/5 rounded-2xl py-3.5 pl-14 pr-24 focus:outline-none focus:ring-1 focus:ring-claude-accent/30 focus:border-claude-accent/30 transition-all text-sm"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button className="p-2 rounded-full hover:bg-claude-accent/10 text-claude-muted transition-colors">
              <Mic size={18} />
            </button>
            <button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="p-2 rounded-xl bg-claude-accent text-white disabled:opacity-30 transition-all flex items-center justify-center"
            >
              <Send size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Drawer (Sessions) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-claude-bg shadow-2xl z-[70] p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-serif italic text-claude-text dark:text-gray-600">Sessions</h2>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-claude-secondary rounded-full transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
              
              <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-claude-accent text-white font-medium mb-6 transition-transform active:scale-95">
                <MessageSquarePlus size={20} />
                <span>New Session</span>
              </button>

              <div className="flex-1 overflow-y-auto space-y-3">
                {sessions.map(session => (
                  <button 
                    key={session.id}
                    className="w-full text-left p-4 rounded-xl bg-claude-secondary/30 hover:bg-claude-secondary transition-colors border border-transparent hover:border-claude-accent/10 group"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm text-claude-text dark:text-gray-600 group-hover:text-claude-accent dark:group-hover:text-claude-accent transition-colors">{session.name}</span>
                      <span className="text-[10px] text-claude-muted opacity-60">ID: {session.id}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-claude-muted">
                      <div className="flex items-center gap-1">
                        <Clock size={10} />
                        <span>{format(session.createdAt, "MM/dd HH:mm")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CommandIcon size={10} />
                        <span>{session.contextLength} tokens</span>
                      </div>
                    </div>
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

function MessageBubble({ msg }: { msg: Message, key?: string }) {
  const [showThoughts, setShowThoughts] = useState(false);
  const isCoco = msg.sender === 'coco';

  return (
    <div className={cn(
      "flex flex-col max-w-[85%]",
      isCoco ? "self-start" : "self-end items-end"
    )}>
      {/* Thoughts & Info for Coco */}
      {isCoco && msg.thought_process && (
        <div className="mb-2 ml-1">
          <button 
            onClick={() => setShowThoughts(!showThoughts)}
            className="flex items-center gap-1 text-[10px] text-claude-muted uppercase tracking-wider font-semibold opacity-60 hover:opacity-100 transition-opacity"
          >
            {showThoughts ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
            <span>{showThoughts ? "Hide Thought" : "See Thinking Process"}</span>
          </button>
          <AnimatePresence>
            {showThoughts && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-claude-text/5 border-l-2 border-claude-accent/30 italic text-[11px] p-2 mt-1 rounded-r-md text-claude-muted leading-relaxed"
              >
                {msg.thought_process}
                {msg.tool_calls && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {msg.tool_calls.map(tool => (
                      <span key={tool} className="px-1.5 py-0.5 bg-claude-accent/10 rounded-sm font-mono text-[9px] uppercase">{tool}</span>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Bubble */}
      <div className={cn(
        "px-4 py-3 text-[15px] leading-relaxed relative",
        isCoco 
          ? "bg-claude-secondary text-claude-text rounded-2xl rounded-tl-none border border-claude-text/5" 
          : "bg-claude-accent text-white rounded-2xl rounded-tr-none shadow-md shadow-claude-accent/10"
      )}>
        {msg.content}
        
        {/* Meta info in bubble corner */}
        <div className={cn(
          "flex items-center gap-1.5 mt-1.5 text-[9px] opacity-60",
          !isCoco && "flex-row-reverse"
        )}>
          <span>{format(msg.timestamp, "HH:mm")}</span>
          {isCoco && msg.tokens && (
            <>
              <span className="w-0.5 h-0.5 bg-current rounded-full" />
              <span>{msg.tokens} tokens</span>
              <span className="w-0.5 h-0.5 bg-current rounded-full" />
              <span>{msg.thinking_time}s</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
