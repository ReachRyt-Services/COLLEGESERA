import { Link } from "react-router-dom";

const HeaderLogo = () => {
  return (
    <Link to="/" className=" 4xl:flex items-center">
      <img
        src="/CollegeseraLogo.png"
        alt="CollegeSera Logo"
        className="h-28 w-auto object-contain"
      />
    </Link>
  );
};

export default HeaderLogo;
