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
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="w-full py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
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
              className="group relative aspect-square rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer gpu-accelerated shadow-lg hover:shadow-[0_0_40px_rgba(192,132,252,0.25)]"
              whileHover={{ scale: 1.04 }}
            >
              <img
                src={photo}
                alt={`Momento ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
