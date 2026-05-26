import { useCounter } from '../hooks/useCounter';
import { motion } from 'framer-motion';

export default function Counter() {
  const { years, months, days, hours, minutes, seconds } = useCounter();

  const CounterUnit = ({ value, label, delay = 0 }) => (
    <motion.div
      className="flex flex-col items-center gap-0.5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="gpu-accelerated font-serif text-3xl sm:text-4xl font-black text-white drop-shadow-[0_0_25px_rgba(192,132,252,0.5)]">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-xs font-medium text-primary/80 uppercase tracking-wider text-center">
        {label}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="sticky top-0 bg-dark/90 backdrop-blur-2xl z-100 border-b border-primary/5 px-3 sm:px-6 py-2.5 sm:py-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-center items-center flex-wrap gap-1 sm:gap-3 max-w-6xl mx-auto">
        <CounterUnit value={years} label="Anos" delay={0} />
        <div className="text-primary/40 text-lg hidden xs:block">•</div>
        <CounterUnit value={months} label="Meses" delay={0.05} />
        <div className="text-primary/40 text-lg hidden xs:block">•</div>
        <CounterUnit value={days} label="Dias" delay={0.1} />
        <div className="text-primary/40 text-lg hidden xs:block">•</div>
        <CounterUnit value={hours} label="Horas" delay={0.15} />
        <div className="text-primary/40 text-lg hidden xs:block">•</div>
        <CounterUnit value={minutes} label="Min" delay={0.2} />
        <div className="text-primary/40 text-lg hidden xs:block\">•</div>
        <CounterUnit value={seconds} label="Seg" delay={0.25} />
      </div>
    </motion.div>
  );
}
