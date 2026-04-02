import type { Browser } from "puppeteer";
import puppeteer from "puppeteer";
import type { InitOptions } from "../types";
import Document from "./document";

/**
 * htmlToPdf class to generate PDFs from HTML.
 *
 * Takes a HTML template in the constructor. Allows adding pages of content.
 * Renders the full HTML with all pages into a PDF using Puppeteer.
 *
 * @param template - The HTML template to use for the PDF
 * @param browser - The browser to use for the PDF
 *
 * @returns A Promise that resolves to the generated PDF data
 *
 * @example
 * const pdf = new html2PDF();
 * await pdf.init();
 * app.get("/", async (_req, res) => {
 *     const doc = pdf.loadTemplate(templates.main);
 *     doc.addPage(1, content);
 *     doc.addFonts([
 *         { family: "Audiowide", weights: [400, 700] },
 *     ]);
 *     const buffer = await doc.create({
 *         displayHeaderFooter: true,
 *         headerTemplate: templates.header,
 *         footerTemplate: templates.footer,
 *     });
 *     // Do anything with this Buffer
 *     res.setHeader('Content-Type', 'application/pdf');
 *     res.send(buffer);
 * });
 * process.on("SIGINT", async () => {
 *     await pdf.close();
 *     process.exit(0);
 * });
 *
 */

class htmlToPdf {
    private browser: Browser | null = null;

    /**
     * Initializes the Puppeteer browser
     *
     * @param options - Puppeteer launch options
     * @returns Promise that resolves when the browser is initialized
     * @throws Error if the browser is already initialized
     */
    public async init(options: InitOptions = {}): Promise<void> {
        if (this.browser) {
            throw new Error("Browser already initialized");
        }

        this.browser = await puppeteer.launch({
            headless: true,
            ...options,
        });
    }

    /**
     * Loads a template into the Document class.
     * @param template - The template to load.
     * @returns The Document class.
     * @throws Error if the browser is not initialized.
     */
    public loadTemplate(template: string): Document {

        if (!this.browser) {
            throw new Error("Browser not initialized. Call init() before loadTemplate().");
        }

        return new Document(template, this.browser);
    }

    /**
     * Closes the Puppeteer browser
     *
     * @returns Promise that resolves when the browser is closed
     * @throws Error if the browser is not initialized.
     */
    public async close(): Promise<void> {
        if (!this.browser) {
            throw new Error("Browser not initialized. Call init() before close().");
        }

        await this.browser.close();
        this.browser = null;
    }

}

export default htmlToPdf;
