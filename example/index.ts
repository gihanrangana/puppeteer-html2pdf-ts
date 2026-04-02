import express, { type Request, type Response } from "express";
import fs from "node:fs/promises";
import path from "node:path";
import htmlToPDF from "puppeteer-html2pdf-ts";

const app = express();

app.get("/", async (req: Request, res: Response) => {
    const templates = {
        main: await fs.readFile(
            path.join(process.cwd(), "templates/main.html"),
            "utf8",
        ),
        header: await fs.readFile(
            path.join(process.cwd(), "templates/header.html"),
            "utf8",
        ),
        footer: await fs.readFile(
            path.join(process.cwd(), "templates/footer.html"),
            "utf-8",
        ),
    };

    const doc = new htmlToPDF(templates.main);

    const content = `
        <div class="container">

			<h1>Sample HTML to PDF</h2>

			<div class="content">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim urna sit amet rhoncus rhoncus. Curabitur quis enim eleifend, lacinia enim sed, tincidunt elit. Etiam risus lacus, cursus eu ullamcorper sed, tincidunt ut massa. In imperdiet congue risus non consequat. Curabitur sollicitudin ex eget enim ornare malesuada. Praesent ultrices, mauris eu commodo mattis, ligula augue bibendum leo, eu consequat elit augue sed ex. Donec nunc odio, hendrerit viverra porta non, eleifend nec nisi. Cras ac sollicitudin libero. Nunc sed velit vel purus pulvinar vehicula. Sed ac dapibus lorem.</p>
			</div>

		</div>
    `;

    await doc.addPage(1, content);

    await doc.addFonts([
        {
            family: "Audiowide",
            weights: [300, 400, 500, 600, 700],
        },
        {
            family: "Imperial Script",
            weights: [300, 400, 500, 600, 700],
        },
    ]);

    const pdf = await doc.create({
        displayHeaderFooter: true,
        headerTemplate: templates.header,
        footerTemplate: templates.footer,
    });

    res.setHeader("Content-Type", "application/pdf");

    res.send(pdf);
});

app.listen(3000, () => {
    console.log(`server started on port 3000`);
});
