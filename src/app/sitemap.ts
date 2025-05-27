import { MetadataRoute } from 'next';

// TODO: Fetch dynamic routes (e.g., client pages, service pages)
// import { getAllClientSlugs, getAllServicePages } from '@/lib/api'; // Example

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '', // Homepage
    '/about',
    '/contact',
    '/services',
    // Add other static routes here
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const, // Or 'weekly', 'daily' depending on content update frequency
    priority: route === '' ? 1.0 : 0.8, // Homepage higher priority
  }));

  // Example for dynamic client pages
  // const clientSlugs = await getAllClientSlugs(); // Fetch all client slugs
  // const clientRoutes = clientSlugs.map((slug) => ({
  //   url: `${BASE_URL}/${slug}`, // Assuming client pages are at /:clientSlug
  //   lastModified: new Date().toISOString(),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7,
  // }));

  // Example for dynamic service pages
  // const servicePages = await getAllServicePages(); // Fetch all service pages
  // const serviceRoutes = servicePages.map((service) => ({
  //   url: `${BASE_URL}/services/${service.slug}`,
  //   lastModified: new Date().toISOString(),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }));

  return [
    ...staticRoutes,
    // ...clientRoutes,
    // ...serviceRoutes,
  ];
} 