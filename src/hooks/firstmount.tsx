import { useRef } from 'react';

// Keeps track of whether this is the first time render since the component was mounted.
// shamelessly taken from https://github.com/streamich/react-use
export default function useFirstMount() {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;

    return true;
  }

  return isFirst.current;
}
