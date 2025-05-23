import express from 'express';
const app = express();
const PORT = 5500;
import {prisma} from "@repo/db";

// Middleware to parse JSON



app.use(express.json());

app.post("/bankCall",async (req, res) => {
  const paymentInformation = {
    userId: req.body.userId,
    token: req.body.token,
    amount: req.body.amount,
  };

  try {
    await prisma.$transaction([
      prisma.balance.update({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          amount: {
            increment: paymentInformation.amount,
          },
        },
      }),
      prisma.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "SUCCESS",
        },
      }),
    ]);

    res.status(200).json({ message: "Captured" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Transaction failed", error });
  }
});


// Basic route
app.get('/api', (req, res) => {
    console.log("Hello skjldsdsdsdsdsiu38532467");

  res.send('Hello, world!!!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


