export type CustomHomeDetailsCardProps = {
  title: string;
  handleOnPress: () => void;
  status: string;
  icon: (size: {
    width: number;
    height: number;
    color?: string;
  }) => React.ReactNode;
  markerPercentage: number;
};
