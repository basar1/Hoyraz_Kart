import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DigitalCard } from "@/components/DigitalCard";
import { companyConfig, getEmployee } from "@/data/companyConfig";
import { lawyerPublicName } from "@/utils/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const employee = getEmployee(slug);
  if (!employee) return { title: "Dijital Kartvizit" };

  const publicName = lawyerPublicName(
    employee.personalInfo.namePrefix,
    employee.personalInfo.fullName,
  );

  return {
    title: publicName,
    description: `${publicName}, ${employee.personalInfo.title}. ${companyConfig.office.name} dijital kartviziti.`,
  };
}

export default async function EmployeePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const employee = getEmployee(slug);
  if (!employee) notFound();

  return (
    <div data-page="kart" className="min-h-screen bg-hero text-on-hero">
      <DigitalCard employee={employee} />
    </div>
  );
}

export const dynamicParams = false;

export function generateStaticParams() {
  return companyConfig.employees.map((employee) => ({
    slug: employee.slug,
  }));
}
