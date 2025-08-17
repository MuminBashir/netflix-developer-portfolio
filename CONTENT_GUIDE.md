# 📝 Content Management Guide

This guide explains how to customize your Netflix Portfolio with your own content using the static JSON data approach.

## 📁 Project Structure

```
src/
├── data/               # JSON data files
│   ├── profileBanner.json
│   ├── contactMe.json
│   ├── skills.json
│   ├── projects.json
│   ├── certifications.json
│   ├── timeline.json
│   ├── recommendations.json
│   ├── music.json
│   ├── blogs.json
│   └── reading.json
└── queries/            # Data fetching functions (unchanged)

public/
├── images/             # Your images
│   ├── banner-background.jpg
│   ├── profile-picture.jpg
│   └── projects/       # Project screenshots
│       ├── project1.jpg
│       ├── project2.jpg
│       └── ...
└── documents/          # Your documents
    └── resume.pdf
```

## 🔧 How to Update Your Content

### 1. Profile Banner (`src/data/profileBanner.json`)
Update your main banner information:
```json
{
  "backgroundImage": {
    "url": "/images/your-banner-bg.jpg"
  },
  "headline": "Your Professional Title",
  "resumeLink": {
    "url": "/documents/your-resume.pdf"
  },
  "linkedinLink": "https://linkedin.com/in/your-profile",
  "profileSummary": "Your compelling summary..."
}
```

### 2. Contact Information (`src/data/contactMe.json`)
Update your contact details:
```json
{
  "profilePicture": {
    "url": "/images/your-profile-pic.jpg"
  },
  "name": "Your Full Name",
  "title": "Your Job Title",
  "summary": "Brief about yourself...",
  "companyUniversity": "Current Company/University",
  "linkedinLink": "https://linkedin.com/in/your-profile",
  "email": "your.email@example.com",
  "phoneNumber": "+1 (555) 123-4567"
}
```

### 3. Skills (`src/data/skills.json`)
Add/modify your skills:
```json
[
  {
    "name": "React",
    "category": "Frontend",
    "description": "Your experience with React...",
    "icon": "FaReact"
  }
]
```

**Available Icon Names**: Check React Icons library for available icons (FaReact, FaNodeJs, SiTypescript, etc.)

### 4. Projects (`src/data/projects.json`)
Add your projects:
```json
[
  {
    "title": "Your Project Name",
    "description": "Project description...",
    "techUsed": "React, Node.js, AWS", // Comma-separated
    "image": {
      "url": "/images/projects/your-project.jpg"
    }
  }
]
```

### 5. Work Experience & Education (`src/data/timeline.json`)
Add your work and education history:
```json
[
  {
    "timelineType": "work", // or "education"
    "name": "Company/University Name",
    "title": "Your Position/Degree",
    "techStack": "Technologies used",
    "summaryPoints": [
      "Achievement 1",
      "Achievement 2",
      "Achievement 3"
    ],
    "dateRange": "Jan 2020 - Present"
  }
]
```

### 6. Certifications (`src/data/certifications.json`)
Add your certifications:
```json
[
  {
    "title": "Certification Name",
    "issuer": "Issuing Organization",
    "issuedDate": "2023-06-15",
    "link": "https://certification-url.com",
    "iconName": "FaAws" // Icon for the certification
  }
]
```

### 7. Recommendations (`src/data/recommendations.json`)
Add professional recommendations:
```json
[
  {
    "id": "rec1",
    "name": "Colleague Name",
    "title": "Job Title",
    "company": "Company Name",
    "date": "Date of recommendation",
    "profileImage": "/images/recommendations/person.jpg",
    "recommendation": [
      "Paragraph 1 of recommendation...",
      "Paragraph 2 of recommendation..."
    ]
  }
]
```

### 8. Music (`src/data/music.json`)
Share your music preferences:
```json
{
  "quote": "Your music quote",
  "favoriteGenres": ["Rock", "Jazz", "Electronic"],
  "favoriteAlbums": [
    {
      "title": "Album Title",
      "artist": "Artist Name",
      "image": "/images/music/album.jpg",
      "year": "Year",
      "genre": "Genre"
    }
  ],
  "currentlyListening": [
    {
      "title": "Song Title",
      "artist": "Artist",
      "album": "Album Name"
    }
  ]
}
```

### 9. Blogs (`src/data/blogs.json`)
Showcase your blog posts:
```json
[
  {
    "id": "blog1",
    "title": "Blog Post Title",
    "platform": "Medium", // or "Dev.to"
    "link": "https://link-to-blog-post.com",
    "description": "Brief description of the blog post",
    "publishedDate": "2024-01-15",
    "readTime": "5 min read",
    "tags": ["Tag1", "Tag2", "Tag3"]
  }
]
```

### 10. Reading (`src/data/reading.json`)
Share books that influenced you:
```json
[
  {
    "id": "book1",
    "title": "Book Title",
    "author": "Author Name",
    "image": "/images/books/book-cover.jpg",
    "description": "What the book is about",
    "category": "Self-Help", // or "Technology", "Fiction", etc.
    "rating": 5, // 1-5 stars
    "dateRead": "2024-01-15",
    "keyTakeaways": [
      "Key learning 1",
      "Key learning 2"
    ]
  }
]
```

## 🖼️ Adding Images and Files

### Images
1. Place your images in the `public/images/` directory
2. Use the path `/images/filename.jpg` in your JSON files
3. Recommended sizes:
   - Banner background: 1920x1080px
   - Profile picture: 400x400px (square)
   - Project images: 800x600px or 16:9 aspect ratio

### Documents
1. Place PDFs and documents in `public/documents/`
2. Use the path `/documents/filename.pdf` in your JSON files

## 🚀 Running the Project

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

3. The app will run on `http://localhost:3000`

## 🎨 Customizing Tech Icons

The project uses React Icons. To add new technology icons:

1. Go to [React Icons](https://react-icons.github.io/react-icons/)
2. Find your desired icon
3. Use the icon name in your `skills.json` or `certifications.json`
4. If the icon isn't supported, you may need to update the icon mapping in the component files

## 📝 Tips for Content

### Writing Effective Descriptions
- **Projects**: Focus on what problem it solves and impact
- **Skills**: Mention specific experience level and use cases
- **Timeline**: Use action verbs and quantify achievements when possible

### Image Guidelines
- Use high-quality, professional images
- Maintain consistent aspect ratios for projects
- Optimize images for web (compress to reduce file size)

### Tech Stack Format
- Use comma-separated values: "React, Node.js, AWS"
- Be consistent with naming (e.g., "React" not "ReactJS")
- Match the names with available icons when possible

## 🔧 Making Advanced Changes

If you want to add new data fields:
1. Update the corresponding JSON file
2. Update the TypeScript interface in `src/types.ts`
3. Update the component that displays the data
4. The query functions will automatically pick up new fields

## 🚀 Deployment

The portfolio can be deployed to any static hosting service:
- **Netlify**: Connect your GitHub repo for automatic deployments
- **Vercel**: Simple deployment with GitHub integration
- **AWS S3**: Static website hosting
- **GitHub Pages**: Free hosting for public repositories

Remember to build the project before deployment:
```bash
npm run build
```

---

## 📋 Quick Checklist

- [ ] Update profile banner with your info
- [ ] Add your profile picture and banner background
- [ ] Update contact information
- [ ] Add your skills (minimum 5-8)
- [ ] Add your projects with screenshots (minimum 3-4)
- [ ] Add work experience and education
- [ ] Add certifications
- [ ] Upload your resume PDF
- [ ] Test locally
- [ ] Deploy to your hosting platform

Your portfolio is now ready to showcase your amazing work! 🎉
