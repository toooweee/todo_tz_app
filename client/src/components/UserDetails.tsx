import React from "react";
import { IUser } from "../types/types";

interface UserDetailsProps {
  user: IUser;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <div>
      <div>Email: {user.email}</div>
    </div>
  );
};

export default UserDetails;
