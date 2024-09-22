const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
var cors = require('cors')
const db=require('./dynamodb')

dotenv.config();
const port = 3000;

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.json({ "hello": "world" });
});
app.get('/values', async (req, res) => {
    const { success, data } = await db.getLastValues()
    if (success) {
      return res.json({ success, data })
    }
    return res.status(500).json({ success: false, message: 'Error Occured !!!'})
  });
  app.post("/predict", async (req, res) => {
    try {
        const response = await fetch("http://127.0.0.1:5000/predict/test", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "humidity": 65.052264,
                "temperature": 37.733241,
                "ecg": 890,
                "respiratory": 29
            })
        });
        
        const data = await response.json();
        
        return res.json(data);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(port, function() {
  console.log('Example app listening on port ' + port);
});
