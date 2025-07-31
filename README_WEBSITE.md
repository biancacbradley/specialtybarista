# Specialty Barista - Coffee Training Website

A responsive website for specialty coffee barista online training.

## Design Specifications

- **Main Heading Font**: Krona One
- **Body Text Font**: Inter (paragraphs, subtitles, buttons)
- **Font Color**: #FAFAFA
- **Desktop Width**: 1440px
- **Hero Section Height**: 693px

## Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── assets/
    └── images/         # Image assets folder
```

## Features

- ✅ Responsive navigation bar
- ✅ Hero section with placeholder for background image
- ✅ Google Fonts integration (Krona One & Inter)
- ✅ Smooth scroll preparation
- ✅ Mobile responsive design
- ✅ Hover effects and animations

## Development

### Running the Website

You can run this website using any local server. Here are a few options:

**Option 1: Python (if installed)**
```bash
# Python 3
python -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000
```

**Option 2: Node.js http-server (if installed)**
```bash
npx http-server -p 3000
```

**Option 3: Live Server (VS Code extension)**
- Install "Live Server" extension in VS Code
- Right-click on `index.html` and select "Open with Live Server"

### Adding the Hero Background Image

1. Place your hero image in the `assets/images/` folder
2. Update the CSS in `styles.css`:
   ```css
   .hero-image-placeholder {
       background: url('assets/images/your-image.jpg') center center/cover no-repeat;
   }
   ```
3. Or use the JavaScript function:
   ```javascript
   replaceHeroImage('assets/images/your-image.jpg');
   ```

## Next Development Steps

- [ ] Add more sections (About, Services, Courses, etc.)
- [ ] Replace image placeholder with actual hero image
- [ ] Add content sections
- [ ] Implement contact form
- [ ] Add course catalog
- [ ] Optimize for performance

## Responsive Breakpoints

- Desktop: 1440px and above
- Tablet: 768px - 1199px
- Mobile: 320px - 767px