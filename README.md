# Viu Thailand Prototype - Improved UX Design

This is a prototype redesign of Viu Thailand's streaming platform, focusing on improved user experience, personalization, and engagement metrics for A/B testing.

## 🎯 Project Goals

As a product manager, the goal is to improve the current interface to increase MAU (Monthly Active Users) and app stickiness through:

1. **Better Navigation** - Organized, column-based category structure
2. **Engaging Hero Section** - Video trailers instead of static images
3. **Netflix-style Personalization** - Recommended content, Top 10, and personalized rows
4. **Interactive Previews** - Hover-triggered teaser videos
5. **Streamlined Content Discovery** - Netflix-inspired modal for content details

## 🚀 Key Features Implemented

### 1. Reorganized Navigation
- **Before**: Random keywords without grouping
- **After**: 5 main categories with organized subcategories:
  - ซีรีส์ (Series)
  - รายการ (Shows)
  - ภาพยนตร์ (Movies)
  - หมวดหมู่พิเศษ (Special Categories)
  - ประเภท (Genres)

### 2. Hero Section with Video Trailer
- **Before**: Static images
- **After**: Auto-playing video trailers (placeholder ready for Supabase)
- Engaging visual content to pull users in

### 3. Personalized Homepage Rows
- **Recommended for You** - Based on user preferences
- **Top 10 This Month** - Popular content
- **Because You Watched...** - Personalized recommendations
- **Category-specific Rows** - Organized by interest

### 4. Hover Teaser Previews
- 1-second hover delay before showing teaser popup
- Mini preview window with content info
- Quick action buttons (Play, Add to List)

### 5. Netflix-style Content Modal
- Click to see full details
- Teaser video preview
- Episode list
- **Success Metric**: Click "Play" button = conversion

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm
- **Video Storage**: Supabase (ready for integration)

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the prototype.

## 🎨 Design Choices

### Color Scheme (Same as Original Viu)
- **Primary Gold**: `#FFBF00`
- **Background Dark**: `#000000`
- **Background**: `#1E1B16`
- **Text**: `#E9E1D8`

### Components
All components maintain Viu's original design language while improving UX patterns.

## 📊 A/B Testing & Success Metrics

### Success Metric: Video Play Click
When a user clicks the "Play" button (either from cards or modal), they're redirected to `/watch/[id]` - this is tracked as a successful conversion.

### Testing Focus
- Navigation discoverability
- Content engagement (hover interactions)
- Modal conversion rate (detail view → play)
- Hero section engagement

### Placeholder for Additional Tracking
You can integrate analytics tools to track:
- Hover events on content cards
- Modal open/close rates
- Category navigation usage
- Time spent on page

## 🎥 Supabase Video Integration

### Setup Instructions

1. **Install Supabase Client** (when ready)
```bash
pnpm add @supabase/supabase-js
```

2. **Configure Environment Variables**
```bash
cp .env.local.example .env.local
# Add your Supabase credentials
```

3. **Upload Videos to Supabase**
- Create a storage bucket named `viu-videos`
- Upload teaser videos (30 seconds each)
- Upload test clips (few seconds for testing)
- Naming convention: `{contentId}-teaser.mp4` or `{contentId}-episode-{number}.mp4`

4. **Update Components**
The video integration is ready in `lib/supabase.ts`. When Supabase is configured, videos will automatically load.

## 📁 Project Structure

```
├── app/
│   ├── page.tsx              # Homepage
│   ├── watch/[id]/           # Video player page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── navigation/           # Navigation component
│   ├── hero/                 # Hero section
│   ├── content/              # Content cards and rows
│   └── modal/                # Content detail modal
├── data/
│   └── mockData.ts           # Content data (scraped from Viu.th)
├── types/
│   └── index.ts              # TypeScript types
├── lib/
│   └── supabase.ts           # Supabase integration (placeholder)
└── public/                   # Static assets
```

## 👤 Mock User Persona

For personalization testing, a mock user profile is created:
- **Preferences**: Korean romance, LGBTQ+, Comedy
- **Recently Watched**: "Love Phobia", "Bad Buddy", "Love in the Air"
- **Content Types**: Korean series, Thai series

This drives the "Recommended for You" and "Because You Watched..." rows.

## 🎯 Improvements Over Original

| Feature | Original Viu | This Prototype |
|---------|-------------|----------------|
| Navigation | Flat list of random categories | Organized 5-column structure |
| Hero Section | Static images | Video trailers |
| Homepage Order | Random/unclear priority | Netflix-style (Recommended → Top 10 → Personalized) |
| Content Preview | Static thumbnails only | Hover = teaser popup (1s delay) |
| Content Details | Redirect to new page | Netflix-style modal overlay |
| Personalization | Generic categories | "Because you watched..." rows |

## 🧪 Testing the Prototype

### For User Interviews
1. Navigate the new menu structure
2. Hover over content cards (wait 1 second for teaser)
3. Click content to see modal
4. Click "Play" button (tracks conversion)

### For Eye Tracking
- Hero section engagement
- Navigation usage patterns
- Content card hover behavior
- Modal interaction flow

### For A/B Testing Metrics
- Track clicks on "Play" button
- Measure time to first content play
- Compare navigation usage vs. original
- Monitor hover interaction rates

## 📝 Notes for Product Testing

- All content is scraped from actual Viu Thailand
- Video placeholders are ready for Supabase integration
- Success metric is clearly marked in watch page
- Design maintains original Viu branding and styling

## 🚧 Future Enhancements

- [ ] Integrate actual Supabase video storage
- [ ] Add analytics tracking (Google Analytics, Mixpanel, etc.)
- [ ] Implement search functionality
- [ ] Add user authentication
- [ ] Create admin panel for content management
- [ ] Add more personalization algorithms
- [ ] Implement actual video player with controls

## 📄 License

This is a prototype for internal A/B testing and user research purposes.

---

**Built for**: Product Management A/B Testing
**Focus**: Improved UX, Personalization, Engagement Metrics
**Target Devices**: iPad and PC (Desktop)
