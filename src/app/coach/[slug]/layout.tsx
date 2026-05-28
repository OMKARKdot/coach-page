import { getCoachTenantBySlug, getTenantProfile } from "@/lib/coachpage-firestore";
import { notFound } from "next/navigation";
import Navbar from "@/components/coach-public/Navbar";
import Footer from "@/components/coach-public/Footer";
import Script from "next/script";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tenant = await getCoachTenantBySlug(params.slug);
  
  if (!tenant && params.slug !== "demo-institute") return {};
  
  const profile = params.slug === "demo-institute" ? {
    institute_name: "Bright Star Academy",
    institute_type: "NEET/JEE",
    tagline: "Aurangabad's Most Trusted NEET/JEE Coaching Since 2012",
    banner_image_url: "https://images.unsplash.com/photo-1523050853063-bd80e295ce7f?auto=format&fit=crop&q=80",
    logo_url: "https://via.placeholder.com/200x200?text=BSA+Logo",
    address: "N-6 CIDCO, Chh. Sambhaji Nagar",
    phone: "+91 240 234 0000",
    email: "info@brightstaracademy.in",
    established_year: 2012,
  } : await getTenantProfile(tenant!.id);

  const instituteName = profile?.institute_name || "Coaching Institute";
  const instituteType = profile?.institute_type || "Coaching";
  const tagline = profile?.tagline || "Professional coaching for NEET, JEE and more.";
  const address = profile?.address || "";

  return {
    title: `${instituteName} — ${instituteType} Coaching in Chh. Sambhaji Nagar`,
    description: `${tagline}. ${profile?.total_students_trained ? profile.total_students_trained + '+ students trained.' : ''} Admissions open for NEET, JEE, MHT-CET.`,
    keywords: `${instituteType} coaching Aurangabad, ${instituteType} coaching Chh Sambhaji Nagar, ${instituteName} CIDCO, NEET coaching Aurangabad, JEE coaching Aurangabad, best coaching in Aurangabad`,
    openGraph: {
      title: instituteName,
      description: tagline,
      images: [profile?.banner_image_url || profile?.logo_url || ""],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: instituteName,
      description: tagline,
    },
  };
}

function generateJsonLd(profile: any, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": profile?.institute_name || "Bright Star Academy",
    "description": profile?.tagline || "Coaching Institute",
    "url": `https://coachpage.in/coach/${slug}`,
    "telephone": profile?.phone || "",
    "foundingDate": profile?.established_year?.toString() || "",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": profile?.address || "",
      "addressLocality": "Chhatrapati Sambhaji Nagar",
      "addressRegion": "Maharashtra",
      "postalCode": "431003",
      "addressCountry": "IN"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Courses",
      "itemListElement": []
    }
  };
}

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const tenant = await getCoachTenantBySlug(params.slug);
  
  let profile: any;
  
  if (params.slug === "demo-institute") {
    profile = {
      institute_name: "Bright Star Academy",
      institute_type: "NEET/JEE",
      tagline: "Aurangabad's Most Trusted NEET/JEE Coaching Since 2012",
      logo_url: "https://via.placeholder.com/200x200?text=BSA+Logo",
      banner_image_url: "https://images.unsplash.com/photo-1523050853063-bd80e295ce7f?auto=format&fit=crop&q=80",
      address: "N-6 CIDCO, Chh. Sambhaji Nagar",
      phone: "+91 240 234 0000",
      email: "info@brightstaracademy.in",
      established_year: 2012,
      total_students_trained: 2400,
    };
  } else if (tenant) {
    profile = await getTenantProfile(tenant.id);
  } else {
    notFound();
  }

  const jsonLd = generateJsonLd(profile, params.slug);

  return (
    <div className="min-h-screen bg-white">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar profile={profile} slug={params.slug} />
      <main>{children}</main>
      <Footer profile={profile} />
    </div>
  );
}
