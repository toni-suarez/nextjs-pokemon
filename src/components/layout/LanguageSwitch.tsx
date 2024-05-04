import { cn } from "@/utils/cn";
import Link from "next/link";

export default function LanguageSwitch({
  className
}: {
  className?: string
}) {

  return (
    <div className={cn("flex space-x-3", className)}>
      <Link href="/de">
        <svg xmlns="http://www.w3.org/2000/svg" className='shadow-md rounded w-8 h-auto' viewBox="0 0 5 3"><path d="M0 0h5v3H0z" /><path fill="#D00" d="M0 1h5v2H0z" /><path fill="#FFCE00" d="M0 2h5v1H0z" /></svg>
      </Link>
      <Link href="/en">
        <svg xmlns="http://www.w3.org/2000/svg" className='shadow-md rounded w-8 h-auto' viewBox="0 0 60 30"><clipPath id="a"><path d="M0 0v30h60V0z" /></clipPath><clipPath id="b"><path d="M30 15h30v15zv15H0zH0V0zV0h30z" /></clipPath><g clipPath="url(#a)"><path fill="#012169" d="M0 0v30h60V0z" /><path stroke="#fff" strokeWidth="6" d="m0 0 60 30m0-30L0 30" /><path stroke="#C8102E" strokeWidth="4" d="m0 0 60 30m0-30L0 30" clipPath="url(#b)" /><path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60" /><path stroke="#C8102E" strokeWidth="6" d="M30 0v30M0 15h60" /></g></svg>
      </Link>
    </div>
  );
}
