import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Search, 
  ListMusic,
  Heart,
  Repeat,
  Shuffle,
  Music2,
  ChevronDown,
  Headphones
} from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function ResonanceView() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'playlist' | 'player' | 'search'>('playlist');
  
  const currentSong = {
    title: "Nocturne in E-flat major",
    artist: "Frédéric Chopin",
    cover: "https://picsum.photos/600/600?music=1",
    duration: "4:28",
    currentTime: "2:15"
  };

  const playlist = [
    { title: "Weightless", artist: "Marconi Union", duration: "8:00" },
    { title: "Gymnopédie No.1", artist: "Erik Satie", duration: "3:25" },
    { title: "Claire de Lune", artist: "Claude Debussy", duration: "5:04" },
    { title: "Spiegel im Spiegel", artist: "Arvo Pärt", duration: "9:20" },
  ];

  // Update Media Session for background control
  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist,
        artwork: [{ src: currentSong.cover, sizes: '512x512', type: 'image/jpeg' }]
      });

      navigator.mediaSession.setActionHandler('play', () => setIsPlaying(true));
      navigator.mediaSession.setActionHandler('pause', () => setIsPlaying(false));
    }
  }, [currentSong, isPlaying]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <AnimatePresence mode="wait">
        {activeTab === 'playlist' && (
          <motion.div 
            key="playlist"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col pt-2"
          >
            {/* Player Mini Header */}
            <div 
              onClick={() => setActiveTab('player')}
              className="flex items-center gap-4 p-4 bg-white/40 border border-claude-text/5 rounded-3xl mb-8 cursor-pointer hover:bg-white/60 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl overflow-hidden relative">
                <img src={currentSong.cover} alt="Cover" className={cn("w-full h-full object-cover", isPlaying && "animate-[spin_8s_linear_infinite]")} />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <Play size={16} className="text-white fill-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold truncate group-hover:text-claude-accent transition-colors">{currentSong.title}</h4>
                <p className="text-[10px] uppercase tracking-widest text-claude-muted font-bold">{currentSong.artist}</p>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-claude-accent bg-claude-accent/10 px-3 py-1.5 rounded-full">
                <Headphones size={12} className="animate-pulse" />
                <span>ACTIVE</span>
              </div>
            </div>

            {/* Sub Nav */}
            <div className="flex items-center gap-4 mb-6">
              <button className="flex-1 py-3 bg-claude-accent text-white rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-claude-accent/20">
                <ListMusic size={18} />
                <span className="text-sm font-medium">My Playlist</span>
              </button>
              <button 
                onClick={() => setActiveTab('search')}
                className="p-3 bg-claude-secondary rounded-2xl hover:bg-claude-accent hover:text-white transition-all"
              >
                <Search size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pb-20 no-scrollbar">
              {playlist.map((song, i) => (
                <div key={song.title} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/40 transition-all cursor-pointer group">
                  <span className="text-[10px] font-mono text-claude-muted opacity-30 w-4 tracking-tighter">0{i+1}</span>
                  <div className="flex-1">
                    <h5 className="text-sm font-medium group-hover:text-claude-accent transition-all">{song.title}</h5>
                    <p className="text-[10px] text-claude-muted uppercase tracking-wider font-bold">{song.artist}</p>
                  </div>
                  <span className="text-[10px] font-mono text-claude-muted bg-claude-text/5 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">{song.duration}</span>
                </div>
              ))}
            </div>

            {/* Floating Music Bar */}
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="fixed bottom-[calc(env(safe-area-inset-bottom)+76px)] left-4 right-4 bg-white/90 backdrop-blur-md border border-claude-text/5 rounded-2xl p-3 shadow-xl z-30 flex items-center gap-3"
            >
              <div 
                onClick={() => setActiveTab('player')}
                className="w-10 h-10 rounded-xl overflow-hidden cursor-pointer"
              >
                <img src={currentSong.cover} alt="Cover" className={cn("w-full h-full object-cover", isPlaying && "animate-[spin_8s_linear_infinite]")} />
              </div>
              <div 
                onClick={() => setActiveTab('player')}
                className="flex-1 min-w-0 cursor-pointer"
              >
                <h4 className="text-xs font-bold truncate dark:text-black">{currentSong.title}</h4>
                <p className="text-[9px] uppercase tracking-wider text-claude-muted font-bold truncate">{currentSong.artist}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-full bg-claude-accent text-white"
                >
                  {isPlaying ? <Pause size={14} fill="white" /> : <Play size={14} fill="white" className="ml-0.5" />}
                </button>
                <button className="p-2 rounded-full hover:bg-claude-secondary text-claude-text dark:text-neutral-700">
                  <SkipForward size={14} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'player' && (
          <motion.div 
            key="player"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col items-center justify-center pt-4"
          >
            <button 
              onClick={() => setActiveTab('playlist')}
              className="absolute top-2 left-1/2 -translate-x-1/2 p-2 hover:bg-claude-secondary rounded-full"
            >
              <ChevronDown size={24} className="text-claude-muted" />
            </button>

            <div className="w-full max-w-sm aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-claude-accent/20 mb-12 border-8 border-white/50">
              <img src={currentSong.cover} alt="Cover" className="w-full h-full object-cover" />
            </div>

            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif italic mb-2 px-6">{currentSong.title}</h2>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-claude-accent">{currentSong.artist}</p>
            </div>

            {/* Playback controls */}
            <div className="w-full max-w-md px-4 space-y-8">
              <div className="space-y-2">
                <div className="h-1 w-full bg-claude-text/5 rounded-full relative overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }} animate={{ width: "45%" }}
                    className="absolute inset-y-0 left-0 bg-claude-accent"
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-claude-muted">
                  <span>{currentSong.currentTime}</span>
                  <span>{currentSong.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-around">
                <button className="text-claude-muted hover:text-claude-accent transition-colors">
                  <Shuffle size={20} />
                </button>
                <div className="flex items-center gap-8">
                  <button className="text-claude-text hover:text-claude-accent transition-colors">
                    <SkipBack size={32} fill="currentColor" stroke="none" />
                  </button>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-20 h-20 bg-claude-accent text-white rounded-3xl flex items-center justify-center shadow-xl shadow-claude-accent/30 hover:scale-105 active:scale-95 transition-all"
                  >
                    {isPlaying ? <Pause size={36} fill="white" /> : <Play size={36} fill="white" className="ml-1" />}
                  </button>
                  <button className="text-claude-text hover:text-claude-accent transition-colors">
                    <SkipForward size={32} fill="currentColor" stroke="none" />
                  </button>
                </div>
                <button className="text-claude-muted hover:text-claude-accent transition-colors">
                  <Repeat size={20} />
                </button>
              </div>

              <div className="flex items-center justify-center gap-12 pt-4">
                <Heart size={20} className="text-claude-muted hover:text-red-500 transition-colors" />
                <div className="flex items-center gap-2 text-claude-muted">
                  <Volume2 size={20} />
                  <div className="w-24 h-1 bg-claude-text/5 rounded-full">
                    <div className="h-full w-2/3 bg-claude-text/20 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'search' && (
          <motion.div 
            key="search"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="flex-1 pt-2"
          >
            <div className="relative mb-8">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-claude-muted" />
              <input 
                type="text" 
                placeholder="Search songs, artists, albums..."
                className="w-full bg-claude-secondary/30 border border-claude-text/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-claude-accent/30 focus:border-claude-accent/30 transition-all text-sm"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-claude-muted">Recent Searches</h3>
              <div className="flex flex-wrap gap-2">
                {['Lo-fi', 'Classical', 'Jazz Night', 'Chopin'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-claude-secondary/50 rounded-full text-xs font-medium cursor-pointer hover:bg-claude-accent/10 hover:text-claude-accent transition-all uppercase tracking-tighter">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center justify-center text-center opacity-30">
              <Music2 size={64} className="mb-4" />
              <p className="text-sm font-serif italic italic">Connect NetEase API for live search</p>
            </div>

            <button 
              onClick={() => setActiveTab('playlist')}
              className="mt-8 flex items-center justify-center gap-2 w-full py-4 text-claude-muted hover:text-claude-accent transition-colors"
            >
              <ChevronDown size={18} className="rotate-90" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Back to Playlist</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
