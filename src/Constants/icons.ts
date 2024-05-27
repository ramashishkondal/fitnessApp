import { RFValue } from "react-native-responsive-fontsize";
import LeftArrow from "../Assets/Svgs/leftArrow.svg";
import Logo from "../Assets/Svgs/logoMain.svg";
import User from "../Assets/Svgs/user.svg";
import Lock from "../Assets/Svgs/lock.svg";
import GoogleLogo from "../Assets/Svgs/googleLogo.svg";
import FacebookLogo from "../Assets/Svgs/facebookLogo.svg";
import TwitterLogo from "../Assets/Svgs/twitterLogo.svg";

const iconStyle = ({
  width = 0,
  height = 0,
  color = "black",
  borderColor = "none",
}) => ({
  width: RFValue(width),
  height: RFValue(height),
  fill: color,
  stroke: borderColor,
});
type iconProps = {
  width: number;
  height: number;
  color?: string;
  borderColor?: string;
};

export const ICONS = {
  LeftArrow: (params: iconProps) => LeftArrow({ ...iconStyle({ ...params }) }),
  Logo: (params: iconProps) => Logo({ ...iconStyle({ ...params }) }),
  User: (params: iconProps) => User({ ...iconStyle({ ...params }) }),
  Lock: (params: iconProps) => Lock({ ...iconStyle({ ...params }) }),
  GoogleLogo: (params: iconProps) =>
    GoogleLogo({ ...iconStyle({ ...params }) }),
  FacebookLogo: (params: iconProps) =>
    FacebookLogo({ ...iconStyle({ ...params }) }),
  TwitterLogo: (params: iconProps) =>
    TwitterLogo({ ...iconStyle({ ...params }) }),
};
