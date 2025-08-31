# Monitoring and Analytics Setup

This document describes the monitoring and analytics features implemented in the a-el-key мебели application.

## Features Implemented

### 1. Google Analytics Integration

- **Component**: `src/components/Analytics.tsx`
- **Configuration**: Set `NEXT_PUBLIC_GA_ID` environment variable
- **Features**:
  - Page view tracking
  - Custom event tracking
  - Core Web Vitals tracking

### 2. Performance Monitoring

- **Component**: `src/components/PerformanceMonitor.tsx`
- **Features**:
  - Core Web Vitals tracking (CLS, FID, FCP, LCP, TTFB)
  - Page load time monitoring
  - Resource loading performance tracking
  - Error boundary for React errors

### 3. Health Check Endpoint

- **Endpoint**: `/api/health`
- **Features**:
  - System status monitoring
  - Uptime tracking
  - Environment information
  - Version information

### 4. Monitoring Dashboard

- **Component**: `src/components/MonitoringDashboard.tsx`
- **Location**: Admin panel (`/admin`)
- **Features**:
  - Real-time system status
  - Uptime display
  - Environment and version info
  - Auto-refresh every 30 seconds

### 5. SEO and Sitemap

- **Sitemap**: `/sitemap.xml` (auto-generated)
- **Robots**: `/robots.txt` (auto-generated)
- **Features**:
  - Dynamic sitemap generation
  - SEO-friendly URL structure
  - Search engine optimization

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# UploadThing
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id

# Convex
CONVEX_DEPLOYMENT=your_convex_deployment
NEXT_PUBLIC_CONVEX_URL=your_convex_url
```

## Usage

### Analytics

Analytics are automatically initialized when the `NEXT_PUBLIC_GA_ID` environment variable is set.

### Performance Monitoring

Performance monitoring is automatically active and tracks:

- Core Web Vitals
- Page load times
- Resource loading performance
- JavaScript errors

### Health Monitoring

Access the health check endpoint at `/api/health` for system status.

### Admin Dashboard

Visit `/admin` to see the monitoring dashboard with real-time system information.

## Dependencies

The following packages are used for monitoring:

- `web-vitals` - Core Web Vitals tracking
- `next/script` - Google Analytics integration
- Built-in Next.js performance APIs

## Production Considerations

1. **Google Analytics**: Set up proper GA4 property and configure conversion tracking
2. **Error Tracking**: Consider integrating with Sentry or similar service for production error tracking
3. **Performance**: Monitor Core Web Vitals in production and set up alerts
4. **Health Checks**: Set up external monitoring services to ping the `/api/health` endpoint
5. **Logging**: Implement proper logging for production debugging

## Security

- Admin monitoring dashboard is accessible at `/admin` - ensure proper authentication
- Health check endpoint is public but only returns basic system information
- Analytics data is sent to Google Analytics (configure privacy settings as needed)
