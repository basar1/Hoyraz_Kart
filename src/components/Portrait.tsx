import Image from "next/image";
import type { PersonalInfo } from "@/data/companyConfig";

export function RoundPortrait({
  personalInfo,
  size = 144,
  priority = false,
  className = "",
}: {
  personalInfo: PersonalInfo;
  size?: number;
  priority?: boolean;
  className?: string;
}) {
  const { photoUrl, photoAlt, fullName } = personalInfo;

  return (
    <Image
      src={photoUrl}
      alt={photoAlt || fullName}
      width={size}
      height={size}
      priority={priority}
      className={`object-cover object-[center_18%] ${className}`}
    />
  );
}
