import MarkdownIt from "markdown-it";

const md = new MarkdownIt({ html: false, linkify: true });

// Base path. Locally the site is served from "/". On GitHub Pages for a
// project site it lives under /<repo>/. pages.yml sets PATH_PREFIX; override
// it for a custom domain (PATH_PREFIX=/) or a different repo name.
const pathPrefix = process.env.PATH_PREFIX || "/";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/css": "css", "src/js": "js" });
  eleventyConfig.addFilter("head", (a, n) => (a ?? []).slice(0, n));
  eleventyConfig.addFilter("md", (s) => md.render(s ?? ""));
  eleventyConfig.addFilter("mdInline", (s) => md.renderInline(s ?? ""));
  eleventyConfig.addFilter("list", (v) => (Array.isArray(v) ? v : v ? [v] : []));
  eleventyConfig.addFilter("nonempty", (v) => (Array.isArray(v) ? v.length > 0 : Boolean(v)));
  eleventyConfig.addFilter("slugClass", (s) => String(s).replace(/[^a-z0-9]+/gi, "-").toLowerCase());
  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    pathPrefix,
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
