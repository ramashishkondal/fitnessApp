import { RFValue } from "react-native-responsive-fontsize";
import LeftArrow from "../Assets/Svgs/leftArrow.svg";
import Logo from "../Assets/Svgs/logoMain.svg";
import User from "../Assets/Svgs/user.svg";
import Lock from "../Assets/Svgs/lock.svg";
import GoogleLogo from "../Assets/Svgs/googleLogo.svg";
import FacebookLogo from "../Assets/Svgs/facebookLogo.svg";
import TwitterLogo from "../Assets/Svgs/twitterLogo.svg";
import Fingerprint from "../Assets/Svgs/fingerprint.svg";
import Gallery from "../Assets/Svgs/gallery.svg";
import Camera from "../Assets/Svgs/camera.svg";
import Female from "../Assets/Svgs/female.svg";
import Male from "../Assets/Svgs/male.svg";
import DoubleArrow from "../Assets/Svgs/doubleArrow.svg";
import Drawer from "../Assets/Svgs/drawerIcon.svg";
import Home from "../Assets/Svgs/home.svg";
import Settings from "../Assets/Svgs/settings.svg";
import Community from "../Assets/Svgs/community.svg";
import Notification from "../Assets/Svgs/bell.svg";
import Premium from "../Assets/Svgs/crown.svg";
import LogOut from "../Assets/Svgs/logout.svg";
import Nutrition from "../Assets/Svgs/nutrition.svg";
import Water from "../Assets/Svgs/water.svg";
import ManWalking from "../Assets/Svgs/manWalking.svg";
import PLUS_CIRCLE from "../Assets/Svgs/plusCircle.svg";
import Close from "../Assets/Svgs/close.svg";
import GlassWater from "../Assets/Svgs/glassWater.svg";
import GlassWaterEmpty from "../Assets/Svgs/glassWaterEmpty.svg";
import Plus from "../Assets/Svgs/plus.svg";
import SmileyGood from "../Assets/Svgs/smileyGood.svg";
import SmileyBad from "../Assets/Svgs/smileyBad.svg";
import PostSign from "../Assets/Svgs/postSign.svg";
import HeartLike from "../Assets/Svgs/heartLike.svg";
import Comment from "../Assets/Svgs/comment.svg";
import ArrowUp from "../Assets/Svgs/arrowUp.svg";
import FoodBowl from "../Assets/Svgs/foodBowl.svg";

import {
  Avatar1,
  Avatar2,
  Avatar3,
  Avatar4,
  Avatar5,
  Avatar6,
  Avatar7,
  Avatar8,
} from "../Assets/Svgs/Avatars";
import {
  Fashion,
  Plant,
  Health,
  Meditation,
  Fitness,
  Running,
  Sleep,
  SmokeFree,
  Vegan,
} from "../Assets/Svgs/Interests";

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

const DRAWER = {
  Home: (params: iconProps) => Home({ ...iconStyle({ ...params }) }),
  Settings: (params: iconProps) => Settings({ ...iconStyle({ ...params }) }),
  Community: (params: iconProps) => Community({ ...iconStyle({ ...params }) }),
  Notification: (params: iconProps) =>
    Notification({ ...iconStyle({ ...params }) }),
  Premium: (params: iconProps) => Premium({ ...iconStyle({ ...params }) }),
  LogOut: (params: iconProps) => LogOut({ ...iconStyle({ ...params }) }),
};

const HOME_SCREEN = {
  Nutrition: (params: iconProps) => Nutrition({ ...iconStyle({ ...params }) }),
  Water: (params: iconProps) => Water({ ...iconStyle({ ...params }) }),
  ManWalking: (params: iconProps) =>
    ManWalking({ ...iconStyle({ ...params }) }),
};

const NUTRITION = {
  PLUS_CIRCLE: (params: iconProps) =>
    PLUS_CIRCLE({ ...iconStyle({ ...params }) }),
};

export const ICONS = {
  ...DRAWER,
  ...HOME_SCREEN,
  ...NUTRITION,
  LeftArrow: (params: iconProps) => LeftArrow({ ...iconStyle({ ...params }) }),
  FoodBowl: (params: iconProps) => FoodBowl({ ...iconStyle({ ...params }) }),
  ArrowUp: (params: iconProps) => ArrowUp({ ...iconStyle({ ...params }) }),
  HeartLike: (params: iconProps) => HeartLike({ ...iconStyle({ ...params }) }),
  Comment: (params: iconProps) => Comment({ ...iconStyle({ ...params }) }),
  PostSign: (params: iconProps) => PostSign({ ...iconStyle({ ...params }) }),
  SmileyGood: (params: iconProps) =>
    SmileyGood({ ...iconStyle({ ...params }) }),
  SmileyBad: (params: iconProps) => SmileyBad({ ...iconStyle({ ...params }) }),
  Plus: (params: iconProps) => Plus({ ...iconStyle({ ...params }) }),
  GlassWaterEmpty: (params: iconProps) =>
    GlassWaterEmpty({ ...iconStyle({ ...params }) }),
  GlassWater: (params: iconProps) =>
    GlassWater({ ...iconStyle({ ...params }) }),
  Close: (params: iconProps) => Close({ ...iconStyle({ ...params }) }),
  Logo: (params: iconProps) => Logo({ ...iconStyle({ ...params }) }),
  User: (params: iconProps) => User({ ...iconStyle({ ...params }) }),
  Lock: (params: iconProps) => Lock({ ...iconStyle({ ...params }) }),
  Camera: (params: iconProps) => Camera({ ...iconStyle({ ...params }) }),
  Gallery: (params: iconProps) => Gallery({ ...iconStyle({ ...params }) }),
  Female: (params: iconProps) => Female({ ...iconStyle({ ...params }) }),
  Male: (params: iconProps) => Male({ ...iconStyle({ ...params }) }),
  Drawer: (params: iconProps) => Drawer({ ...iconStyle({ ...params }) }),
  DoubleArrow: (params: iconProps) =>
    DoubleArrow({ ...iconStyle({ ...params }) }),
  Fingerprint: (params: iconProps) =>
    Fingerprint({ ...iconStyle({ ...params }) }),
  GoogleLogo: (params: iconProps) =>
    GoogleLogo({ ...iconStyle({ ...params }) }),
  FacebookLogo: (params: iconProps) =>
    FacebookLogo({ ...iconStyle({ ...params }) }),
  TwitterLogo: (params: iconProps) =>
    TwitterLogo({ ...iconStyle({ ...params }) }),
};

const AVATAR_SIZE = {
  width: 75,
  height: 75,
};
export const AVATARS = {
  Avatar1: () => Avatar1({ ...iconStyle(AVATAR_SIZE) }),
  Avatar2: () => Avatar2({ ...iconStyle(AVATAR_SIZE) }),
  Avatar3: () => Avatar3({ ...iconStyle(AVATAR_SIZE) }),
  Avatar4: () => Avatar4({ ...iconStyle(AVATAR_SIZE) }),
  Avatar5: () => Avatar5({ ...iconStyle(AVATAR_SIZE) }),
  Avatar6: () => Avatar6({ ...iconStyle(AVATAR_SIZE) }),
  Avatar7: () => Avatar7({ ...iconStyle(AVATAR_SIZE) }),
  Avatar8: () => Avatar8({ ...iconStyle(AVATAR_SIZE) }),
};

export const INTERESTS = {
  Organic: (params: iconProps) => Plant({ ...iconStyle({ ...params }) }),
  Fashion: (params: iconProps) => Fashion({ ...iconStyle({ ...params }) }),
  Health: (params: iconProps) => Health({ ...iconStyle({ ...params }) }),
  Meditation: (params: iconProps) =>
    Meditation({ ...iconStyle({ ...params }) }),
  Fitness: (params: iconProps) => Fitness({ ...iconStyle({ ...params }) }),
  Running: (params: iconProps) => Running({ ...iconStyle({ ...params }) }),
  Sleep: (params: iconProps) => Sleep({ ...iconStyle({ ...params }) }),
  SmokeFree: (params: iconProps) => SmokeFree({ ...iconStyle({ ...params }) }),
  Vegan: (params: iconProps) => Vegan({ ...iconStyle({ ...params }) }),
};
