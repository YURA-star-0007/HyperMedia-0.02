
import React from 'react';
import { 
  X, Image, Clapperboard, MessageSquare, Trophy, 
  Mic, Plus, Music, Store, UserPlus, Gamepad2,
  ChevronRight, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActionMenuProps {
  onClose: () => void;
  onAction: (type: string) => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ onClose, onAction }) => {
  const sections = [
    {
      title: 'Post Content',
      items: [
        { id: 'post', label: 'Post Image', icon: <Image size={20} />, color: 'text-blue-400' },
        { id: 'reel', label: 'Post Reel', icon: <Clapperboard size={20} />, color: 'text-pink-400' },
        { id: 'thread', label: 'Post Thread', icon: <MessageSquare size={20} />, color: 'text-purple-400' },
        { id: 'voice', label: 'Post Voice Thread', icon: <Mic size={20} />, color: 'text-emerald-400' },
        { id: 'achievement', label: 'Post Achievement', icon: <Trophy size={20} />, color: 'text-amber-400' },
      ]
    },
    {
      title: 'Entertainment',
      items: [
        { id: 'zmusic', label: 'Z Music', icon: <Music size={20} />, color: 'text-emerald-400' },
      ]
    },
    {
      title: 'Services',
      items: [
        { id: 'marketplace', label: 'AI Marketplace', icon: <Store size={20} />, color: 'text-blue-400' },
      ]
    },
    {
      title: 'System Z',
      items: [
        { id: 'connect-account', label: 'Connect Account', icon: <UserPlus size={20} />, color: 'text-orange-400' },
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6"
    >
      <motion.div 
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-md bg-zinc-950 border-t sm:border border-white/10 rounded-t-[40px] sm:rounded-[40px] p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        <div className="flex justify-between items-center mb-8 shrink-0">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">CREATE</h2>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Hyper Media Suite</p>
          </div>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={onClose} 
            className="p-3 bg-white/5 rounded-full text-zinc-400 hover:text-white transition-all"
          >
            <X size={20} />
          </motion.button>
        </div>

        <div className="flex-grow overflow-y-auto no-scrollbar space-y-8 pb-8">
          {sections.map((section, sIdx) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] px-2">{section.title}</h3>
              <div className="grid grid-cols-1 gap-2">
                {section.items.map((item, iIdx) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 8, backgroundColor: 'rgba(255,255,255,0.05)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onAction(item.id)}
                    className="flex items-center gap-4 p-4 rounded-2xl transition-all group"
                  >
                    <div className={`p-2.5 rounded-xl bg-zinc-900 ${item.color} group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <span className="font-bold text-zinc-300 group-hover:text-white transition-colors">{item.label}</span>
                    <ChevronRight size={16} className="ml-auto text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-white/5 text-center shrink-0">
          <div className="flex items-center justify-center gap-2 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
            <Sparkles size={12} /> Powered by Gemini 3.1 Pro
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ActionMenu;
