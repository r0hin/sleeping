import { Check } from "lucide-react";

export default function SuccessPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center my-24">
        <div className="flex flex-row items-center justify-center">
          <Check size={48} className="mr-8" />
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Order Successful</h1>
        </div>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Your order was successfully placed. You will recieve a confirmation email shortly, where you can share delivery details.
        </p>
      </div>
    </>
  )
}