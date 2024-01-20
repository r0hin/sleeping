"use client"
import { HelpCircle, ShoppingBasket } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "../assets/logo.png"
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="py-4 px-8 max-w-4xl ml-auto mr-auto border-black border-b flex flex-row justify-between items-center">
      <div className="min-w-36">
        <Link href={"/"}>
          <Button variant={"link"} className={`${pathname == "/" ? "font-bold" : ""} pl-0`}>Home</Button>
        </Link>
        <Link href={"/about"}>
          <Button variant={"link"} className={`${pathname == "/about" ? "font-bold" : ""}`}>About</Button>
        </Link>
        <Link href={"mailto:support@scholarsnooze.com"}>
          <Button variant={"link"}>Contact</Button>
        </Link>
      </div>
      <div className="text-md font-bold font-mono flex flex-row items-center justify-center">
        <Image src={logo} alt="" width={32} height={32} className="inline-block mr-2 rounded-lg" />
        Scholar Snooze
      </div>
      <div className="min-w-36 text-right">
        <Link href={"/order"}>
          <Button disabled={pathname == "/order"} className="mr-2" variant="ghost" size="icon">
            <ShoppingBasket className="h-4 w-4" />
          </Button>
        </Link>
        <Link href={"mailto:support@scholarsnooze.com"}>
          <Button disabled={pathname == "/help"} className="mr-2" variant="ghost" size="icon">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}