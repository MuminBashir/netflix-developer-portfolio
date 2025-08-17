// types.ts

export interface ProfileBanner {
  backgroundImage: { url: string };
  headline: string;
  resumeLink: {
    url: string;
  };
  linkedinLink: string;
  profileSummary: string;
}

export interface TimelineItem {
  timelineType: "work" | "education";
  name: string;
  title: string;
  techStack: string;
  summaryPoints: string[];
  dateRange: string;
}

export interface Project {
  title: string;
  description: string;
  techUsed: string;
  image: { url: string };
  link: string;
}

export interface Certification {
  title: string;
  issuer: string;
  issuedDate: string;
  link: string;
  iconName: string;
}

export interface ContactMe {
  profilePicture: { url: string };
  name: string;
  title: string;
  summary: string;
  companyUniversity: string;
  linkedinLink: string;
  email: string;
  phoneNumber: string;
}

export interface Skill {
  name: string;
  category: string;
  description: string;
  icon: string;
}

export interface Recommendation {
  id: string;
  name: string;
  title: string;
  company: string;
  date: string;
  profileImage: string;
  recommendation: string[];
}

export interface Song {
  title: string;
  artist: string;
  musicLink: string;
  album?: string;
  year?: string;
  image?: string;
}

export interface Album {
  title: string;
  artist: string;
  image: string;
  year: string;
  genre: string;
  songs: Song[];
}

export interface MusicData {
  quote: string;
  favoriteGenres: string[];
  favoriteMusics: Song[];
  playlist: { [genre: string]: Song[] };
}

export interface Blog {
  id: string;
  title: string;
  platform: string;
  link: string;
  description: string;
  publishedDate: string;
  readTime: string;
  tags: string[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  image: string;
  description: string;
  category: string;
  rating: number;
  keyTakeaways: string[];
}
