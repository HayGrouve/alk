# a-el-key Furniture Website - Research Insights & Recommendations

## Market Research Insights

### Bulgarian Furniture Market Trends

Based on current market research, here are key insights for the a-el-key furniture website:

#### 1. **Local Market Preferences**

- **Custom furniture demand** is growing in Sofia region due to unique apartment layouts
- **Quality over quantity** approach resonates with Bulgarian middle-class consumers
- **Local craftsmanship** is highly valued, especially for traditional Bulgarian homes
- **Price sensitivity** is important - customers want value for money

#### 2. **Digital Behavior Patterns**

- **Mobile-first usage** - 70%+ of furniture research happens on mobile devices
- **Visual content preference** - High-quality images are crucial for furniture sales
- **Local search dominance** - "мебели София" and location-based searches are primary
- **Social proof importance** - Customer photos and testimonials drive decisions

### Competitive Analysis

#### Local Competitors

- **IKEA Bulgaria** - Mass market, low prices
- **JYSK** - Affordable furniture with some customization
- **Local workshops** - Often lack strong online presence

#### Competitive Advantages for a-el-key

- **Personal touch** - One craftsman, personal service
- **Custom solutions** - Tailored to specific spaces
- **Quality materials** - Hand-selected wood and hardware
- **Local expertise** - Understanding of Bulgarian home layouts

## Technical Recommendations

### 1. **Color Scheme & Branding**

#### Brand Colors

- **Primary Color:** Dark Blue (#003C70) - Used for headers, navigation, primary buttons, and main UI elements
- **Accent Color:** Green (#5EB665) - Used for call-to-action buttons, highlights, hover states, and success messages

#### Color Usage Guidelines

```css
/* Primary Color Applications */
.header,
.navigation,
.primary-button {
  background-color: #003c70;
  color: white;
}

/* Accent Color Applications */
.cta-button,
.highlight,
.success-message {
  background-color: #5eb665;
  color: white;
}

/* Hover States */
.primary-button:hover {
  background-color: #002a4f; /* Darker shade of primary */
}

.cta-button:hover {
  background-color: #4a9a51; /* Darker shade of accent */
}
```

### 2. **Image Optimization Strategy**

#### UploadThing Integration Benefits

- **CDN delivery** for fast global image loading
- **Automatic optimization** with multiple format support
- **Dashboard management** for easy content updates
- **Bandwidth efficiency** with smart compression

#### Recommended Image Specifications

```
Hero Carousel: 1920x1080px, WebP format, 80% quality
Gallery Images: 1200x800px, WebP format, 85% quality
Thumbnails: 400x300px, WebP format, 75% quality
```

### 2. **Page Flip Animation Implementation**

#### Technical Approach

- **CSS Transforms** for smooth 3D page flip effect
- **Intersection Observer** for performance optimization
- **Touch gesture support** for mobile devices
- **Reduced motion respect** for accessibility

#### Animation Specifications

```css
/* Recommended animation timing */
.page-flip {
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

/* Mobile-optimized timing */
@media (max-width: 768px) {
  .page-flip {
    transition: transform 0.6s ease-out;
  }
}
```

### 3. **SEO Strategy for Bulgarian Market**

#### Local SEO Optimization

- **Google My Business** integration
- **Local schema markup** for workshop location
- **Bulgarian language meta tags**
- **Location-based keywords** in content

#### Recommended Keywords

```
Primary: мебели на поръчка София
Secondary: дървени мебели, кухненски мебели
Long-tail: майстор мебелист Нови Искър
```

## User Experience Enhancements

### 1. **Gallery User Experience**

#### Advanced Filtering System

```typescript
interface GalleryFilter {
  category:
    | "антре"
    | "гардероб"
    | "детска стая"
    | "кухня"
    | "спалня"
    | "тоалетка"
    | "шкаф";
  material: "дърво" | "МДФ" | "ламинат" | "всички";
  priceRange: "до 1000лв" | "1000-3000лв" | "3000лв+";
  style: "модерен" | "класически" | "индустриален" | "всички";
}
```

#### Lightbox Features

- **Zoom functionality** for detail viewing
- **Image metadata display** (materials, dimensions, year)
- **Social sharing buttons**
- **Keyboard navigation** (arrow keys, escape)

### 2. **Contact Form Optimization**

#### Smart Form Features

- **Progressive disclosure** - show relevant fields based on project type
- **Auto-save functionality** to prevent data loss
- **File upload** for reference images
- **Viber integration** for immediate contact

#### Form Validation

```typescript
const contactFormSchema = z.object({
  name: z.string().min(2, "Името трябва да е поне 2 символа"),
  email: z.string().email("Невалиден имейл адрес"),
  phone: z.string().optional(),
  projectType: z.enum([
    "антре",
    "гардероб",
    "детска стая",
    "кухня",
    "спалня",
    "тоалетка",
    "шкаф",
  ]),
  budget: z.enum(["до 1000лв", "1000-3000лв", "3000-5000лв", "5000лв+"]),
  message: z.string().min(10, "Съобщението трябва да е поне 10 символа"),
});
```

## Performance Optimization

### 1. **Core Web Vitals Targets**

#### Loading Performance

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

#### Implementation Strategy

```typescript
// Next.js Image optimization
import Image from 'next/image';

<Image
  src={furnitureImage}
  alt="a-el-key мебели - кухненски гарнитур"
  width={1200}
  height={800}
  priority={isHeroImage}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 2. **Mobile Performance**

#### Touch Optimization

- **44px minimum touch targets**
- **Swipe gestures** for carousel navigation
- **Pull-to-refresh** for gallery updates
- **Haptic feedback** for interactions (where supported)

## Content Strategy Recommendations

### 1. **Storytelling Approach**

#### Brand Narrative

- **Craftsman's journey** - from apprentice to master
- **Workshop stories** - behind-the-scenes content
- **Customer success stories** - before/after transformations
- **Material selection process** - why certain woods are chosen

#### Content Structure

```
Homepage: Brand story + hero showcase
Gallery: Organized by room type with detailed descriptions
About: Craftsman's background and workshop
Contact: Multiple contact methods with response expectations
FAQ: Common questions with detailed, helpful answers
```

### 2. **Visual Content Strategy**

#### Photography Guidelines

- **Natural lighting** preferred over studio lighting
- **Context shots** showing furniture in real homes
- **Detail shots** highlighting craftsmanship
- **Before/after comparisons** when possible

#### Image Metadata

```typescript
interface FurnitureImage {
  url: string;
  alt: string;
  category: string;
  materials: string[];
  dimensions: string;
  yearCreated: number;
  specialFeatures: string[];
  customerLocation?: string; // for privacy
}
```

## Technical Implementation Details

### 1. **UploadThing Setup**

#### File Router Configuration

```typescript
// app/api/uploadthing/core.ts
export const ourFileRouter = {
  furnitureImages: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 10,
    },
  })
    .middleware(async ({ req }) => {
      // Optional: Add authentication for admin uploads
      return { uploadedBy: "admin" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Store image metadata in database
      await saveImageMetadata({
        url: file.url,
        name: file.name,
        size: file.size,
        uploadedBy: metadata.uploadedBy,
      });
    }),
} satisfies FileRouter;
```

### 2. **Gallery Implementation**

#### Category-based Organization

```typescript
const galleryCategories = {
  антре: {
    title: "Антре мебели",
    description: "Функционални и красиви мебели за входно помещение",
    icon: "EntranceIcon",
  },
  гардероб: {
    title: "Гардероби",
    description: "Просторни и функционални гардероби по поръчка",
    icon: "WardrobeIcon",
  },
  "детска стая": {
    title: "Детски мебели",
    description: "Безопасни и красиви мебели за детска стая",
    icon: "ChildrenRoomIcon",
  },
  кухня: {
    title: "Кухненски мебели",
    description: "Функционални и красиви кухни, изработени по поръчка",
    icon: "KitchenIcon",
  },
  спалня: {
    title: "Спални мебели",
    description: "Спални гарнитури и индивидуални мебели за спалня",
    icon: "BedroomIcon",
  },
  тоалетка: {
    title: "Тоалетки",
    description: "Елегантни тоалетки с огледала и скрити отделения",
    icon: "DressingTableIcon",
  },
  шкаф: {
    title: "Шкафове",
    description: "Просторни шкафове за различни помещения",
    icon: "CabinetIcon",
  },
};
```

### 3. **SEO Implementation**

#### Structured Data

```typescript
const furnitureStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "a-el-key Мебели",
  description: "Ръчно изработени мебели на поръчка в София",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Нови Искър",
    addressRegion: "София",
    addressCountry: "BG",
  },
  telephone: "+359-XXX-XXXX",
  url: "https://www.a-el-key.com",
  priceRange: "$$",
  servedArea: "София и околностите",
};
```

## Launch Strategy

### 1. **Pre-Launch Checklist**

#### Technical Readiness

- [ ] All pages load under 3 seconds
- [ ] Mobile responsiveness tested
- [ ] SEO meta tags implemented
- [ ] Analytics tracking configured
- [ ] Contact form tested and working
- [ ] Image optimization completed

#### Content Readiness

- [ ] 20+ gallery images uploaded and categorized
- [ ] Hero carousel images selected and optimized
- [ ] Contact information verified
- [ ] FAQ content written and reviewed
- [ ] Bulgarian language proofreading completed

### 2. **Post-Launch Monitoring**

#### Key Metrics to Track

- **Contact form submissions** (primary KPI)
- **Gallery page engagement** (time spent, images viewed)
- **Mobile vs desktop traffic** (should be 60%+ mobile)
- **Local search visibility** (rankings for target keywords)
- **Page load speeds** (Core Web Vitals)

#### Monthly Review Items

- **Content updates** - new furniture pieces to showcase
- **SEO performance** - keyword rankings and traffic
- **User feedback** - contact form responses and inquiries
- **Technical performance** - speed and uptime monitoring

## Future Enhancement Opportunities

### Phase 2 Features (3-6 months post-launch)

#### Customer Engagement

- **Testimonials section** with customer photos
- **Project timeline showcase** - from design to completion
- **Material selection guide** - helping customers choose
- **Virtual consultation booking** - calendar integration

#### Advanced Functionality

- **3D furniture preview** - basic visualization tool
- **Quote calculator** - rough pricing based on dimensions
- **Social media integration** - Instagram feed of latest work
- **Email newsletter** - monthly updates and tips

### Long-term Vision (6-12 months)

#### Business Growth Features

- **Customer portal** - project tracking and communication
- **Online catalog** - downloadable PDF catalogs
- **Multi-language support** - English for international customers
- **E-commerce integration** - for smaller, standard items

## Conclusion

This research provides a comprehensive foundation for building a successful marketing website for a-el-key furniture. The focus on local SEO, mobile optimization, and high-quality visual content will help establish a strong online presence in the Bulgarian furniture market.

The technical recommendations ensure the website will perform well across all devices while providing an engaging user experience that converts visitors into customers. The phased approach allows for iterative improvement based on real user feedback and business growth.
