import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import styles from "./Home.module.css";
import Link from "next/link";
import Image from "next/image";

import mattress1 from "../assets/mattress1.jpg"
import mattress2 from "../assets/mattress2.jpg"
import truck from "../assets/truck.jpg"
import handshake from "../assets/handshake.jpg"
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <h1 className={`scroll-m-20 mb-12 text-6xl font-extrabold tracking-tight lg:text-5xl`}>Save <span className={styles.gradient}>time and</span> 💸 by renting your student housing bed.</h1>

      <div className="flex sm:flex-row flex-col justify-between items-start w-full shadow-md p-4 rounded-md">
        <div className="sm:w-1/2 w-full h-56">
          <Image src={handshake} className="rounded-md shadow-xl h-full w-full object-cover" alt="" />
        </div>
        <div className="sm:ml-6 sm:w-1/2 w-full sm:mt-0 mt-8">
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Affordable, Luxury Beds</h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">Experience luxurious comfort without the high costs. Our rental service provides premium quality beds at a fraction of the retail price.</p>
          <Link href={"/about"}>
            <Button className="mt-4">Learn More</Button>
          </Link>
        </div>
      </div>

      <div className="mt-6 flex sm:flex-row flex-col-reverse justify-between items-start w-full shadow-md p-4 rounded-md">
        <div className="sm:mr-6 sm:w-1/2 w-full sm:mt-0 mt-8">
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Hassle-free Experience</h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">From selection to setup, enjoy a seamless bed rental experience. We handle everything to ensure your comfort and satisfaction.</p>
          <Link href={"/order"}>
            <Button className="mt-4">Order Now</Button>
          </Link>
        </div>
        <div className="sm:w-1/2 w-full h-56">
          <Image src={truck} className="rounded-md shadow-xl h-full w-full object-cover" alt="" />
        </div>
      </div>

      <h2 className="mt-10 mb-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Our Selection
      </h2>

      <div className="w-full flex mb-6 flex-row justify-between items-center">
        <div className={`w-full h-2 ${styles.gradientBlock} rounded`}></div>
        <ArrowRight className="ml-4 h-4 w-4"/>
      </div>

      <div className="w-full overflow-scroll whitespace-nowrap pb-8">
        <Link href="/order" className="inline-block">
          <Card className="w-[350px] mr-4 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">1-Year Term</CardTitle>
              <CardDescription className="whitespace-normal">Rent an unused, high-quality mattress and frame for the entire school year. Starts at just <span className="font-mono">$26.99/mo</span></CardDescription>
            </CardHeader>
            <CardContent>
              <Image src={mattress1} className="rounded-lg" alt="" width={350} height={350} />
            </CardContent>
          </Card>
        </Link>
        <Link href="/order" className="inline-block">
          <Card className="w-[350px] ml-4 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">2-Year Term</CardTitle>
              <CardDescription className="whitespace-normal">Rent an unused, high-quality mattress and frame for two years at a lower price. Starts at just <span className="font-mono">$24.99/mo</span></CardDescription>
            </CardHeader>
            <CardContent>
              <Image src={mattress2} className="rounded-lg" alt="" width={350} height={350} />
            </CardContent>
          </Card>
        </Link>
        <Link href="/order" className="inline-block">
          <Card className="w-[350px] ml-4 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">3-Year Term </CardTitle>
              <CardDescription className="whitespace-normal">Rent an unused, high-quality mattress and frame for three years at the lowest price. Starts at just <span className="font-mono">$22.99/mo</span></CardDescription>
            </CardHeader>
            <CardContent>
              <Image src={mattress1} className="rounded-lg" alt="" width={350} height={350} />
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  )
}
