import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import mattress from "../../assets/mattress.jpg"
import mattress2 from "../../assets/mattress2.jpg"
import mattress3 from "../../assets/mattress3.jpg"
import { Clock } from "lucide-react";

export default function OrderPage() {
  return (
    <>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">The Scholar Snooze Package</h2>
      <br></br>
      <div className="flex flex-row items-start justify-between">
        <div className="w-full pr-4">
          <Image src={mattress} className="w-full mb-4 border-2 rounded-lg" alt="" />
          <div className="flex flex-row items-center justify-between w-full">
            <Image src={mattress2} className="w-[calc(50%-0.5rem)] border-2 rounded-lg" alt="" />
            <Image src={mattress3} className="w-[calc(50%-0.5rem)] border-2 rounded-lg" alt="" />
          </div>
        </div>
        <div className="w-full pl-4">
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
                  <Select defaultValue="twin">
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
                  <Select defaultValue="yes">
                    <SelectTrigger>
                      <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
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
                  <Select defaultValue="3yr">
                    <SelectTrigger>
                      <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1yr">1-Year Term</SelectItem>
                      <SelectItem value="2yr">2-Year Term</SelectItem>
                      <SelectItem value="3yr">3-Year Term</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select defaultValue="monthly">
                    <SelectTrigger>
                      <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="upfront">Upfront</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          <h4 className="scroll-m-20 mb-2 mt-4 text-xl font-semibold tracking-tight">Delivery Date</h4>
          <Select defaultValue="may">
            <SelectTrigger>
              <SelectValue/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="may">Week of May 1</SelectItem>
              <SelectItem value="aug">Week of Aug 31</SelectItem>
              <SelectItem value="custom">Custom (+$9.99)</SelectItem>
            </SelectContent>
          </Select>

          <Button className="w-full mt-11">Checkout ($29.99/mo)</Button>
        </div>
      </div>
    </>
  )
}