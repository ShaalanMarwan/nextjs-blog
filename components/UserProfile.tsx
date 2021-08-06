/* eslint-disable @next/next/no-img-element */
import { User } from "../models/user";
export default function UserProfilePage({ user }: { user: User }) {
  return (
    <div className="box-center">
      <img src={user.photoURL} className="card-img-center" alt="Profile" />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName}</h1>
    </div>
  );
}
