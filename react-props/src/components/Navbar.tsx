export const Navbar = ({
  authenticated = false,
}: {
  authenticated?: boolean;
}) => {
  return <a href="/">{authenticated ? "Logout" : "Login"}</a>;
};
