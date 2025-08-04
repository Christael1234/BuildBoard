# Portfolio Template Generator

A modern, responsive portfolio generator built with HTML, CSS, Bootstrap, and JavaScript that allows users to create professional portfolios and export them as PDF files.

## Features

### 🎨 **Multiple Themes & Layouts**
- **Color Themes**: Blue (default), Green, Red, Orange, Cyan, Dark
- **Layout Styles**: Modern, Classic, Minimal
- Real-time theme switching with live preview

### 📝 **Comprehensive Form Sections**
- **Personal Information**: Name, title, contact details, location, about me
- **Social Links**: LinkedIn, GitHub, Twitter, personal website
- **Skills**: Comma-separated skill tags with visual styling
- **Experience**: Dynamic job history with company, duration, location, and descriptions
- **Education**: Academic background with degree, institution, year, and GPA
- **Projects**: Portfolio projects with descriptions, URLs, and technologies used

### 👀 **Live Preview**
- Real-time preview as you type
- Responsive design that works on all devices
- Full-screen preview modal for detailed viewing

### 📄 **PDF Export**
- Generate professional PDF portfolios
- Custom styling optimized for print
- Automatic filename generation based on user's name
- High-quality export with proper formatting

### 🎯 **User Experience**
- Intuitive form interface with Bootstrap styling
- Dynamic content addition (add/remove experience, education, projects)
- Form validation with visual feedback
- Smooth animations and transitions
- Mobile-responsive design

## How to Use

### 1. **Setup**
Simply open `index.html` in your web browser. No server setup required!

### 2. **Fill Out Your Information**
- Start with your **Personal Information** (name and title are required)
- Add your **contact details** and **about me** section
- Include your **social media links**
- List your **skills** (comma-separated)

### 3. **Add Your Experience**
- Click "Add Experience" to add work history
- Fill in job title, company, duration, location, and description
- Remove entries using the red X button

### 4. **Add Education**
- Click "Add Education" to add academic background
- Include degree, institution, year, and optional GPA

### 5. **Add Projects**
- Click "Add Project" to showcase your work
- Include project name, URL, description, and technologies used

### 6. **Customize Appearance**
- Choose from 6 different color themes
- Select from 3 layout styles (Modern, Classic, Minimal)
- See changes instantly in the live preview

### 7. **Preview & Export**
- Use the "Preview" button for a full-screen view
- Click "Export Portfolio" to generate a PDF file
- The PDF will be automatically downloaded with your name

## File Structure

```
portfolio-generator/
├── index.html          # Main HTML file with form and preview
├── styles.css          # Custom CSS styles and themes
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

## Technologies Used

- **HTML5**: Semantic structure and form elements
- **CSS3**: Custom styling, animations, and responsive design
- **Bootstrap 5.3.0**: UI components and grid system
- **Font Awesome 6.0.0**: Icons for social links and UI elements
- **html2pdf.js**: PDF generation library
- **Vanilla JavaScript**: ES6+ features for dynamic functionality

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (not supported)

## Features in Detail

### Theme System
The generator includes 6 color themes that affect:
- Header background gradients
- Skill tag colors
- Section dividers
- Social link buttons
- Card border accents

### Layout Variations
- **Modern**: Full-width sections with gradient headers
- **Classic**: Clean, traditional layout with subtle styling
- **Minimal**: Simplified design with reduced padding and spacing

### PDF Export Features
- Optimized for A4 paper size
- High-quality image rendering
- Proper margins and spacing
- Print-friendly styling
- Automatic filename generation

### Form Validation
- Required field validation
- Visual feedback for invalid inputs
- Minimum data requirements for preview/export
- User-friendly error messages

## Customization

### Adding New Themes
To add a new theme, add CSS classes in `styles.css`:
```css
.theme-yourtheme .portfolio-section h2::after,
.theme-yourtheme .skill-tag,
.theme-yourtheme .experience-item-template {
    background: #yourcolor;
}
```

### Adding New Sections
To add new portfolio sections:
1. Add form fields in `index.html`
2. Update the `getFormData()` method in `script.js`
3. Add the section to `generatePortfolioHTML()`
4. Style the new section in `styles.css`

## Troubleshooting

### PDF Export Issues
- Ensure you have a stable internet connection (for CDN resources)
- Try using Chrome browser for best compatibility
- Check that you have sufficient data for export (name and title required)

### Preview Not Updating
- Make sure you've entered at least your name and title
- Check browser console for JavaScript errors
- Refresh the page if needed

### Styling Issues
- Clear browser cache if styles aren't loading
- Ensure all CDN links are accessible
- Check for ad blockers that might block external resources

## Contributing

Feel free to contribute to this project by:
- Adding new themes or layouts
- Improving the PDF export quality
- Adding new portfolio sections
- Enhancing the mobile experience
- Fixing bugs or improving performance

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure all files are in the same directory
3. Try opening in a different browser
4. Verify that JavaScript is enabled in your browser

---

**Happy Portfolio Building!** 🚀 