import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { scroll } from "../../utils/scroll";

const Categories = () => {
  const { setCat, page } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLink = (cat) => {
    setCat(cat);
    navigate(`/p?pagecurequal${page}&catcurequal${cat}`);
    scroll();
  };

  return (
    <ul className="categories">
      <Link to="/" className="link" onClick={scroll} reloadDocument>
        <li>Home</li>
      </Link>
      <li onClick={() => handleLink("Data Breaches")}>Data Breaches</li>
      <li onClick={() => handleLink("Cyber Attacks")}>Cyber Attacks</li>
      <li onClick={() => handleLink("Vulnerablilities")}>Vulnerablities</li>
      <Link to="/webinar" className="link" onClick={scroll}>
        <li onClick={() => handleLink("Webinars")}>Webinars</li>
      </Link>
      <Link to="/contact" className="link" onClick={scroll}>
        <li>Contact</li>
      </Link>
    </ul>
  );
};

export default Categories;
