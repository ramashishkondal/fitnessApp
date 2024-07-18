export type SettingsCardProps = {
  title: string;
  hasSwitch?: boolean;
  onPress?: () => void;
  switchActive?: boolean;
  onSwitchValueChange?: ((value: boolean) => void) | undefined;
};
