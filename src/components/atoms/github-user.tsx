import React from "react";

import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  username: string;
}

export default function GithubUser({username, ...props}: Props) {
  return (
    <a
      aria-label={username}
      className="flex size-max items-center gap-2"
      href={`https://github.com/${username}`}
      rel="noopener noreferrer"
      target="__blank"
      {...props}
    >
      <Avatar className="size-8 shrink-0">
        <AvatarImage src={`https://avatars.githubusercontent.com/${username}`} />
        <AvatarFallback>{username}</AvatarFallback>
      </Avatar>
      <span className="capitalize">{username}</span>
    </a>
  );
}
