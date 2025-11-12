'use client';
import { useTheme } from '@/context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';

const Modal = ({ isOpen, setIsOpen, children, maxWidth = 'max-w-2xl' }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className='bg-black/60 backdrop-blur-sm p-2 sm:p-4 fixed inset-0 z-50 flex items-center justify-center overflow-y-auto cursor-pointer'
        >
          <style jsx global>{`
            .modal-transparent-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .modal-transparent-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .modal-transparent-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.1);
              border-radius: 4px;
            }
            .modal-transparent-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.2);
            }
            .modal-transparent-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
            }
          `}</style>
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={e => e.stopPropagation()}
            className={`rounded-2xl w-full ${maxWidth} shadow-2xl cursor-default relative overflow-hidden my-auto max-h-[95vh] sm:max-h-[90vh] flex flex-col`}
            style={
              isDarkMode
                ? {
                    background:
                      'linear-gradient(135deg, rgba(34, 33, 38, 0.98) 0%, rgba(17, 17, 22, 0.98) 100%)',
                    border: '1px solid rgba(241, 203, 104, 0.3)',
                  }
                : {
                    background: 'white',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                  }
            }
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
