import { Link, NavLink } from "react-router-dom";
import ImageLinkCss from './imageLink.module.css'
export default function ImageLink({ to, src, alt, children }) {
  return (
<NavLink to={to} className={({ isActive }) => `${ImageLinkCss.link} ${isActive ? ImageLinkCss.active : ""}`}>
      <img src={src} alt={alt} />
      <p>{children}</p>
    </NavLink>
  )
}