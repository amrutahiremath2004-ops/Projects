const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

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
    const q = req.body.question.toLowerCase();
    let reply = "Sorry, I don't have information about that.";

    for (const keyword in hrData) {
        if (q.includes(keyword)) {
            reply = hrData[keyword];
        }
    }

    res.json({ reply });
});

// Start server
app.listen(3000, () => {
    console.log("HR Assistant running on port 3000");
});
