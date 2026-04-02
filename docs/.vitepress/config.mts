import { defineConfig } from "vitepress";

export default defineConfig({
    title: "puppeteer-html2pdf-ts",
    description: "Convert HTML to PDF using Puppeteer + TypeScript.",
    base: "/puppeteer-html2pdf-ts/",
    themeConfig: {
        nav: [{ text: "Guide", link: "/guide/getting-started" }],
        sidebar: {
            "/guide/": [
                {
                    text: "Guide",
                    items: [
                        { text: "Getting started", link: "/guide/getting-started" },
                        { text: "Fonts", link: "/guide/fonts" },
                    ],
                },
            ],
        },
        search: {
            provider: "local",
        },
        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/gihanrangana/puppeteer-html2pdf-ts",
            },
        ],
    },
});
