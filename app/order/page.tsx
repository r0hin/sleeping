"use client"

import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"

import mattress1 from "../../assets/mattress1.jpg"
import mattress2 from "../../assets/mattress2.jpg"
import mattress3 from "../../assets/mattress3.jpg"
import frame1 from "../../assets/frame1.jpg"
import frame2 from "../../assets/frame2.jpg"
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function OrderPage() {
  const [totalMo, setTotalMo] = useState(0);
  const [totalYr, setTotalYr] = useState(0);
  const [totalDelivery, setTotalDelivery] = useState(0);
  const [loading, setLoading] = useState(false);

  const [size, setSize] = useState<"king" | "queen" | "full" | "twin">("queen");
  const [frame, setFrame] = useState<"basic" | "sleek" | "no">("sleek");
  const [term, setTerm] = useState<"yr1" | "yr2" | "yr3">("yr3");
  const [payment, setPayment] = useState<"annual" | "monthly">("annual");
  const [delivery, setDelivery] = useState<"may" | "aug" | "custom">("may");
  const [referrer, setReferrer] = useState("");
  const [date, setDate] = useState<Date>();

  const beginCheckout = async () => {
    setLoading(true);
    setPayment("annual");

    const request = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        size,
        frame,
        term,
        payment,
        delivery,
        referrer,
        date: date ? date.toISOString() : ""
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const { url } = await request.json();
    window.location.replace(url);
  }

  const calculateTotal = () => {
    const matrix = {
      mattress: {
        twin: {
          yr1: {
            monthly: 29,
            annual: 26
          },
          yr2: {
            monthly: 26,
            annual: 25
          },
          yr3: {
            monthly: 25,
            annual: 23
          }
        },
        full: {
          yr1: {
            monthly: 38,
            annual: 31
          },
          yr2: {
            monthly: 34,
            annual: 30
          },
          yr3: {
            monthly: 33,
            annual: 29
          }
        },
        queen: {
          yr1: {
            monthly: 40,
            annual: 33
          },
          yr2: {
            monthly: 38,
            annual: 32
          },
          yr3: {
            monthly: 37,
            annual: 31
          }
        },
        king: {
          yr1: {
            monthly: 55,
            annual: 45
          },
          yr2: {
            monthly: 52,
            annual: 44
          },
          yr3: {
            monthly: 51,
            annual: 43
          }
        }
      },
      sleek: {
        twin: {
          yr1: {
            monthly: 24,
            annual: 20
          },
          yr2: {
            monthly: 21,
            annual: 17
          },
          yr3: {
            monthly: 20,
            annual: 16
          }
        },
        full: {
          yr1: {
            monthly: 28,
            annual: 27
          },
          yr2: {
            monthly: 26,
            annual: 20
          },
          yr3: {
            monthly: 25,
            annual: 19
          }
        },
        queen: {
          yr1: {
            monthly: 30,
            annual: 28
          },
          yr2: {
            monthly: 28,
            annual: 23
          },
          yr3: {
            monthly: 27,
            annual: 22
          }
        },
        king: {
          yr1: {
            monthly: 37,
            annual: 34
          },
          yr2: {
            monthly: 35,
            annual: 26
          },
          yr3: {
            monthly: 34,
            annual: 25
          }
        }
      },
      basic: {
        twin: {
          yr1: {
            monthly: 18,
            annual: 16
          },
          yr2: {
            monthly: 16,
            annual: 14
          },
          yr3: {
            monthly: 14,
            annual: 12
          }
        },
        full: {
          yr1: {
            monthly: 24,
            annual: 22
          },
          yr2: {
            monthly: 22,
            annual: 17
          },
          yr3: {
            monthly: 20,
            annual: 15
          }
        },
        queen: {
          yr1: {
            monthly: 29,
            annual: 23
          },
          yr2: {
            monthly: 27,
            annual: 21
          },
          yr3: {
            monthly: 25,
            annual: 19
          }
        },
        king: {
          yr1: {
            monthly: 30,
            annual: 25
          },
          yr2: {
            monthly: 28,
            annual: 23
          },
          yr3: {
            monthly: 26,
            annual: 21
          }
        }
      }
    }

    const totalMattress = matrix["mattress"][size][term][payment];
    const totalFrame = frame === "no" ? 0 : matrix[frame][size][term][payment];
    const totalDelivery = delivery === "custom" ? 15 : 0;

    setTotalMo(totalMattress + totalFrame);
    setTotalYr(12 * (totalMattress + totalFrame))
    setTotalDelivery(totalDelivery);
  }
  
  useEffect(() => {
    calculateTotal();
  }, [size, frame, term, payment, delivery, date])

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row items-start justify-between">
        <div className="w-full pt-8 md:pt-0 md:pr-4">
          <Image src={mattress1} className="w-full mb-2 border-2 rounded-lg" alt="" />
          <p className="text-sm mb-2 text-muted-foreground">Mattress</p>
          <div className="flex flex-row items-center justify-between w-full">
            <Image src={mattress2} className="w-[calc(50%-0.25rem)] border-2 rounded-lg" alt="" />
            <Image src={mattress3} className="w-[calc(50%-0.25rem)] border-2 rounded-lg" alt="" />
          </div>
          <div className="flex flex-row mt-2 items-center justify-between w-full">
            <Image src={frame1} className="w-[calc(50%-0.25rem)] border-2 rounded-lg" alt="" />
            <Image src={frame2} className="w-[calc(50%-0.25rem)] border-2 rounded-lg" alt="" />
          </div>
          <p className="text-sm mt-2 text-muted-foreground">Frame</p>
        </div>
        <div className="w-full md:pl-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Scholar Snooze Package</h2>
          <p className="leading-7 mt-2">Our beds combine the supportive, moldable feel of gel memory foam with innersprings for optimal sleeping comfort.</p>

          <h4 className="scroll-m-20 mb-0 mt-4 text-xl font-semibold tracking-tight">Customize Your Bed</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Size</TableHead>
                <TableHead>Include Frame</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Select onValueChange={(val) => { setSize(val as "twin" | "full" | "queen" | "king") }} value={size}>
                    <SelectTrigger>
                      <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twin">Twin</SelectItem>
                      <SelectItem value="full">Full</SelectItem>
                      <SelectItem value="queen">Queen</SelectItem>
                      <SelectItem value="king">King</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select onValueChange={(val) => { setFrame(val as "basic" | "sleek" | "no") }} value={frame}>
                    <SelectTrigger>
                      <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No Frame</SelectItem>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="sleek">Sleek (+ headboard)</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <h4 className="scroll-m-20 mb-0 mt-4 text-xl font-semibold tracking-tight">Purchase Plan</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Term</TableHead>
                {/* <TableHead>Payment Frequency</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Select onValueChange={(val) => { setTerm(val as "yr1" | "yr2" | "yr3") }} value={term}>
                    <SelectTrigger>
                      <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yr1">1-Year Term</SelectItem>
                      <SelectItem value="yr2">2-Year Term</SelectItem>
                      <SelectItem value="yr3">3-Year Term (Best value)</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                {/* <TableCell>
                  <Select onValueChange={(val) => { setPayment(val as "annual" | "monthly") }} value={payment}>
                    <SelectTrigger>
                      <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="annual">Annually (Best value)</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell> */}
              </TableRow>
            </TableBody>
          </Table>
          
          <h4 className="scroll-m-20 mb-2 mt-4 text-xl font-semibold tracking-tight">Delivery Date</h4>
          <Select onValueChange={(val) => { setDelivery(val as "may" | "aug" | "custom") }} value={delivery}>
            <SelectTrigger>
              <SelectValue/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="may">First week of May</SelectItem>
              <SelectItem value="aug">Last week of August</SelectItem>
              <SelectItem value="custom">Pick my own date (+$14.99)</SelectItem>
            </SelectContent>
          </Select>
          {
            delivery === "custom" && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className={cn("w-full mt-2 justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />{date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            )
          }

          <h4 className="scroll-m-20 mb-2 mt-6 text-md font-medium tracking-tight">How did you hear about us?</h4>
          <Input onChange={(e) => setReferrer(e.currentTarget.value)} value={referrer} type="email" placeholder="My friend Joe" />

          <h4 className="scroll-m-20 mb-2 mt-6 text-xl font-semibold tracking-tight">Review</h4>
          <Button onClick={beginCheckout} disabled={loading} className="w-full mt-2">Checkout (${totalMo - 0.01}/mo)</Button>
          <p className="text-sm mt-2 text-muted-foreground">Due today: <span className="line-through font-light">CA${(payment == "annual" ? ((Math.round(1.3 * (totalDelivery + totalYr)) - 0.01)) : (Math.round(1.3 * (totalDelivery + totalMo)) - 0.01))}</span> CA${(payment == "annual" ? (totalDelivery + totalYr - 0.01) : (totalDelivery + totalMo - 0.01))}.</p>
          {/* <p className="text-sm mt-2 text-muted-foreground">Due today: CA${(payment == "annual" ? (totalDelivery + totalYr - 0.01) : (totalDelivery + totalMo - 0.01))}, CA${totalForever - 0.01} across full term.</p> */}
        </div>
      </div>
    </>
  )
}