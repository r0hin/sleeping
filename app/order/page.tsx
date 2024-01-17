"use client"

import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"

import mattress from "../../assets/mattress.jpg"
import mattress2 from "../../assets/mattress2.jpg"
import mattress3 from "../../assets/mattress3.jpg"
import frame1 from "../../assets/frame1.jpg"
import frame2 from "../../assets/frame2.jpg"
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function OrderPage() {
  const [totalMo, setTotalMo] = useState(0);
  const [totalToday, setTotalToday] = useState(0);
  const [totalForever, setTotalForever] = useState(0);
  const [loading, setLoading] = useState(false);

  const [size, setSize] = useState<"king" | "queen" | "full" | "twin">("queen");
  const [frame, setFrame] = useState<"basic" | "sleek" | "no">("sleek");
  const [term, setTerm] = useState<"yr1" | "yr2" | "yr3">("yr3");
  const [payment, setPayment] = useState<"upfront" | "monthly">("upfront");
  const [delivery, setDelivery] = useState("may");
  const [date, setDate] = useState<Date>();

  const beginCheckout = async () => {
    setLoading(true);
  }

  const calculateTotal = () => {
    const matrix = {
      mattress: {
        twin: {
          yr1: {
            monthly: 30,
            upfront: 27
          },
          yr2: {
            monthly: 27,
            upfront: 25
          },
          yr3: {
            monthly: 25,
            upfront: 23
          }
        },
        full: {
          yr1: {
            monthly: 40,
            upfront: 37
          },
          yr2: {
            monthly: 37,
            upfront: 35
          },
          yr3: {
            monthly: 35,
            upfront: 33
          }
        },
        queen: {
          yr1: {
            monthly: 47,
            upfront: 45
          },
          yr2: {
            monthly: 44,
            upfront: 42
          },
          yr3: {
            monthly: 40,
            upfront: 37
          }
        },
        king: {
          yr1: {
            monthly: 70,
            upfront: 65
          },
          yr2: {
            monthly: 65,
            upfront: 60
          },
          yr3: {
            monthly: 60,
            upfront: 55
          }
        }
      },
      sleek: {
        twin: {
          yr1: {
            monthly: 28,
            upfront: 25
          },
          yr2: {
            monthly: 25,
            upfront: 22
          },
          yr3: {
            monthly: 20,
            upfront: 16
          }
        },
        full: {
          yr1: {
            monthly: 30,
            upfront: 27
          },
          yr2: {
            monthly: 27,
            upfront: 23
          },
          yr3: {
            monthly: 25,
            upfront: 20
          }
        },
        queen: {
          yr1: {
            monthly: 36,
            upfront: 28
          },
          yr2: {
            monthly: 33,
            upfront: 25
          },
          yr3: {
            monthly: 30,
            upfront: 23
          }
        },
        king: {
          yr1: {
            monthly: 40,
            upfront: 34
          },
          yr2: {
            monthly: 37,
            upfront: 30
          },
          yr3: {
            monthly: 35,
            upfront: 27
          }
        }
      },
      basic: {
        twin: {
          yr1: {
            monthly: 23,
            upfront: 17
          },
          yr2: {
            monthly: 19,
            upfront: 15
          },
          yr3: {
            monthly: 15,
            upfront: 12
          }
        },
        full: {
          yr1: {
            monthly: 28,
            upfront: 21
          },
          yr2: {
            monthly: 24,
            upfront: 19
          },
          yr3: {
            monthly: 20,
            upfront: 15
          }
        },
        queen: {
          yr1: {
            monthly: 33,
            upfront: 25
          },
          yr2: {
            monthly: 29,
            upfront: 24
          },
          yr3: {
            monthly: 25,
            upfront: 20
          }
        },
        king: {
          yr1: {
            monthly: 34,
            upfront: 26
          },
          yr2: {
            monthly: 30,
            upfront: 25
          },
          yr3: {
            monthly: 26,
            upfront: 21
          }
        }
      }
    }

    const totalMattress = matrix["mattress"][size][term][payment];
    const totalFrame = frame === "no" ? 0 : matrix[frame][size][term][payment];
    const totalDelivery = delivery === "custom" ? 15 : 0;

    setTotalMo(totalMattress + totalFrame - 0.01);
    setTotalToday(totalMattress + totalFrame + totalDelivery - 0.01);
    if (payment == "upfront") {
      setTotalForever((parseInt(term.slice(2)) * 12 * (totalMattress + totalFrame)) + totalDelivery - 0.01);

    }
  }
  
  useEffect(() => {
    calculateTotal();
  }, [size, frame, term, payment, delivery, date])

  return (
    <>
      <div className="flex flex-row items-start justify-between">
        <div className="w-full pr-4">
          <Image src={mattress} className="w-full mb-2 border-2 rounded-lg" alt="" />
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
        <div className="w-full pl-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">The Scholar Snooze Package</h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">Our beds combine the supportive, moldable feel of gel memory foam with innersprings for optimal sleeping comfort.</p>

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
                      <SelectItem value="sleek">Sleek</SelectItem>
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
                <TableHead>Payment Frequency</TableHead>
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
                <TableCell>
                  <Select onValueChange={(val) => { setPayment(val as "upfront" | "monthly") }} value={payment}>
                    <SelectTrigger>
                      <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="upfront">Upfront (Best value)</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
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

          <h4 className="scroll-m-20 mb-2 mt-6 text-xl font-semibold tracking-tight">Review</h4>
          <Button onClick={beginCheckout} disabled={loading} className="w-full mt-2">Checkout (${totalMo}/mo)</Button>
          <p className="text-sm mt-2 text-muted-foreground">Due today: ${totalToday}{payment == "upfront" && (`, $${totalForever} across full term.`)}</p>
          <br />
          <p className="text-sm mt-2 text-muted-foreground">All values displayed in CA$.</p>
        </div>
      </div>
    </>
  )
}