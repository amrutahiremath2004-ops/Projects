const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files (including index.html) from current folder
app.use(express.static(__dirname));

// Predefined HR answers
const hrData = {
  "leave policy": "Employees are eligible for 18 annual leaves, 12 sick leaves, and 10 casual leaves.",
  "benefits": "Company provides health insurance, travel allowance, PF, and yearly bonuses.",
  "salary": "Salary is processed on the 30th of every month.",
  "attendance": "Employees must maintain 80% attendance for full benefits.",
  "probation": "Probation period is 6 months with performance evaluation."
};

// API Endpoint
app.post("/ask", (req, res) => {
  const question = req.body.question.toLowerCase().trim();
  if (!question) return res.json({ reply: "Please ask a valid question." });

  let reply = "Sorry, I don't have information about that.";
  for (const keyword in hrData) {
    const words = keyword.split(" ");
    for (const word of words) {
      if (question.includes(word)) {
        reply = hrData[keyword];
        break;
      }
    }
    if (reply !== "Sorry, I don't have information about that.") break;
  }

  res.json({ reply });
});

// Dynamic port for Render or localhost
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`HR Assistant running on port ${PORT}`);
});
