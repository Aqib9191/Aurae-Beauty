import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 bg-[#1F1B19] text-[#FAF8F5] p-4 rounded-xl shadow-2xl border border-[#3E3835] transition-all transform translate-y-0"
          role="alert"
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-[#D8CCC4]" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-[#E07A5F]" />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-[#FAF8F5] font-sans">{toast.title}</h4>
            <p className="text-xs text-[#D8CCC4] mt-0.5 leading-relaxed font-sans">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 text-[#A89F91] hover:text-[#FAF8F5] transition-colors p-1"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
