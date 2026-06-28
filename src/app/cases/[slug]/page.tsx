import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetail } from "@/components/CaseDetail";
import { caseStudies, getCaseStudy } from "@/data/case-studies";

type CasePageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "案例不存在", robots: { index: false, follow: false } };

  return {
    title: study.title,
    description: study.useCase,
    alternates: { canonical: `/cases/${study.slug}` },
    openGraph: {
      title: study.title,
      description: study.useCase,
      type: "article",
      url: `/cases/${study.slug}`,
    },
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return <CaseDetail caseItem={study} />;
}
