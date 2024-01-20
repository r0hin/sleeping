import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.png";

export default function About() {
  return (
    <>
        <Image src={logo} alt="" width={96} height={96} className="inline-block mb-8 rounded-3xl shadow-2xl" />
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">About Scholar Snooze</h1>
        <p className="mb-2">Welcome to our bed rental company, an innovative solution founded by students in London, Ontario. Our mission is to provide affordable and quality bedding solutions for everyone, especially those who need temporary arrangements without the high costs of purchasing.</p>
        <p>Renting a bed from us is not only cost-effective but also ensures you get a brand new, never slept on, 5-star rated mattress. We believe in quality, and that&apos;s why each bed set, inclusive of the mattress and frame, is valued at around $2,000, ensuring you the best sleep experience.</p>

        <Link href={"/order"}>
          <Button className="mt-4">Order Now</Button>
        </Link>
        <Link href={"mailto:support@scholarsnooze.com"}>
          <Button variant={"secondary"} className="ml-4 mt-4">Contact Us</Button>
        </Link>
    </> 
  )
}
