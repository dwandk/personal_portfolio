-- ==============================================================================
-- PORTFOLIO SUPABASE SCHEMA & MIGRATION SCRIPT
-- Project: Andika Dwi Prasetya Portfolio
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. PROFILES TABLE (About Me)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  headline TEXT NOT NULL,
  bio_line_1 TEXT NOT NULL,
  bio_line_2 TEXT,
  profile_photo TEXT NOT NULL,
  university TEXT NOT NULL,
  graduation_year TEXT NOT NULL,
  cv_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. CAPABILITIES & SKILLS TABLES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.capabilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number_code TEXT NOT NULL, -- e.g. '01', '02'
  title TEXT NOT NULL,        -- e.g. 'UI/UX Design'
  label TEXT NOT NULL,        -- e.g. 'UI/UX DESIGN'
  category TEXT NOT NULL,     -- e.g. 'DESIGN & USER EXPERIENCE'
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  capability_id UUID NOT NULL REFERENCES public.capabilities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  is_tool BOOLEAN DEFAULT FALSE,
  tool_icon TEXT, -- Lucide or SVG icon name if applicable
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. PROJECTS, IMAGES & LINKS TABLES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  category TEXT NOT NULL,
  year TEXT NOT NULL,
  short_desc TEXT NOT NULL,
  long_desc TEXT NOT NULL,
  gradient TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
  thumbnail TEXT NOT NULL,
  featured BOOLEAN DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  role TEXT,
  tools TEXT[] DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  figma_url TEXT,
  documentation_url TEXT,
  prototype_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. CERTIFICATIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id TEXT NOT NULL,
  category_title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  issuer TEXT NOT NULL,
  year TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT,
  link TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. ACTIVITIES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  caption TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'EVENT',
  image TEXT NOT NULL,
  year TEXT DEFAULT '2025',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. UPDATED_AT TRIGGER FUNCTION
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_capabilities_updated_at ON public.capabilities;
CREATE TRIGGER set_capabilities_updated_at BEFORE UPDATE ON public.capabilities FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_projects_updated_at ON public.projects;
CREATE TRIGGER set_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_certifications_updated_at ON public.certifications;
CREATE TRIGGER set_certifications_updated_at BEFORE UPDATE ON public.certifications FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_activities_updated_at ON public.activities;
CREATE TRIGGER set_activities_updated_at BEFORE UPDATE ON public.activities FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 7. ROW LEVEL SECURITY (RLS) POLICIES & SCHEMA PERMISSIONS
-- ------------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Grant Schema & Table access to API Roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;

-- Public SELECT policies (Everyone can read portfolio content)
DROP POLICY IF EXISTS "Public read profiles" ON public.profiles;
CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read capabilities" ON public.capabilities;
CREATE POLICY "Public read capabilities" ON public.capabilities FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read skills" ON public.skills;
CREATE POLICY "Public read skills" ON public.skills FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read projects" ON public.projects;
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read project_images" ON public.project_images;
CREATE POLICY "Public read project_images" ON public.project_images FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read certifications" ON public.certifications;
CREATE POLICY "Public read certifications" ON public.certifications FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read activities" ON public.activities;
CREATE POLICY "Public read activities" ON public.activities FOR SELECT USING (true);

-- Authenticated Admin Policies (Only logged-in admin users can modify)
DROP POLICY IF EXISTS "Admin write profiles" ON public.profiles;
CREATE POLICY "Admin write profiles" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write capabilities" ON public.capabilities;
CREATE POLICY "Admin write capabilities" ON public.capabilities FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write skills" ON public.skills;
CREATE POLICY "Admin write skills" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write projects" ON public.projects;
CREATE POLICY "Admin write projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write project_images" ON public.project_images;
CREATE POLICY "Admin write project_images" ON public.project_images FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write certifications" ON public.certifications;
CREATE POLICY "Admin write certifications" ON public.certifications FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write activities" ON public.activities;
CREATE POLICY "Admin write activities" ON public.activities FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 8. STORAGE BUCKET CONFIGURATION (portfolio)
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Read Storage" ON storage.objects;
CREATE POLICY "Public Read Storage" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "Admin Upload Storage" ON storage.objects;
CREATE POLICY "Admin Upload Storage" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "Admin Update Storage" ON storage.objects;
CREATE POLICY "Admin Update Storage" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "Admin Delete Storage" ON storage.objects;
CREATE POLICY "Admin Delete Storage" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio');

-- ------------------------------------------------------------------------------
-- 9. INITIAL SEED DATA (Populated directly from existing portfolio data)
-- ------------------------------------------------------------------------------

-- Seed Profile
INSERT INTO public.profiles (
  name, headline, bio_line_1, bio_line_2, profile_photo, university, graduation_year, cv_url
) VALUES (
  'ANDIKA DWI PRASETYA',
  'Problem Solver. Digital Generalist.',
  'I''m an Information Systems student at UPN "Veteran" Yogyakarta focused on UI/UX design, web development, and system analysis. I enjoy turning ideas and real-world problems into practical digital solutions, particularly through web applications, databases, and structured system workflows.',
  'Throughout my studies, I gained hands-on experience building database-driven systems and working with technologies such as Laravel, React, Mikrotik, SQL, and Power BI. My work was recognized through awards including 2nd Place in BERAKSI 2025 National UX Competition.',
  '/assets/projects/Andika.png',
  'UPN Veteran Yogyakarta',
  '2026',
  'https://drive.google.com/file/d/1vN8IHGorNeELunyL0rSZkzvWBu7LXTSq/view?usp=drive_link'
) ON CONFLICT DO NOTHING;

-- Seed Projects
INSERT INTO public.projects (
  slug, title, subtitle, category, year, short_desc, long_desc, gradient, thumbnail, featured, display_order, tools, highlights, figma_url, live_url, github_url, documentation_url
) VALUES 
(
  'calmora',
  'Calmora',
  'Mental Health App UI',
  'UI/UX Design',
  '2024',
  'A UI/UX design for a mental health application focused on comfort and emotional well-being.',
  'Calmora is a mental health application UI designed using a user-centered design approach. The project explores user research, persona creation, wireframing, and interactive prototyping to address emotional well-being. The interface emphasizes calm color palettes, clear typography, and intuitive navigation to create a safe and comforting digital space.',
  'from-purple-500 to-pink-500',
  '/assets/projects/calmora.png',
  true,
  1,
  ARRAY['Figma', 'Adobe Illustrator', 'User Research'],
  ARRAY['User research & persona development', 'High-fidelity wireframing & prototyping', 'Calm color palette & typography system', 'Iterative usability testing'],
  'https://www.figma.com/proto/TuFIKxVvu7V3mRNVY5RkLX/Calmora?node-id=161-1386&p=f&t=7LaDlVSSs0cxv5Vt-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=161%3A1386&show-proto-sidebar=1',
  NULL, NULL, NULL
),
(
  'ling-ling-pet-shop',
  'Ling-Ling Pet Shop',
  'Pet Shop Website',
  'Web Application',
  '2024',
  'A pet shop website designed to support business operations and customer interaction.',
  'Ling-Ling Pet Shop is a web-based system developed to support pet shop business operations and customer interaction. The project includes system planning (SKPL), database design, UI development, and backend implementation. The website enables users to browse products, access service information, and interact with the business efficiently.',
  'from-blue-500 to-cyan-500',
  '/assets/projects/petshop.png',
  true,
  2,
  ARRAY['PHP', 'Laravel', 'MySQL', 'Tailwind CSS'],
  ARRAY['Full system design document (SKPL)', 'Responsive product catalog UI', 'Admin panel for inventory management', 'Secure user authentication'],
  NULL, NULL, NULL,
  'https://drive.google.com/file/d/1foanQ3oQR5m8P-W67BWYAT2zp_YcGTik/view?usp=drive_link'
),
(
  'fundly',
  'Fundly',
  'UMKM & Investor App UI',
  'UI/UX Design',
  '2025',
  'A UI/UX design for a platform that connects UMKM owners with potential investors.',
  'Fundly is a UI/UX design project for a digital platform that connects UMKM owners with potential investors. The design focuses on clarity, trust, and usability by creating structured information architecture and smooth user flows. Visual consistency and intuitive interactions were prioritized to help users understand investment opportunities easily.',
  'from-green-500 to-teal-500',
  '/assets/projects/fundly.png',
  true,
  3,
  ARRAY['Figma', 'Prototyping', 'Wireframing'],
  ARRAY['BERAKSI 2025 competition entry', 'End-to-end user flow mapping', 'Investor & UMKM dual-profile UI', 'Interactive Figma prototype'],
  'https://www.figma.com/design/gvErZhSwhQ1C44Q3Wk9GoW/BerakSI?node-id=0-1&p=f&t=M7NodNtudSWCPLSa-0',
  NULL, NULL, NULL
),
(
  'ethiq',
  'ETHIQ',
  'Sharia Investment Website UI',
  'UI/UX Design',
  '2024',
  'A UI/UX design for a Sharia-based investment website with transparent and structured features.',
  'ETHIQ is a Sharia-based investment website UI designed to promote transparent and ethical investment activities. The project emphasizes clear information hierarchy, intuitive navigation, and strong visual structure to build user trust. Design decisions were carefully aligned with Sharia investment principles while maintaining a modern and professional appearance.',
  'from-amber-500 to-orange-500',
  '/assets/projects/ethiq.png',
  true,
  4,
  ARRAY['Figma', 'User Research', 'Prototyping'],
  ARRAY['Sharia-compliant investment guidelines integrated', 'High-contrast data visualization', 'Trust-building visual language', 'Responsive across devices'],
  'https://www.figma.com/proto/XEnj9oXvDtcRUAGmo4Z0Cz/ETHIQ?node-id=470-216&t=laIBdGbpKxmJvp4Q-1&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=188%3A274',
  NULL, NULL, NULL
),
(
  'wastewise',
  'WasteWise',
  'Waste Management Website UI',
  'UI/UX Design',
  '2024',
  'A UI/UX design for a digital waste management website.',
  'WasteWise is a UI/UX design project aimed at simplifying digital waste management through an informative and accessible interface. The design process includes user research, wireframing, usability testing, and prototyping to present waste-related data clearly.',
  'from-emerald-500 to-green-500',
  '/assets/projects/waste.png',
  true,
  5,
  ARRAY['Figma', 'Wireframing', 'User Testing'],
  ARRAY['Environmental data visualization', 'Accessible & inclusive UI design', 'User testing with real participants', 'Clear information hierarchy'],
  'https://www.figma.com/proto/XEnj9oXvDtcRUAGmo4Z0Cz/ETHIQ?page-id=0%3A1&node-id=188-274&p=f&viewport=427%2C-508%2C0.05&t=HslFnfqrnrxgb9UT-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=188%3A274',
  NULL, NULL, NULL
),
(
  'dedikasi',
  'Dedikasi',
  'UMKM Marketplace UI',
  'UI/UX Design',
  '2024',
  'A UI/UX design for UMKM owners to sell products and connect with investors.',
  'Dedikasi is a UI/UX design for a marketplace that supports UMKM owners in selling products and connecting with investors. The design focuses on creating a supportive and accessible interface that encourages user engagement and trust.',
  'from-indigo-500 to-purple-500',
  '/assets/projects/dedikasi.png',
  true,
  6,
  ARRAY['Figma', 'Prototyping', 'User Research'],
  ARRAY['Dual user role: seller & investor', 'Marketplace product listing UI', 'Trust & transparency design patterns', 'Interactive prototype flows'],
  'https://www.figma.com/proto/XEnj9oXvDtcRUAGmo4Z0Cz/ETHIQ?page-id=0%3A1&node-id=624-1611&viewport=-1629%2C-1000%2C0.04&t=BOfiOlzwOAbOoAfr-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=640%3A1660',
  NULL, NULL, NULL
),
(
  'peka-tsunami',
  'Peka-Tsunami',
  'Tsunami Awareness Website',
  'Web Application',
  '2023',
  'An informational website designed to increase awareness of tsunami disasters.',
  'Peka-Tsunami is an informational web platform built to raise public awareness about tsunami disaster preparedness. The system presents critical data, safety tips, and geographic risk zones in a structured and accessible format. Built with PHP and Laravel, it includes an admin panel for managing content and data updates.',
  'from-red-500 to-orange-500',
  '/assets/projects/tsunami.png',
  true,
  7,
  ARRAY['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
  ARRAY['Disaster awareness content management', 'Geographic risk zone visualization', 'Admin panel for content updates', 'Public-facing responsive UI'],
  NULL, NULL,
  'https://github.com/FathanRasyidi/SIMB.git',
  NULL
),
(
  'kelana',
  'Kelana',
  'Travel App UI Design',
  'UI/UX Design',
  '2024',
  'A travel application UI focused on helping users discover destinations, plan trips, and manage travel experiences intuitively.',
  'Kelana is a travel app UI project that emphasizes user-centered design, clean navigation, and visual storytelling. The design process includes user research, wireframing, and high-fidelity UI to create an engaging and seamless travel planning experience.',
  'from-teal-500 to-cyan-500',
  '/assets/projects/kelana.png',
  true,
  8,
  ARRAY['Figma'],
  ARRAY['Destination discovery flow', 'Trip planning & itinerary UI', 'Visual storytelling layouts', 'High-fidelity Figma prototype'],
  'https://www.figma.com/proto/6541DjgpMLHoSeEccKjGE9/Kelana?page-id=43%3A21&node-id=214-2808&viewport=219%2C183%2C0.09&t=Xoc6mYWJfzA84F3R-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=214%3A2808&show-proto-sidebar=1',
  NULL, NULL, NULL
),
(
  'remedify',
  'Remedify',
  'Healthcare Mobile App',
  'Mobile App',
  '2025',
  'A healthcare mobile app to check drug ingredients, access medication info, receive reminders, and find nearby pharmacies.',
  'Remedify is a healthcare mobile application focused on improving medication awareness and adherence. The app allows users to check drug ingredients, view detailed medication information including usage and precautions, receive timely reminders for taking medication, and locate nearby pharmacies based on their location.',
  'from-indigo-500 to-purple-500',
  '/assets/projects/Remedify.png',
  true,
  9,
  ARRAY['Dart', 'Flutter', 'REST API'],
  ARRAY['Drug ingredient & info lookup', 'Medication reminder system', 'Nearby pharmacy geolocation', 'Clean & accessible mobile UI'],
  NULL, NULL,
  'https://github.com/dwandk/124230092_Tugas-Akhir-PAM_Andika.git',
  NULL
),
(
  'rainfall-crop-yield',
  'Impact of Rainfall on Crop Yield',
  'Data Analytics Dashboard',
  'Data Analytics',
  '2025',
  'A data analytics project analyzing the relationship between rainfall variability and agricultural productivity.',
  'This project analyzes how changes in rainfall patterns affect crop productivity using statistical analysis and data visualization. The dashboard presents insights through interactive charts to support data-driven conclusions in agricultural planning.',
  'from-emerald-500 to-green-600',
  '/assets/projects/Dashboard.png',
  true,
  10,
  ARRAY['Python', 'R', 'Power BI', 'Tableau'],
  ARRAY['Statistical regression analysis', 'Interactive BI dashboard', 'Agricultural data sourcing & cleaning', 'Predictive trend visualization'],
  NULL,
  'https://dashboard-kb-pertanian-india.42web.io/?i=2',
  NULL, NULL
),
(
  'rempah-rindu',
  'Rempah Rindu',
  'Restaurant Web App',
  'Web Application',
  '2024',
  'A restaurant web application for browsing menus, placing orders, and completing payments with an admin panel.',
  'Rempah Rindu is a full-featured restaurant web application designed to streamline the ordering and payment process for customers while providing efficient management tools for administrators. The platform allows users to explore food and beverage menus, place orders, and complete transactions smoothly. The admin dashboard supports managing menu items, pricing, availability, and real-time order monitoring.',
  'from-red-500 to-orange-500',
  '/assets/projects/rempah.png',
  true,
  11,
  ARRAY['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
  ARRAY['Full ordering & payment flow', 'Real-time admin order dashboard', 'Menu & pricing management', 'Responsive customer-facing UI'],
  NULL, NULL,
  'https://github.com/FathanRasyidi/SIMB.git',
  NULL
),
(
  'geopark-klaten',
  'Geopark Klaten Web GIS',
  'Interactive Map Platform',
  'Web Application',
  '2025',
  'An interactive web-based GIS platform that displays geopark locations in Klaten with map visualization.',
  'Geopark Klaten Web GIS is an interactive mapping platform designed to visualize and manage geopark locations in Klaten, Central Java. The system provides an intuitive map interface where users can explore various geological sites, view detailed information about each location, and understand the geographical distribution of geopark areas. Integrates OpenStreetMap with interactive markers and location clustering.',
  'from-blue-500 to-cyan-500',
  '/assets/projects/geo.png',
  true,
  12,
  ARRAY['React JS', 'Leaflet', 'OpenStreetMap', 'CSS'],
  ARRAY['OpenStreetMap integration with Leaflet', 'Interactive location markers & clustering', 'Geopark site detail info panels', 'Mobile-responsive map interface'],
  NULL,
  'https://dwandk.github.io/geopark_klaten/',
  NULL, NULL
)
ON CONFLICT DO NOTHING;

-- Seed Certifications
INSERT INTO public.certifications (
  category_id, category_title, subtitle, issuer, year, image, description, link, display_order
) VALUES
(
  'design', 'UI/UX & DESIGN COMPETITION', '2nd Place UX Competition BERAKSI 2025',
  'BERAKSI 2025 UX Competition', '2025', '/assets/projects/Beraksi.png',
  '2nd Place Winners in BERAKSI 2025 National UX Competition. Conducted user research, persona mapping, wireframing, high-fidelity UI design, and interactive Figma prototyping.',
  'https://drive.google.com/file/d/1vN8IHGorNeELunyL0rSZkzvWBu7LXTSq/view?usp=drive_link', 1
),
(
  'networking', 'NETWORKING & SECURITY', 'Certified Network Engineer (BNSP)',
  'BNSP Indonesia', '2025', '/assets/projects/BNSP.jpg',
  'Achieved national network engineering competency certification from BNSP Indonesia, validating skills in Mikrotik routing, network topology, security, and hardware troubleshooting.',
  'https://drive.google.com/file/d/1vN8IHGorNeELunyL0rSZkzvWBu7LXTSq/view?usp=drive_link', 2
),
(
  'data', 'DATA & ANALYTICS', 'IBM Data Classification & Analytics',
  'IBM', '2025', '/assets/projects/IBM.png',
  'Completed professional credentials in Data Classification, Data Governance, SQL querying, and analytical model building for structured business data.',
  'https://drive.google.com/file/d/1vN8IHGorNeELunyL0rSZkzvWBu7LXTSq/view?usp=drive_link', 3
),
(
  'management', 'PROJECT MANAGEMENT', 'Google Project Management Scholar',
  'Google x KOMDIGI', '2025', '/assets/projects/PM.png',
  'Completed intensive professional program covering Agile & Scrum project management, sprint planning, risk assessment, and software project lifecycles.',
  'https://drive.google.com/file/d/1vN8IHGorNeELunyL0rSZkzvWBu7LXTSq/view?usp=drive_link', 4
)
ON CONFLICT DO NOTHING;

-- Seed Activities
INSERT INTO public.activities (
  title, caption, category, image, year, display_order
) VALUES
(
  'BERAKSI 2025 UX Competition',
  '2nd Place Winners at BERAKSI 2025 National UX Competition — presenting user research & Figma prototypes.',
  'COMPETITION', '/assets/projects/Beraksi.png', '2025', 1
),
(
  'Campus & Organizational Activities',
  'Information Systems student, organizing tech events and campus initiatives at UPN Veteran Yogyakarta.',
  'FEATURED', '/assets/projects/Andika.png', '2025', 2
),
(
  'BNSP Network Engineer Certification',
  'Official Network Engineering competency assessment certified by BNSP Indonesia.',
  'CERTIFICATION', '/assets/projects/BNSP.jpg', '2025', 3
),
(
  'Google Project Management Scholar',
  'Participating in Google Project Management & Agile Sprint workshops, organized by KOMDIGI.',
  'COURSE', '/assets/projects/PM.png', '2025', 4
),
(
  'IBM Data Analytics Certification',
  'Hands-on data classification, governance, and analytical model building with IBM.',
  'DATA', '/assets/projects/IBM.png', '2025', 5
)
ON CONFLICT DO NOTHING;

-- Seed Capabilities
INSERT INTO public.capabilities (
  number_code, title, label, category, tagline, description, display_order
) VALUES
('01', 'UI/UX Design', 'UI/UX DESIGN', 'DESIGN & USER EXPERIENCE', 'User research, wireframing & interactive UI prototyping', 'Designing intuitive, user-centered interfaces by combining user research, persona mapping, wireframing, high-fidelity UI design, and comprehensive design systems.', 1),
('02', 'System Analyst', 'SYSTEM ANALYST', 'SYSTEM ARCHITECTURE & LOGIC', 'Requirement analysis, UML modeling & database schema design', 'Analyzing business requirements, mapping system logic, designing relational database schemas, creating UML diagrams, and structuring efficient software architecture.', 2),
('03', 'Web Development', 'WEB DEVELOPMENT', 'FULLSTACK WEB DEVELOPMENT', 'Building responsive, scalable web applications', 'Developing modern full-stack web applications using robust frameworks like Next.js, React, and Laravel with responsive UI, optimized APIs, and clean maintainable code.', 3),
('04', 'Mobile Development', 'MOBILE DEVELOPMENT', 'MOBILE APPLICATIONS', 'Designing & building intuitive mobile app experiences', 'Creating user-friendly mobile interfaces and application features with focus on smooth navigation, mobile UX patterns, and API integration.', 4),
('05', 'Network', 'NETWORK', 'NETWORK & INFRASTRUCTURE', 'Network fundamentals, configuration & troubleshooting', 'Understanding computer networking concepts, IP subnets, network security basics, server-client architecture, and system connectivity.', 5),
('06', 'Data Analyst & Data Science', 'DATA ANALYST & SCIENCE', 'DATA SCIENCE & ANALYTICS', 'Data visualization, statistical analysis & BI dashboards', 'Extracting insights from complex datasets using statistical modeling, SQL querying, data cleaning, and creating interactive Power BI dashboards for data-driven decisions.', 6),
('07', 'Software Quality Assurance', 'QUALITY ASSURANCE', 'QA & SYSTEM TESTING', 'Bug identification, test case design & quality validation', 'Executing manual and system testing, designing comprehensive test scenarios, identifying software bugs, and ensuring system reliability before deployment.', 7),
('08', 'Other (Business & Supply Chain)', 'BUSINESS & SUPPLY CHAIN', 'BUSINESS DIGITALIZATION & SUPPLY CHAIN', 'Business process optimization, supply chain & digital transformation', 'Analyzing business processes, supply chain management workflows, and implementing digital transformation solutions tailored to business strategy.', 8)
ON CONFLICT DO NOTHING;
