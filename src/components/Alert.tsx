'use client';

import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  message: string;
  onClose?: () => void;
}

export default function Alert({ type, message, onClose }: AlertProps) {
  const getAlertStyle = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-400',
          text: 'text-green-800',
          icon: <FaCheckCircle className="h-5 w-5 text-green-400" />,
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-400',
          text: 'text-red-800',
          icon: <FaTimesCircle className="h-5 w-5 text-red-400" />,
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-400',
          text: 'text-yellow-800',
          icon: <FaExclamationCircle className="h-5 w-5 text-yellow-400" />,
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-400',
          text: 'text-blue-800',
          icon: <FaInfoCircle className="h-5 w-5 text-blue-400" />,
        };
    }
  };

  const style = getAlertStyle();

  return (
    <div
      className={`${style.bg} border-l-4 ${style.border} p-4 mb-4 rounded-r`}
      role="alert"
    >
      <div className="flex items-center">
        {style.icon}
        <div className={`${style.text} ml-3 flex-1`}>{message}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto focus:outline-none"
            aria-label="Fermer"
          >
            <FaTimesCircle className={`h-5 w-5 ${style.text} opacity-75 hover:opacity-100`} />
          </button>
        )}
      </div>
    </div>
  );
}
