import React, { useRef, useEffect } from 'react';

interface TimePickerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime: string;
  timeOptions: string[];
  onTimeSelect: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  isOpen,
  onClose,
  selectedTime,
  timeOptions,
  onTimeSelect
}) => {
  const timePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        timePickerRef.current &&
        !timePickerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={timePickerRef}
      className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto w-full"
    >
      {timeOptions.map((time) => (
        <div
          key={time}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[14px] font-inter flex justify-between items-center"
          onClick={() => onTimeSelect(time)}
        >
          {time}
          {selectedTime === time && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M6.5 10.5L3.5 7.5L4.5 6.5L6.5 8.5L11.5 3.5L12.5 4.5L6.5 10.5Z"
                fill="#212121"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

export default TimePicker;