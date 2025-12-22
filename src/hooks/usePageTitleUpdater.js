import { useGlobalsContext } from "@/contexts/GlobalsContext";
import { useEffect } from "react";

const usePageTitleUpdater = (title) => {
  const { changeTitle } = useGlobalsContext();
  useEffect(() => {
    changeTitle(title);
  }, [title]);
};
export default usePageTitleUpdater;
