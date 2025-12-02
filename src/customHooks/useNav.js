const { useRouter } = require("next/navigation");

const useNav = () => {
  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
  };
  return navigate;
};
export default useNav;
