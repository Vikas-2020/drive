import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from '../slices/authSlice';

const MessageAlert = () => {
  const { message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (message) {
      setProgress(100);

      // Decrease progress over time
      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev - 4;
          return next >= 0 ? next : 0;
        });
      }, 100);

      // Clear the message after a duration
      const timeout = setTimeout(() => {
        dispatch(setMessage(null));
      }, 2500); // Match with progress animation (100/4 * 100ms)

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [message, dispatch]);

  if (!message) return null;

  return (
    <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-3 rounded-md shadow-lg z-50 w-72">
      <p>{message}</p>
      <div className="h-1 bg-green-700 mt-2 rounded">
        <div
          className="h-full bg-white transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default MessageAlert;
