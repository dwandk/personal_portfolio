export interface ProfileData {
  id?: string;
  name: string;
  headline: string;
  bio_line_1: string;
  bio_line_2?: string;
  profile_photo: string;
  university: string;
  graduation_year: string;
  cv_url: string;
}

export interface CapabilityData {
  id: string;
  number_code: string;
  title: string;
  label: string;
  category: string;
  tagline: string;
  description: string;
  display_order: number;
  skills?: SkillData[];
}

export interface SkillData {
  id: string;
  capability_id: string;
  name: string;
  is_tool?: boolean;
  tool_icon?: string;
  display_order: number;
}

export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  short_desc: string;
  long_desc: string;
  gradient: string;
  thumbnail: string;
  featured: boolean;
  display_order: number;
  role?: string;
  tools: string[];
  highlights: string[];
  github_url?: string;
  live_url?: string;
  figma_url?: string;
  documentation_url?: string;
  prototype_url?: string;
  project_images?: { id: string; image_url: string; caption?: string; display_order: number }[];
}

export interface CertificationData {
  id: string;
  category_id: string;
  category_title: string;
  subtitle: string;
  issuer: string;
  year: string;
  image: string;
  description?: string;
  link?: string;
  display_order: number;
}

export interface ActivityData {
  id: string;
  title: string;
  caption: string;
  category: string;
  image: string;
  year?: string;
  display_order: number;
}
