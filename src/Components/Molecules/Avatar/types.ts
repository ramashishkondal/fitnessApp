export type AvatarProps = {
  item: { icon: React.ReactNode; name: string };
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
};
