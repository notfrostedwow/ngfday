# 💕 Romantic National Girlfriend Day Website

A beautiful, interactive website created for National Girlfriend Day featuring a pink theme, romantic animations, and a special envelope reveal experience.

## ✨ Features

- **Romantic Pink Theme**: Beautiful gradient backgrounds and pink color palette
- **Background Music**: Automatic romantic music playback (with fallback controls)
- **Interactive Envelope**: Fun "Do you want to open it?" interaction with animations
- **Photo Gallery**: Responsive photo display with automatic resizing
- **Love Letter**: Beautiful typography for your romantic message
- **Mobile Responsive**: Works perfectly on all devices
- **Smooth Animations**: Floating hearts, sparkles, and elegant transitions

## 🚀 Getting Started

1. **Open the website**: Simply open `index.html` in any modern web browser
2. **Add your photos**: Place your photos in `assets/images/` folder:
   - `photo1.jpg` (or .png, .webp)
   - `photo2.jpg` (or .png, .webp)
   - `photo3.jpg` (or .png, .webp)
3. **Add music** (optional): Place your romantic music file as `assets/music/romantic-background.mp3`

## 📱 How It Works

1. **Landing Page**: Welcome screen with floating hearts and romantic message
2. **Envelope Page**: Interactive envelope with Yes/No buttons
   - Clicking "No" shows "Wrong answer, retry!" 
   - Clicking "Yes" opens the envelope with animation
3. **Photos & Letter Page**: Beautiful gallery of your memories plus love letter

## 🎵 Music Setup

- Add your romantic background music as `romantic-background.mp3` in the `assets/music/` folder
- Supported formats: MP3, OGG, WAV
- The music will automatically loop and continue across all pages
- If no music file is found, the site works perfectly without it

## 📸 Photo Setup

- Photos are automatically resized and optimized for display
- Supports JPG, PNG, WebP, and GIF formats
- Different resolutions are handled automatically
- Shows beautiful placeholders if photos are missing
- Recommended size: 400x300 to 2000x1500 pixels

## 🌟 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 💝 Customization

### Changing the Love Letter
Edit the text in the `letter-container` section of `index.html`

### Adding More Photos
1. Add more `photo-frame` divs in the HTML
2. Update the CSS grid if needed
3. Place additional photos in the `assets/images/` folder

### Changing Colors
Modify the CSS color variables in `styles.css`:
```css
:root {
    --primary-pink: #FF69B4;
    --light-pink: #FFB6C1;
    --deep-pink: #FF1493;
    /* ... etc */
}
```

## 🎉 Perfect For

- National Girlfriend Day (August 1st)
- Valentine's Day
- Anniversaries
- Birthday surprises
- Just because you love her! 💕

## 📝 Technical Details

- Pure HTML5, CSS3, and JavaScript (no frameworks required)
- Responsive design with CSS Grid and Flexbox
- CSS animations and transitions
- HTML5 Audio API for music
- Cross-browser compatibility
- Mobile-optimized touch interactions
- Graceful degradation for older browsers

---

Made with 💕 for the most special person in your life!