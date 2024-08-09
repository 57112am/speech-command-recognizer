import { useEffect, useRef } from 'react';

/**
 * A custom React hook that triggers a callback when a click occurs outside the specified element.
 * 
 * @param {Function} callback - The function to call when a click outside the element is detected.
 * @param {Object} ref - A React ref object attached to the element to watch for clicks outside.
 * @returns {Object} The same ref object passed in, to be attached to the element you want to monitor.
 */
const useClickOutside = (callback, ref) => {
  
  useEffect(() => {
    /**
     * Handles the click event and triggers the callback if the click is outside the element.
     * 
     * @param {Event} event - The click event.
     */
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, ref]);

  return ref;
};

export default useClickOutside;