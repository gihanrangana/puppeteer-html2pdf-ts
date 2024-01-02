## HTML to PDF Generator
**puppeteer-html2pdf-ts** is a simple and fast library to convert HTML to PDF, using Puppeteer and TypeScript.

**puppeteer-html2pdf-ts** is easy to use and install. You can install it with 

`npm install puppeteer-html2pdf-ts`

 or 
 
 `yarn add puppeteer-html2pdf-ts`
 
 or

 `pnpm add puppeteer-html2pdf-ts`


 ### Usage
 <hr/>

Example:
 ```ts
const template = fs.readFileSync(path.join(__dirname, "assets/template.html"), "utf-8")

const doc = new htmlToPDF(template)
const pdfBuffer = await doc.create(/*PDF generation options*/)
// Do anything with this Buffer
 ```

Using Google fonts:
```ts
await doc.addFonts([
    {
        family: "Comfortaa",
        weights: [300, 400, 500, 600, 700]
    },
    {
        family: "Nunito",
        weights: [200, 400, 500, 600, 700]
    }
])
```
