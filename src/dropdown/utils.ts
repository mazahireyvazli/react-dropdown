import { RefObject, useEffect } from "react";

export const useOutsideClickHandler = (
  ref: RefObject<HTMLDivElement>,
  onClickOutside: () => void
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event?.target as Node)) {
        onClickOutside();
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);
};
