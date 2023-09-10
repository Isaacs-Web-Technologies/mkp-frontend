import Link from "next/link";

export const NavLinks = ({ showLinks }) => {
  const linkStyles = "text-black hover:text-red ";

  return (
    <ul
    className={` top-0 lg:flex list-none justify-between lg:items-center gap-10 ${
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
      <li>
      <Link href="./signIn"><button className="ml-5 flex outline_btn">Login</button></Link>
      </li>
      <li>
      <Link href="./signUp"><button className="ml-2 flex   black_btn">Sign up</button></Link>
      </li>
    </ul>
  );
};

