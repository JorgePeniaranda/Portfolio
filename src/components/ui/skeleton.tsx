import {cn} from "@/helpers/common/classnames";

function Skeleton({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

export {Skeleton};
