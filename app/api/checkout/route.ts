export const runtime = 'edge'; // 'nodejs' is the default
export const dynamic = 'force-dynamic'; // static by default, unless reading the request

import stripe from "stripe";

export async function POST(request: Request) {
  const client = new stripe(process.env.STRIPE_KEY || "");

  const customization = await request.json() as {
    size: "king" | "queen" | "full" | "twin",
    frame: "basic" | "sleek" | "no",
    term: "yr1" | "yr2" | "yr3",
    payment: "annual" | "monthly",
    delivery: "may" | "aug" | "custom",
    referrer: string,
    date: string
  };

  const totals = calculateTotal(customization.size, customization.frame, customization.term, customization.payment, customization.delivery);

  const session = await client.checkout.sessions.create( {
    mode: "subscription",
    allow_promotion_codes: true,
    line_items: [{
      price_data: {
        ...customization.payment == "monthly" ? { recurring: { interval: "month" } } : { recurring: { interval: "year" }  },
        currency: "cad",
        product_data: {
          name: customization.frame == "no" ? "Scholar Snooze Mattress" : "Scholar Snooze Mattress + Frame",
          description: `The product is delivered as a rental for ${customization.term.slice(2)} years. ${customization.payment == "monthly" ? `Monthly payments of $${totals.totalMo} will be made for the duration of the rental. The subscription will end automatically after ${customization.term.slice(2)} years.` : `Annual payments of $${totals.totalYear} will be made for the duration of the rental. The subscription will end automatically after ${customization.term.slice(2)} years.`}`,
        },
        // unit_amount: Math.round(totals.totalToday * 100)
        // unit_amount: 80
        unit_amount: customization.payment == "monthly" ? Math.round(totals.totalMo * 100) : Math.round(totals.totalYear * 100)
      },
      quantity: 1,
    }, {
      price_data: {
        currency: "cad",
        product_data: {
          name: customization.delivery == "custom" ? "Custom Delivery" : customization.delivery == "may" ? "May Delivery" : "August Delivery",
          description: "Delivery of your mattress and frame.",
        },
        unit_amount: Math.round(totals.totalDelivery * 100)
      },
      quantity: 1,
    }],
    ...customization.payment == "monthly" ? { payment_method_collection: "always" } : {},
    success_url: `https://scholarsnooze.com/order/success`,
    cancel_url: `https://scholarsnooze.com/order`,
    metadata: {
      size: customization.size,
      frame: customization.frame,
      term: customization.term,
      payment: customization.payment,
      delivery: customization.delivery,
      referrer: customization.referrer,
      date: customization.date,
      ...customization.payment == "monthly" ? { totalMo: totals.totalMo } : { totalYr: totals.totalYear },
      totalForever: totals.totalForever,
      password: "30nn"
    }
  })

  const url = session.url;
  return new Response(JSON.stringify({ url }));
}

const calculateTotal = (size: "king" | "queen" | "full" | "twin", frame: "basic" | "sleek" | "no", term: "yr1" | "yr2" | "yr3", payment: "annual" | "monthly", delivery: "may" | "aug" | "custom") => {
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

  let totalMo = 0;
  let totalYear = 0;
  let totalForever = 0;

  totalMo = totalMattress + totalFrame - 0.01;
  totalYear = (12 * (totalMattress + totalFrame)) + totalDelivery - 0.01;
  totalForever = (parseInt(term.slice(2)) * 12 * (totalMattress + totalFrame)) + totalDelivery - 0.01;

  return {
    totalMo,
    totalYear,
    totalForever,
    totalDelivery
  }
}