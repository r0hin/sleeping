"use client"
import { HelpCircle, MoreVertical, ShoppingBasket } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="py-4 px-8 max-w-4xl ml-auto mr-auto border-black border-b flex flex-row justify-between items-center">
      <div className="min-w-48">
        <Link href={"/"}>
          <Button variant={"link"} className={`${pathname == "/" ? "font-bold" : ""} pl-0`}>Home</Button>
        </Link>
        <Link href={"/about"}>
          <Button variant={"link"} className={`${pathname == "/about" ? "font-bold" : ""}`}>About</Button>
        </Link>
      </div>
      <div className="text-md font-bold font-mono">
        Scholar Snooze
      </div>
      <div className="min-w-48 text-right">
        <Link href={"/order"}>
          <Button disabled={pathname == "/order"} className="mr-2" variant="ghost" size="icon">
            <ShoppingBasket className="h-4 w-4" />
          </Button>
        </Link>
        <Link href={"/help"}>
          <Button disabled={pathname == "/help"} className="mr-2" variant="ghost" size="icon">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>More Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Policies</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuItem>Contact</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}