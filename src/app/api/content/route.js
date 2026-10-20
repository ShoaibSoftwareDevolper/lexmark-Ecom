import { siteData } from "@/data/siteData";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section");

  if (section && siteData[section]) {
    return Response.json({ success: true, data: siteData[section] });
  }

  return Response.json({ success: true, data: siteData });
}
