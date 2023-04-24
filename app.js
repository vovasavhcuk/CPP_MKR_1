const puppeteer = require('puppeteer');
const express = require('express');
const path = require("path");
const hbs = require("hbs")
const app = express();
const tempelatePath=path.join(__dirname, './tempelate')

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", tempelatePath)
app.use(express.urlencoded({extended:false}))

app.get("/", (req, res)=> {
    res.render("index")
})

app.post("/parser", async (req, res) =>{
    try{
        const browser = await puppeteer.launch({headless:false})
        const page = await browser.newPage()
        await page.goto(`${req.body.url}`)
        let arr = await page.evaluate(() => {
            let text = document.getElementsByClassName('h-pc')
            let result = [];
            for (let i = 0; i < 10; i++) {
                result.push(text[i].textContent);
            }
            return result
        })
        res.render("index", {arr:arr})
        
        await browser.close()
    }catch{
        res.send("ХУЙНЯ")
    }
} )
app.listen(5500, () => console.log("Server is running..."));