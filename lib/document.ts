import * as cheerio from "cheerio";
import type { Browser, PDFOptions } from "puppeteer";
import type { CreateOptions, FontFamily, PageEntry } from "../types";

/**
 * Document class to generate PDFs from HTML.
 *
 * Takes a HTML template in the constructor. Allows adding pages of content.
 * Renders the full HTML with all pages into a PDF using Puppeteer.
 *
 * @param template - The HTML template to use for the PDF
 * @param browser - The browser to use for the PDF
 *
 */

class Document {
	private readonly templateSource: string;
	private readonly sharedBrowser: Browser | null;
	private pages: PageEntry[] = [];
	private fontLinkRef: string | null = null;

	constructor(template: string, browser: Browser) {
		this.templateSource = template;
		this.sharedBrowser = browser;
	}

	/**
	 * Adds fonts to the document.
	 * @param fonts - The fonts to add.
	 * @returns void
	 */
	public addFonts(fonts: FontFamily[] = []): void {
		if (fonts.length === 0) {
			this.fontLinkRef = null;
			return;
		}

		this.fontLinkRef =
			"https://fonts.googleapis.com/css2?family=" +
			fonts
				.map(
					(font) =>
						`${encodeURIComponent(font.family)}:wght@${font.weights.join(";")}`,
				)
				.join("&family=") +
			"&display=swap";
	}

	/**
	 * Adds a new page to the document.
	 * @param pageNumber - The page number to add.
	 * @param pageData - The HTML content to add to the page.
	 * @returns void
	 */
	public addPage(pageNumber: number, pageData: string): void {
		this.pages.push({
			number: pageNumber,
			content: pageData,
		});
	}

	/**
	 * Builds the HTML for the document.
	 * @returns The HTML for the document.
	 */
	private buildHtml(): string {
		const $ = cheerio.load(this.templateSource);

		if (this.fontLinkRef) {
			const link = $("<link>");
			link.attr("rel", "stylesheet");
			link.attr("href", this.fontLinkRef);

			const title = $("title");
			if (title.length > 0) {
				title.after(link);
			} else {
				$("head").append(link);
			}
		}

		const contentRoot = $("#content");

		if (contentRoot.length === 0) {
			throw new Error("Template must contain an element with id='content'.");
		}

		this.pages.forEach((page, i) => {
			contentRoot.append(page.content);

			if (i < this.pages.length - 1) {
				contentRoot.append("<div class='page_break'></div>");
			}
		});

		return $.html();
	}

	/**
	 * Merges the PDF options with the default options.
	 * @param overrides - The PDF options to merge.
	 * @returns The merged PDF options.
	 */
	private mergePdfOptions(overrides: PDFOptions): PDFOptions {
		const defaults: PDFOptions = {
			format: "A4",
			printBackground: true,
			margin: {
				top: "100px",
				bottom: "30px",
				left: "20px",
				right: "20px",
			},
		};

		return {
			...defaults,
			...overrides,
			margin: {
				...defaults.margin,
				...overrides.margin,
			},
		};
	}

	/**
	 * Creates a PDF from the document.
	 * @param options - The options for the PDF.
	 * @returns The PDF data.
	 */
	public async create(options: CreateOptions = {}): Promise<Uint8Array> {
		const { waitUntil, contentTimeout, ...pdfOptions } = options;

		if (!this.sharedBrowser) {
			throw new Error("Browser not initialized. Call init() before create().");
		}

		const page = await this.sharedBrowser.newPage();

		try {
			const html = this.buildHtml();

			await page.setContent(html, {
				waitUntil: waitUntil ?? "networkidle0",
				timeout: contentTimeout ?? 30_000,
			});

			const merged = this.mergePdfOptions(pdfOptions);

			return await page.pdf(merged);
		} catch (error: unknown) {
			const message =
				error instanceof Error ? error.message : "PDF generation failed";
			throw new Error(message);
		} finally {
			await page.close().catch(() => {});
		}
	}
}

export default Document;
