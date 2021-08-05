/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function Navbar() {
    
    const {user, username}=useContext(UserContext)
 return <nav className="navbar">
    <ul>
      <li>
        <Link href="/">
          <button className="btn-logo">Shaalan</button>
        </Link>
      </li>
      {username && (
        <>
          <li className="push-left"> 
            <Link href={`/${username}`}>
              <button className="btn-blue">Write Posts</button>
            </Link>
          </li>
          <li>
            <Link href={`/${username}`}>
              {/* <img src={user?.photoUrl} alt="photo" /> */}
            </Link>
          </li>
        </>
      )}
      {!username && (
        <li>
            <Link href="/enter">
                <button className="btn-blue">Login</button>
            </Link>
        </li>
      )

      }
    </ul>
  </nav>;
}
