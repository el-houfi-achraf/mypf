import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Notification = ({ message, type = "success", isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 z-50"
        >
          <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-black/80 backdrop-blur-sm border border-white/10">
            {type === "success" ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
            <span className="text-white">{message}</span>
            <button
              onClick={onClose}
              className="ml-4 text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
