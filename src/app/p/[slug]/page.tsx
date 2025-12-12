import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { api } from "../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { GalleryBreadcrumb } from "@/components/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function fetchProduct(slug: string) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) throw new Error("Missing NEXT_PUBLIC_CONVEX_URL");
  const client = new ConvexHttpClient(convexUrl);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const item = await (client as any).query(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    (api as any).images.getImageBySlug,
    {
      slug,
    },
  );
  return item as {
    url: string;
    title?: string;
    slug?: string;
    category?: string;
    materials?: string[];
    year?: number;
    description?: string;
  } | null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchProduct(slug);
  if (!item) return {};
  const title = item.title ?? "Продукт";
  const description = item.description ?? "Индивидуални мебели по поръчка";
  const url = `https://a-el-key.com/p/${slug}`;
  return {
    title: `${title} | a-el-key мебели`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | a-el-key мебели`,
      description,
      url,
      images: item.url
        ? [{ url: item.url, width: 1200, height: 630, alt: title }]
        : undefined,
      type: "website",
      siteName: "a-el-key мебели",
      locale: "bg_BG",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await fetchProduct(slug);
  if (!item) notFound();

  const title = item.title ?? "Продукт";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <GalleryBreadcrumb category={item.category} itemName={title} />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-2 sm:p-4">
              {item.url && (
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={item.url}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority={false}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#003C70]">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {item.description && (
                <p className="text-gray-700">{item.description}</p>
              )}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {item.category && (
                  <div>
                    <div className="text-sm text-gray-500">Категория</div>
                    <div className="font-medium">{item.category}</div>
                  </div>
                )}
                {item.year && (
                  <div>
                    <div className="text-sm text-gray-500">Година</div>
                    <div className="font-medium">{item.year}</div>
                  </div>
                )}
                {item.materials && item.materials.length > 0 && (
                  <div className="sm:col-span-2">
                    <div className="text-sm text-gray-500">Материали</div>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {item.materials.map((m) => (
                        <span
                          key={m}
                          className="rounded bg-gray-200 px-2 py-1 text-sm text-gray-700"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
