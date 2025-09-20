// src/components/Modal.jsx
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ isShowing, hide, children }) {
  useEffect(() => {
    if (!isShowing) return;
    const onKey = (e) => {
      if (e.key === 'Escape') hide();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isShowing, hide]);

  if (typeof document === 'undefined') return null;
  if (!isShowing) return null;

  return createPortal(
    <div
      className='fixed inset-0 z-50 grid place-items-center p-4 sm:p-6'
      aria-modal='true'
      role='dialog'
      onClick={hide}
    >
      {/* Overlay */}
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />

      {/* Modal box */}
      <div
        className='relative bg-white rounded-xl shadow-lg z-10 w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[90vh] overflow-auto p-4 sm:p-6'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={hide}
          aria-label='Close modal'
          className='absolute top-3 right-3 rounded-md p-1 hover:bg-gray-100'
        >
          ✕
        </button>

        {/* content */}
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}
