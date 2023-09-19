import Link from "next/link";

export const NavLinks = ({ showLinks }) => {
  const linkStyles = "text-black hover:text-red ";

  return (
    <ul
    className={`list-none flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 ${
      showLinks ? "block " : "hidden md:hidden list-none"
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

