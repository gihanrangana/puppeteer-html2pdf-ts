import { PDFOptions } from 'puppeteer';

export type FontFamily = {
    family: string;
    weights: number[];
}

export type CreateOptions = PDFOptions;