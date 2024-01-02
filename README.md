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

### Sample HTML Template
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        body {
            position: relative;
            padding: 0;
            margin: 0;
            font-family: "Nunito", sans-serif;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            font-family: "Comfortaa", sans-serif;
        }

        .rect {
            top: 0;
            position: fixed;
            z-index: -1;
            width: 50px;
            height: 100vh;
            background-color: orange;
        }

        .page_break {
            page-break-before: always;
        }

        .header {
            /* position: fixed; */
            width: 200px;
            /* left: 60px;
            top: 20px; */
        }

        #content {
            /* width: 100%; */
            /* margin: 60px; */
            margin-top: 0;
        }

        .page {
            /* margin-top: 100px; */
        }

        .footer {
            border-top: 1px solid #000;
            background-color: #000;
            width: 100%;
        }
    </style>
</head>

<body>
    <!-- <div class="rect"></div> -->

    <div id="content"></div>
</body>

</html>
```