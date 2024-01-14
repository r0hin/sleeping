import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import styles from "./Home.module.css";
import Link from "next/link";

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
              <CardDescription className="whitespace-normal">Rent an unused, high-quality bed for the entire school year.</CardDescription>
            </CardHeader>
            <CardContent>
              (product image)
            </CardContent>
            <CardFooter className="flex justify-center">
              <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">$44.99/mo</h2>
            </CardFooter>
          </Card>
        </Link>
        <Link href="/order" className="inline-block">
          <Card className="w-[350px] ml-4">
            <CardHeader>
              <CardTitle className="flex items-center">2-Year Term</CardTitle>
              <CardDescription className="whitespace-normal">Rent an unused, high-quality bed for two years at a lower price.</CardDescription>
            </CardHeader>
            <CardContent>
              (product image)
            </CardContent>
            <CardFooter className="flex justify-center">
              <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">$42.99/mo</h2>
            </CardFooter>
          </Card>
        </Link>
        <Link href="/order" className="inline-block">
          <Card className="w-[350px] ml-4">
            <CardHeader>
              <CardTitle className="flex items-center">3-Year Term </CardTitle>
              <CardDescription className="whitespace-normal">Rent an unused, high-quality bed for three years at the lowest price.</CardDescription>
            </CardHeader>
            <CardContent>
              (product image)
            </CardContent>
            <CardFooter className="flex justify-center">
              <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">$39.99/mo</h2>
            </CardFooter>
          </Card>
        </Link>
      </div>
    </>
  )
}
