import React from "react";

import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";

/**
 * Props for the GithubUser component.
 * @typedef {Object} Props
 * @property {string} username - The GitHub username to display and link to.
 * @property {React.AnchorHTMLAttributes<HTMLAnchorElement>} [props] - Additional props for the anchor element.
 */
interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  username: string;
}

/**
 * GithubUser component renders a link to a GitHub profile along with the user's avatar.
 * @param {Props} props - The props for the component including the username and optional anchor attributes.
 * @returns {JSX.Element} The rendered component.
 */
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
