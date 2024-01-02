import puppeteer, { PDFOptions } from "puppeteer";
import * as cheerio from 'cheerio';
import { resolve } from "path";
import { CreateOptions, FontFamily } from "../types";

/**
 * htmlToPDF class to generate PDFs from HTML.
 * 
 * Takes a HTML template in the constructor. Allows adding pages of content.
 * Renders the full HTML with all pages into a PDF using Puppeteer.
 */

class html2PDF {

    public template: cheerio.CheerioAPI;
    public pages: any[] = []
    public currentPage: number = 0;

    constructor(template: string) {
        this.template = cheerio.load(template);
    }

    public addFonts = async (fonts: Array<FontFamily> = []) => {

        let fontString = "https://fonts.googleapis.com/css2?family=";

        fontString += fonts.map((font) => `${font.family}:wght@${font.weights.join(";")}`).join("&family=");

        fontString += "&display=swap";

        const link = this.template('<link>');

        link.attr('rel', 'stylesheet');
        link.attr('href', fontString);

        this.template('title').after(link);

    }

    /**
     * Adds a new page to the PDF document 
     * 
     * @param pageNumber - The page number for the new page
     * @param pageData - The HTML content for the new page
     * 
     * Returns a Promise that resolves when the page has been added
    */
    public addPage = async (pageNumber: number, pageData: string) => {
        try {
            return new Promise((resolve) => {
                this.pages.push({
                    number: pageNumber,
                    content: pageData
                });

                this.currentPage = pageNumber;

                resolve("done");
            });
        } catch (error) {
            console.error(error);
            resolve("error");
        }
    }


    /**
     * Creates a PDF from the HTML template and content pages.
     * 
     * Launches a headless Chrome browser using Puppeteer.
     * Loads the HTML template and appends content from pages.
     * Uses cheerio to manipulate the DOM.
     * Renders the full HTML to a PDF using page.pdf().
     * Closes the browser after PDF is generated.
     * 
     * Returns a Promise resolving to the generated PDF data.
     */
    public create = async (options: CreateOptions = {}) => {
        try {
            const browser = await puppeteer.launch({ headless: "new" })
            const page = await browser.newPage()

            this.pages.forEach((page, index) => {
                this.template('#content').append(page.content);

                // Add page break after content if it's not the last page
                if (index < this.pages.length - 1) {
                    this.template('#content').append("<div class='page_break'></div>");
                }
            });

            await page.setContent(this.template.html());

            await page.waitForNetworkIdle();

            const pdf = await page.pdf({
                format: "A4",
                margin:{
                    top: "100px",
                    bottom:"30px",
                    left:"20px",
                    right:"20px"
                },
                printBackground: true,
                ...options
            })

            await page.close()

            return pdf;

        } catch (e: any) {
            throw new Error(e?.message);
        }
    }

}

export default html2PDF;