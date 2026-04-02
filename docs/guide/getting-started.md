# Getting started

## 1) Create a PDF generator

```ts
import htmlToPdf from "puppeteer-html2pdf-ts";

const pdf = new htmlToPdf();
await pdf.init();
```

## 2) Load a template and add pages

Your HTML template must include a container with `id="content"`.

```ts
const template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Demo</title>
  </head>
  <body>
    <div id="content"></div>
  </body>
</html>`;

const doc = pdf.loadTemplate(template);
doc.addPage(1, "<h1>Invoice #001</h1>");
doc.addPage(2, "<p>Page 2 content</p>");
```

## 3) Create the PDF (Buffer)

```ts
const buffer = await doc.create({
  format: "A4",
  printBackground: true,
});
```

## 4) Close the browser

```ts
await pdf.close();
```

## Example: Express route

```ts
app.get("/pdf", async (_req, res) => {
  const doc = pdf.loadTemplate(template);
  doc.addPage(1, "<h1>Hello</h1>");

  const buffer = await doc.create();
  res.setHeader("Content-Type", "application/pdf");
  res.send(buffer);
});
```
