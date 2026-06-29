import { SitemapStream, streamToPromise } from "sitemap";
import { serverQueryContent } from "#content/server";
import SiteSettings from "@/data/site.json";
import { useBlogPageHelpers } from "@/composables/useBlogPage";
import LangSettings from "@/data/lang-setting.json";
const { convertToSlug } = useBlogPageHelpers();

interface LangSetting {
  value: string;
  isDefault?: boolean;
}

interface CategoryItem {
  text: string;
  open_new_tab: boolean;
}

/// Get the list of language codes
const langCodes = (LangSettings as LangSetting[]).map((l) => l.value);

/// Check if the path is a blog content path
const isBlogContentPath = (path?: string) => {
  if (!path) return false;
  // Exclude blog index pages
  if (path === "/blog") return false;
  for (const code of langCodes) {
    if (path === `/${code}/blog`) return false;
  }
  // Match content paths under blog for default and localized languages
  if (path.startsWith("/blog/")) return true;
  for (const code of langCodes) {
    if (path.startsWith(`/${code}/blog/`)) return true;
  }
  return false;
};

/// Remove duplicate categories
function removeDuplicateCategories(categories: CategoryItem[]) {
  const uniqueCategories = new Map<string, CategoryItem>();

  for (const cate of categories) {
    const slug = convertToSlug(cate.text);

    if (!uniqueCategories.has(slug)) {
      uniqueCategories.set(slug, cate);
    }
  }

  return Array.from(uniqueCategories.values());
}

const getListCategories = (docs: any) => {
  const listCategories: CategoryItem[] = [];

  for (const doc of docs) {
    if (
      isBlogContentPath(doc._path) &&
      doc.publish &&
      !doc?.seo?.no_index &&
      Array.isArray(doc?.category)
    ) {
      listCategories.push(...doc.category);
    }
  }

  return listCategories.length > 0 ? removeDuplicateCategories(listCategories) : [];
};

export default defineEventHandler(async (event) => {
  // Fetch all documents
  const docs = await serverQueryContent(event).find();

  const baseUrl = SiteSettings?.en.BaseURL || "https://example.com";

  const sitemap = new SitemapStream({
    hostname: baseUrl,
  });

  const listCategories = getListCategories(docs);

  for (const doc of docs) {
    // Skip if page has no path, or is explicitly set to no_index
    if (!doc._path || doc?.seo?.no_index) continue;

    // For blog posts, only write if they are published
    if (isBlogContentPath(doc._path) && !doc.publish) continue;
    sitemap.write({
      url: doc._path,
      changefreq: doc?.sitemap?.changefreq || "weekly",
      priority:
        doc?.sitemap?.priority !== undefined
          ? doc.sitemap.priority
          : doc._path !== "/"
          ? 0.8
          : 1.0,
      lastmod: new Date(),
    });
  }
  
  /// Write the category path to the sitemap
  if (listCategories.length > 0) {
    const defaultLang = (LangSettings as LangSetting[]).find((l) => l.isDefault)?.value || "en";
    for (const cate of listCategories) {
      const slug = convertToSlug(cate.text);
      // Default language (no prefix)
      sitemap.write({
        url: `/blog/category/${slug}`,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: new Date(),
      });
      // Localized languages with prefix
      for (const code of langCodes) {
        if (code === defaultLang) continue;
        sitemap.write({
          url: `/${code}/blog/category/${slug}`,
          changefreq: "weekly",
          priority: 0.8,
          lastmod: new Date(),
        });
      }
    }
  }

  sitemap.end();

  return streamToPromise(sitemap);
});
