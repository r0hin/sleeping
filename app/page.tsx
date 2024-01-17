import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import styles from "./Home.module.css";
import Link from "next/link";
import Image from "next/image";

import mattress from "../assets/mattress.jpg"

export default function Home() {
  return (
    <>
      <h1 className={`scroll-m-20 mb-12 text-6xl font-extrabold tracking-tight lg:text-5xl`}>Save <span className={styles.gradient}>time and</span> 💸 by renting your student housing bed.</h1>
      <div className="w-full flex mb-12 flex-row justify-between items-center">
        <div className={`w-full h-2 ${styles.gradientBlock} rounded`}></div>
        <ArrowRight className="ml-4 h-4 w-4"/>
      </div>

      <div className="w-full overflow-scroll whitespace-nowrap pb-8">
        <Link href="/order" className="inline-block">
          <Card className="w-[350px] mr-4 ">
            <CardHeader>
              <CardTitle className="flex items-center">1-Year Term </CardTitle>
              <CardDescription className="whitespace-normal">Rent an unused, high-quality mattress and frame for the entire school year. Starts at just <span className="font-mono">$26.99/mo</span></CardDescription>
            </CardHeader>
            <CardContent>
              <Image src={mattress} className="rounded-lg" alt="" width={350} height={350} />
            </CardContent>
          </Card>
        </Link>
        <Link href="/order" className="inline-block">
          <Card className="w-[350px] ml-4">
            <CardHeader>
              <CardTitle className="flex items-center">2-Year Term</CardTitle>
              <CardDescription className="whitespace-normal">Rent an unused, high-quality mattress and frame for two years at a lower price. Starts at just <span className="font-mono">$24.99/mo</span></CardDescription>
            </CardHeader>
            <CardContent>
              <Image src={mattress} className="rounded-lg" alt="" width={350} height={350} />
            </CardContent>
          </Card>
        </Link>
        <Link href="/order" className="inline-block">
          <Card className="w-[350px] ml-4">
            <CardHeader>
              <CardTitle className="flex items-center">3-Year Term </CardTitle>
              <CardDescription className="whitespace-normal">Rent an unused, high-quality mattress and frame for three years at the lowest price. Starts at just <span className="font-mono">$22.99/mo</span></CardDescription>
            </CardHeader>
            <CardContent>
              <Image src={mattress} className="rounded-lg" alt="" width={350} height={350} />
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  )
}
