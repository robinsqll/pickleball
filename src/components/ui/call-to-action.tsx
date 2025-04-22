import { Button, ButtonProps } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface CallToActionProps extends ButtonProps {
  href: string;
  external?: boolean;
  children: React.ReactNode;
  showArrow?: boolean;
  className?: string;
}

export function CallToAction({
  href,
  external = false,
  children,
  showArrow = true,
  className,
  ...props
}: CallToActionProps) {
  const ButtonContent = (
    <>
      {children}
      {showArrow && <ArrowRight className="ml-2 h-4 w-4" />}
    </>
  );

  if (external) {
    return (
      <Button
        className={cn("group", className)}
        asChild
        {...props}
      >
        <a href={href} target="_blank" rel="noopener noreferrer">
          {ButtonContent}
        </a>
      </Button>
    );
  }

  return (
    <Button
      className={cn("group", className)}
      asChild
      {...props}
    >
      <Link to={href}>{ButtonContent}</Link>
    </Button>
  );
}