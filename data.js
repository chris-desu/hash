import http from "http";
import cors from "cors";
import fs from "fs";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

app.post("/hash" , (req,res) => {
   console.log(req.body);
   fs.readFile("data.txt" , "utf8" , (err,data) => {
    let file = JSON.parse(data);
    file.push(req.body.hash);
    fs.writeFileSync("data.txt" , JSON.stringify(file));
     res.json("sent")
   })
})

app.get("/gethash" , (req,res) => {

    async function setData() {
        try{
           fs.readFile("data.txt" , "utf8" , (rst,ress) => {
            if(rst){
                throw new Error(rst)
            }
            res.json(JSON.parse(ress))
           })
        }catch(bad){
            console.log(bad)
        }
    }

    setData()
})
const PORT = process.env.PORT || 3000
server.listen(PORT , '0.0.0.0' => {
    console.log("server is running on port 3000")
})
