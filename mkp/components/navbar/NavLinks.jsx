import Link from "next/link";

  const NavLinks = ({ showLinks }) => {
  const linkStyles = "text-black hover:text-red ";

  return (
    <ul
      className={`absolute w-[640px] left-[50%] transform -translate-x-1/2 top-4 flex list-none justify-between items-center gap-10 ${
        showLinks ? "block" : "hidden md:hidden"
      }`}
    >
      <li className={linkStyles}>
        <Link href="/">Recipes</Link>
      </li>
      <li className={linkStyles}>
        <Link href="/">Popular</Link>
      </li>
      <li className={linkStyles}>
        <Link href="/">Cuisine</Link>
      </li>
      <li className={linkStyles}>
        <Link href="/">Kitchen Tips</Link>
      </li>
      <li className={linkStyles}>
        <Link href="/">About Us</Link>
      </li>
    </ul>
  );
};
export default NavLinks;


