import { THEME } from "../Constants/Enum";
import { useAppSelector } from "../Redux/Store";

export const useTheme = () => {
  const { value: theme } = useAppSelector((state) => state.theme);
  if (theme === THEME.DARK) {
    return {
      backgroundColor: "red",
    };
  }
  return {
    backgroundColor: "green",
  };
};
