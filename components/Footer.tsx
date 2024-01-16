import Link from "next/link";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <div className="py-4 px-8 max-w-4xl ml-auto mr-auto border-black border-t flex flex-row justify-between items-center font-mono">
      <div className="flex flex-row justify-between items-center w-full">
        <div>
          <Link href="">
            <Button className="pl-0" variant={"link"}>© Scholar Snooze, 2024.</Button>
          </Link>
        </div>
        <div>
          <Link href="">
            <Button variant={"link"}>Contact / Support</Button>
            <Button className="pr-0" variant={"link"}>Terms</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}