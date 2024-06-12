export type CardProps = {
  text: string;
  icon: (size: {
    width: number;
    height: number;
    color?: string;
  }) => React.ReactNode;
  onToggle: () => void;
  isChecked: boolean;
};
