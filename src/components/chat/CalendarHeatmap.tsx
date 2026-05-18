import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";

interface CalendarHeatmapProps {
  data: { date: Date; count: number }[];
  onSelectDate?: (date: Date) => void;
}

export default function CalendarHeatmap({ data, onSelectDate }: CalendarHeatmapProps) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Helper to get color based on count
  const getIntensityColor = (count: number) => {
    if (count === 0) return "bg-claude-secondary/30";
    if (count < 3) return "bg-claude-accent/20";
    if (count < 6) return "bg-claude-accent/40";
    if (count < 9) return "bg-claude-accent/60";
    return "bg-claude-accent";
  };

  const currentMonth = new Date();
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  return (
    <div className="bg-white/40 border border-claude-text/5 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif italic text-lg">{format(currentMonth, 'MMMM yyyy')}</h3>
        <button className="text-[10px] uppercase font-bold text-claude-muted bg-claude-secondary/50 px-3 py-1 rounded-full">
          Year View
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day} className="text-[10px] font-bold text-center text-claude-muted/50 pb-2">{day}</div>
        ))}
        
        {/* Placeholder padding for start of month */}
        {[...Array(daysInMonth[0].getDay())].map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {daysInMonth.map((day) => {
          const dayData = data.find(d => isSameDay(d.date, day));
          const count = dayData ? dayData.count : (Math.random() > 0.5 ? Math.floor(Math.random() * 10) : 0);
          
          return (
            <motion.div
              key={day.toString()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSelectDate?.(day)}
              className={cn(
                "aspect-square rounded-lg relative flex items-center justify-center cursor-pointer transition-colors shadow-sm",
                getIntensityColor(count)
              )}
            >
              <span className={cn(
                "text-[10px] font-medium",
                count > 5 ? "text-white" : "text-claude-text"
              )}>
                {format(day, 'd')}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-start gap-3 opacity-60">
        <span className="text-[9px] uppercase tracking-wider font-bold">Less</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-sm bg-claude-secondary/30" />
          <div className="w-2 h-2 rounded-sm bg-claude-accent/20" />
          <div className="w-2 h-2 rounded-sm bg-claude-accent/40" />
          <div className="w-2 h-2 rounded-sm bg-claude-accent/60" />
          <div className="w-2 h-2 rounded-sm bg-claude-accent" />
        </div>
        <span className="text-[9px] uppercase tracking-wider font-bold">More</span>
      </div>
    </div>
  );
}
