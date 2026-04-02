import type { LaunchOptions, PDFOptions, PuppeteerLifeCycleEvent } from "puppeteer";

/**
 * Options for initializing the PDF generator.
 *
 * @see {@link https://pptr.dev/api/puppeteer.launchoptions}
 */
export type InitOptions = LaunchOptions;

/**
 * Options for adding a font to the PDF generator.
 */
export type FontFamily = {
    family: string;
    weights: number[];
};

/**
 * Options for creating a PDF.
 *
 * @see {@link https://pptr.dev/api/puppeteer.pdfoptions}
 */
export type CreateOptions = PDFOptions & {
    /** Control when the page considers content loaded */
    waitUntil?: PuppeteerLifeCycleEvent;
    /** Timeout in ms for page.setContent() */
    contentTimeout?: number;
};


/**
 * A page entry for the PDF generator.
 */
export type PageEntry = {
    number: number;
    content: string;
}
