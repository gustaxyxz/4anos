import { motion } from 'framer-motion';

const photos = [
  '/IMG_1420.JPEG',
  '/IMG_0419.JPEG',
  '/IMG_1735.JPEG',
  '/IMG_8285.JPEG',
  '/IMG_1878.JPEG',
  '/IMG_1638.JPEG',
];

export default function Gallery() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="w-full py-20 sm:py-28 px-4 sm:px-6 relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black gradient-text text-center mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Nossos Momentos
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {photos.map((photo, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/60 transition-all duration-300 cursor-pointer gpu-accelerated shadow-lg hover:shadow-[0_0_60px_rgba(192,132,252,0.4)]"
              whileHover={{ scale: 1.06, rotateY: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={photo}
                alt={`Momento ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-dark to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center"
                initial={{ y: 20 }}
                whileHover={{ y: 0 }}
              >
                <span className="text-primary font-serif text-sm font-bold">Momento {idx + 1}</span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
