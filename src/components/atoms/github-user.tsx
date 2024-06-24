import type {IGithubUserInfo} from "../../types/github";

import React from "react";
import Axios from "axios";
import {CircleAlert} from "lucide-react";

import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";
import {Skeleton} from "../ui/skeleton";
import {GITHUB_GET_USERS_URL} from "../../constants/external";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  username: string;
}

export default function GithubUser({username, ...props}: Props) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState<IGithubUserInfo>();

  React.useEffect(() => {
    Axios.get<IGithubUserInfo>(`${GITHUB_GET_USERS_URL}/${username}`)
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  if (error) {
    return (
      <span className="flex size-max cursor-not-allowed items-center gap-2 text-red-500">
        <CircleAlert className="size-8 rounded-full" />
        <span className="text-lg font-medium">Error al cargar usuario</span>
      </span>
    );
  }

  if (loading || data === undefined) {
    return (
      <span className="flex size-max cursor-wait items-center gap-2">
        <Skeleton className="size-8 rounded-full bg-muted-foreground" />
        <Skeleton className="h-3 w-32 bg-muted-foreground" />
      </span>
    );
  }

  return (
    <a
      aria-label={username}
      className="flex size-max items-center gap-2"
      href={data.html_url}
      rel="noopener noreferrer"
      target="__blank"
      {...props}
    >
      <Avatar className="size-8 shrink-0">
        <AvatarImage src={data.avatar_url} />
        <AvatarFallback>{data.name}</AvatarFallback>
      </Avatar>
      <span className="capitalize">{username}</span>
    </a>
  );
}
