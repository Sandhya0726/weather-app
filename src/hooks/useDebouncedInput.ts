import { useEffect, useState } from 'react';

type DebouncedInputProps = {
  value: string;
  delay: number;
};

export function useDebouncedInput({ value, delay }: DebouncedInputProps) {
  const [debouncedInput, setDebouncedInput] = useState<string>();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedInput;
}
