export const runtime = 'nodejs'; // 'nodejs' is the default
export const dynamic = 'force-dynamic'; // static by default, unless reading the request

import stripe from "stripe";

export async function POST(request: Request) {
  const client = new stripe(process.env.STRIPE_KEY || "");

  const customization = await request.json() as {
    size: "king" | "queen" | "full" | "twin",
    frame: "basic" | "sleek" | "no",
    term: "yr1" | "yr2" | "yr3",
    payment: "upfront" | "monthly",
    delivery: "may" | "aug" | "custom",
  };

  const totals = calculateTotal(customization.size, customization.frame, customization.term, customization.payment, customization.delivery);

  const session = await client.checkout.sessions.create({
    mode: "payment",
    line_items: [{
      price_data: {
        currency: "cad",
        product_data: {
          name: customization.frame == "no" ? "Scholar Snooze Mattress" : "Scholar Snooze Mattress + Frame",
          description: `The product is delivered as a rental for ${customization.term.slice(2)} years. ${customization.payment == "monthly" ? `Monthly payments of $${totals.totalMo} will be made for the duration of the rental.` : "The entire rental cost will be paid upfront."}`,
        },
        unit_amount: 1,
      },
      quantity: 1,
    }],
    success_url: `https://scholarsnooze.com/order/success`,
    cancel_url: `https://scholarsnooze.com/order`,
    metadata: {
      size: customization.size,
      frame: customization.frame,
      term: customization.term,
      payment: customization.payment,
      delivery: customization.delivery,
      totalMo: totals.totalMo,
      totalToday: totals.totalToday,
      totalForever: totals.totalForever
    }
  })

  const url = session.url;
  return new Response(JSON.stringify({ url }));
}

const calculateTotal = (size: "king" | "queen" | "full" | "twin", frame: "basic" | "sleek" | "no", term: "yr1" | "yr2" | "yr3", payment: "upfront" | "monthly", delivery: "may" | "aug" | "custom") => {
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

  let totalMo = 0;
  let totalToday = 0;
  let totalForever = 0;

  totalMo = totalMattress + totalFrame - 0.01;
  totalToday = totalMattress + totalFrame + totalDelivery - 0.01;
  totalForever = (parseInt(term.slice(2)) * 12 * (totalMattress + totalFrame)) + totalDelivery - 0.01;

  return {
    totalMo,
    totalToday,
    totalForever
  }
}