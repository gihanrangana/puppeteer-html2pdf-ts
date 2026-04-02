# puppeteer-html2pdf-ts

Convert **HTML to PDF** using Puppeteer + TypeScript.

## Install

```bash
pnpm add puppeteer-html2pdf-ts
```

## Quick start

```ts
import fs from "node:fs";
import path from "node:path";
import htmlToPdf from "puppeteer-html2pdf-ts";

const template = fs.readFileSync(path.join(process.cwd(), "template.html"), "utf-8");

const pdf = new htmlToPdf();
await pdf.init();

const doc = pdf.loadTemplate(template);
doc.addPage(1, "<h1>Hello</h1>");

const buffer = await doc.create();

await pdf.close();
```

## Next

- [Getting started](/guide/getting-started)
