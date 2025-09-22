# Bad Brain Media Website

A modern, responsive website for Bad Brain Media - a specialist agency built for the creator economy.

## Features

- **Responsive Design**: Mobile-first approach with clean, modern aesthetics
- **Brand Identity**: Custom color scheme using Bad Brain's yellow (#F8F5D7) and blue (#507989)
- **Typography**: STIX Two Text font for professional, readable content
- **Interactive Elements**: Smooth animations and video integration
- **SEO Optimized**: Proper meta tags and structured content

## Pages

- **Homepage**: Hero section, about, services overview
- **Services**:
  - Consulting: Creator strategy and optimization
  - Studio: Integrated content production
  - Talent: Creator representation and development
- **Contact**: Get in touch information

## Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Font**: STIX Two Text (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:3002` (or next available port)

### Building for Production

```bash
# Build the project
npm run build

# Start production server
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Manual Deployment

```bash
# Build the project
npm run build

# The built files are in the .next folder
# Upload to your hosting provider
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── contact/           # Contact page
│   └── services/          # Services pages
│       ├── consulting/
│       ├── studio/
│       └── talent/
├── components/            # React components
│   ├── layout/           # Layout components (Nav, Footer)
│   ├── sections/         # Page sections
│   └── ui/               # UI components
public/
├── images/               # Static images
│   ├── logo/            # Brand logo
│   └── talent/          # Creator photos
```

## Brand Assets

- **Logo**: SVG format for scalability
- **Colors**:
  - Primary Yellow: #F8F5D7
  - Primary Blue: #507989
- **Font**: STIX Two Text (Regular 400, Semibold 600)
- **Creator Photos**: High-quality images of represented talent
- **Videos**: MP4 format for web optimization

## Content Management

All content is sourced from the Bad Brain Overview PDF and includes:

- Company description and mission
- Service offerings and descriptions
- Creator profiles and categories
- Contact information

## Performance

- **Static Generation**: All pages pre-rendered for fast loading
- **Image Optimization**: Next.js automatic image optimization
- **Bundle Size**: Optimized with Turbopack
- **Video Optimization**: Lazy loading and proper compression

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive enhancement approach

## Contact

For questions about this website, contact:
**info@badbrain.media**
