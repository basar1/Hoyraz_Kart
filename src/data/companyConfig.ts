/**
 * TEK MERKEZDEN YÖNETİM
 * Şirket bilgisi ortaktır. Yeni bir çalışan eklemek için `employees` dizisine
 * yeni bir kayıt koyun. `slug` adres çubuğundaki uzantıdır (`/huseyin-sahin`).
 * `kart` ve `makaleler` statik sayfa olduğu için slug olarak kullanılamaz.
 *
 * Makale `content` alanı boş satırla ayrılmış paragraflardan oluşur.
 * `## ` ile başlayan bir blok ara başlık olarak gösterilir.
 * `contact.website` boşsa vCard, kartın açıldığı site adresini yazar.
 *
 * `activeTheme` teslim temasını belirler.
 * `showThemeSwitcher` sunumda `true`, müşteriye teslimde `false` olmalıdır.
 * `socials` alanları boş string bırakılırsa kartvizitte ve altbilgide o ikon gösterilmez.
 */

import type { ThemeId } from "@/data/themes";

export interface OfficeInfo {
  name: string;
  city: string;
  statement: string;
  intro: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  fullName: string;
  namePrefix: string;
  title: string;
  barRegistration: string;
  biography: string;
  education: string;
  photoUrl: string;
  photoAlt: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  address: string;
  mapsDirectionsUrl: string;
  mapsEmbedUrl: string;
  workingHours: string;
  website: string;
}

export interface SocialLinks {
  linkedin?: string;
  x?: string;
  instagram?: string;
}

export interface Employee {
  slug: string;
  personalInfo: PersonalInfo;
  contact: ContactInfo;
  socials: SocialLinks;
}

export type PracticeIconName = "Leaf" | "Sprout" | "Tractor" | "Building2" | "HardHat" | "Ruler";

export interface PracticeArea {
  title: string;
  icon: PracticeIconName;
  summary: string;
  description: string;
}

export interface Article {
  slug: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  summary: string;
  content: string;
}

export interface CompanyConfig {
  office: OfficeInfo;
  practiceAreas: PracticeArea[];
  articles: Article[];
  legalCompliance: string;
  activeTheme: ThemeId;
  showThemeSwitcher: boolean;
  employees: Employee[];
}

const sharedAddress =
  "Tuval Hill Residance, Atatürk Mah., İsmet İnönü Bulv, 31104. Sk. No:29 D:44, 33200 Mezitli/Mersin";

function sharedContact(phone: string, email: string, whatsappMessage: string): ContactInfo {
  const destination = encodeURIComponent(sharedAddress);

  return {
    phone,
    whatsapp: phone,
    whatsappMessage,
    email,
    address: sharedAddress,
    mapsDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
    mapsEmbedUrl: `https://maps.google.com/maps?q=${destination}&z=16&output=embed`,
    workingHours: "Pazartesi – Cuma, 09:00 – 18:00",
    website: "",
  };
}

const emptySocials: SocialLinks = {
  linkedin: "",
  x: "",
  instagram: "",
};

export const companyConfig = {
  office: {
    name: "Hoyraz Tarım, İnşaat ve Mühendislik",
    city: "Mersin",
    statement: "Üretimden Geleceğe Güven İnşa Ediyoruz",
    intro:
      "2019 yılında Mersin'de kurulan Hoyraz; 30 yıllık saha tecrübesiyle tarım, inşaat ve mühendislik alanlarında global standartlarda hizmet sunmaktadır. Amacımız proje risklerini asgariye indirerek marka değerinizi en yüksek seviyeye taşımaktır.",
  },
  practiceAreas: [
    {
      title: "Tarımsal Üretim",
      icon: "Leaf",
      summary: "Lamas, Enterdonat, Mayer Limon ve Avokado yetiştiriciliği.",
      description:
        "Akdeniz iklimine uygun, yüksek katma değerli ve global standartlarda sürdürülebilir tarım üretimi gerçekleştiriyoruz.",
    },
    {
      title: "Bahçe ve Tesis Yönetimi",
      icon: "Sprout",
      summary: "Tarım operasyonlarının uçtan uca disiplinli yönetimi.",
      description:
        "Sahadaki 30 yıllık tecrübemizle tarımsal tesislerin verimliliğini artırıyor, riskleri minimize ediyoruz.",
    },
    {
      title: "İnşaat Proje Yönetimi",
      icon: "Building2",
      summary: "Planlama, koordinasyon ve anahtar teslim süreç yönetimi.",
      description:
        "Ticari yapılar ve AVM akreditasyon süreçlerinde yüksek kalite standartlarıyla saha koordinasyonu sağlıyoruz.",
    },
    {
      title: "Mühendislik Danışmanlığı",
      icon: "Ruler",
      summary: "Teknik karar süreçlerinde mühendislik projelendirmesi.",
      description:
        "Mimari ve mühendislik kararlarını uygulanabilir, ölçülebilir projelere dönüştürerek yatırımcıyı koruyoruz.",
    },
  ],
  articles: [] as Article[],
  legalCompliance:
    "Bu platform Hoyraz Tarım, İnşaat ve Mühendislik kurumsal kimlik standartlarına göre hazırlanmıştır.",
  activeTheme: "emerald-dark",
  showThemeSwitcher: false,
  employees: [
    {
      slug: "huseyin-sahin",
      personalInfo: {
        firstName: "Hüseyin",
        lastName: "Şahin",
        fullName: "Hüseyin Şahin",
        namePrefix: "",
        title: "Genel Müdür",
        barRegistration: "",
        biography: "",
        education: "",
        photoUrl: "/huseyin.jpg",
        photoAlt: "Hüseyin Şahin - Hoyraz Genel Müdür",
      },
      contact: sharedContact(
        "+905334331543",
        "huseyin.sahin@hoyraz.com.tr",
        "Merhaba Hüseyin Bey, dijital kartvizitiniz üzerinden ulaşıyorum.",
      ),
      socials: emptySocials,
    },
    {
      slug: "murat-sahin",
      personalInfo: {
        firstName: "Murat",
        lastName: "Şahin",
        fullName: "Murat Şahin",
        namePrefix: "",
        title: "Tarım",
        barRegistration: "",
        biography: "",
        education: "",
        photoUrl: "/murat.jpg",
        photoAlt: "Murat Şahin - Hoyraz Tarım",
      },
      contact: sharedContact(
        "+905052638036",
        "murattsahinnn45@gmail.com",
        "Merhaba Murat Bey, dijital kartvizitiniz üzerinden ulaşıyorum.",
      ),
      socials: emptySocials,
    },
    {
      slug: "baris-erdogan",
      personalInfo: {
        firstName: "Barış",
        lastName: "Erdoğan",
        fullName: "Barış Erdoğan",
        namePrefix: "",
        title: "İnşaat Mühendisi",
        barRegistration: "",
        biography: "",
        education: "",
        photoUrl: "/baris.jpg",
        photoAlt: "Barış Erdoğan - Hoyraz İnşaat Mühendisi",
      },
      contact: sharedContact(
        "+905325952772",
        "berdogan60@gmail.com",
        "Merhaba Barış Bey, dijital kartvizitiniz üzerinden ulaşıyorum.",
      ),
      socials: emptySocials,
    },
    {
      slug: "melike-kale",
      personalInfo: {
        firstName: "Melike",
        lastName: "Kale",
        fullName: "Melike Kale",
        namePrefix: "",
        title: "Muhasebe ve Finans",
        barRegistration: "",
        biography: "",
        education: "",
        photoUrl: "/melike.jpg",
        photoAlt: "Melike Kale - Hoyraz Muhasebe ve Finans",
      },
      contact: sharedContact(
        "+905074536289",
        "",
        "Merhaba Melike Hanım, dijital kartvizitiniz üzerinden ulaşıyorum.",
      ),
      socials: emptySocials,
    },
  ],
} satisfies CompanyConfig;

export function getEmployee(slug: string): Employee | undefined {
  return companyConfig.employees.find((employee) => employee.slug === slug);
}

export function getArticle(slug: string): Article | undefined {
  return companyConfig.articles.find((article) => article.slug === slug);
}

export function getOtherArticles(slug: string, limit = 2): Article[] {
  return companyConfig.articles.filter((article) => article.slug !== slug).slice(0, limit);
}
