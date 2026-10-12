import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext({
  showToast: () => {}
});

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((curr) => (curr && curr.message === message ? null : curr));
    }, 3800);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className={`toast-notification toast-${toast.type}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {toast.type === 'success' && <CheckCircle2 size={16} color="var(--proven-color)" />}
            {toast.type === 'error' && <AlertCircle size={16} color="var(--danger-color)" />}
            {toast.type === 'info' && <Info size={16} color="var(--teal-600)" />}
            <span style={{ fontSize: '13px', fontWeight: '600' }}>{toast.message}</span>
          </div>
          <button
            onClick={hideToast}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--slate-400)',
              cursor: 'pointer',
              display: 'flex',
              padding: '2px'
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
