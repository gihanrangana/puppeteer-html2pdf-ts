import express, { type Request, type Response } from "express";

import htmlToPDF from "puppeteer-html2pdf-ts";

const app = express();

const pdf = new htmlToPDF("<h1>Hello World</h1>");

pdf.init();

app.get("/", async (req: Request, res: Response) => {});

app.listen(3000, () => {
	console.log(`server started on port 3000`);
});
