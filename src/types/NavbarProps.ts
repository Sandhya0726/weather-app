export type NavbarProps = {
  cityName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  loading: boolean;
};
