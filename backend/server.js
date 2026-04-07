const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mock data
const mockUser = {
  name: "Abdelouaheb",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abdelouaheb",
  progress: 75,
  weeklyGoal: "75% of Weekly Goal reached",
  stats: {
    hoursStudied: 124,
    certificates: 12,
    streak: 15
  }
};

const courses = [
  {
    id: 1,
    title: "Advanced React Patterns",
    instructor: "Sarah Drasner",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
    progress: 85,
    timeRemaining: "2h 45m remaining",
    category: "Development",
    level: "Advanced",
    lessons: [
      { id: 1, title: "Higher Order Components", duration: "12:45", completed: true },
      { id: 2, title: "Render Props vs Hooks", duration: "18:20", completed: true },
      { id: 3, title: "Advanced State Management", duration: "25:10", completed: false },
    ]
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    instructor: "Gary Simon",
    thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800&auto=format&fit=crop",
    progress: 45,
    timeRemaining: "8h 15m remaining",
    category: "Design",
    level: "Intermediate",
    lessons: [
      { id: 1, title: "Introduction to Figma", duration: "15:00", completed: true },
      { id: 2, title: "Typography & Color", duration: "22:30", completed: false },
    ]
  },
  {
    id: 3,
    title: "Fullstack Next.js Guide",
    instructor: "Josh Comeau",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop",
    progress: 10,
    timeRemaining: "15h 30m remaining",
    category: "Development",
    level: "All Levels",
    lessons: [
      { id: 1, title: "Server Side Rendering", duration: "30:00", completed: false },
    ]
  },
  {
    id: 4,
    title: "Modern Tailwind CSS",
    instructor: "Adam Wathan",
    thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop",
    progress: 0,
    timeRemaining: "4h 00m remaining",
    category: "Design",
    level: "Beginner",
    lessons: [
      { id: 1, title: "Utility First Workflows", duration: "20:00", completed: false },
    ]
  }
];

const assignments = [
  { id: "ASM-001", title: "React State Management", course: "Advanced React Patterns", dueDate: "2026-03-27", status: "In Progress", grade: "-" },
  { id: "ASM-002", title: "Figma Prototype", course: "UI/UX Design Masterclass", dueDate: "2026-03-29", status: "Pending", grade: "-" },
  { id: "ASM-003", title: "API Integration", course: "Fullstack Next.js Guide", dueDate: "2026-03-25", status: "Submitted", grade: "94/100" },
  { id: "ASM-004", title: "Vercel Deployment", course: "Fullstack Next.js Guide", dueDate: "2026-03-20", status: "Graded", grade: "100/100" },
];

const upcomingDeadlines = [
  { id: 1, title: "React Assignment #4", date: "Tomorrow, 11:59 PM", type: "Assignment", urgent: true },
  { id: 2, title: "UX Design Quiz", date: "Friday, 2:00 PM", type: "Quiz", urgent: false },
  { id: 3, title: "Project Proposal", date: "Next Monday", type: "Project", urgent: false },
];

const recentActivity = [
  { id: 1, text: "Completed 'Higher Order Components'", time: "2 hours ago" },
  { id: 2, text: "Earned 'React Specialist' badge", time: "5 hours ago" },
  { id: 3, text: "Joined 'Advanced Frontend' community", time: "Yesterday" },
];

const communityPosts = [
  { id: 1, user: "Alex Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", content: "Just finished the Next.js module! The server actions part was tricky but so powerful.", likes: 24, comments: 5, time: "1 hour ago" },
  { id: 2, user: "Elena Rodriguez", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena", content: "Does anyone have good resources for advanced Figma prototyping? Stumbling on some complex transitions.", likes: 12, comments: 8, time: "3 hours ago" },
  { id: 3, user: "Michael Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael", content: "Sharing my final project for the UI/UX class. Feedback is welcome!", likes: 45, comments: 12, time: "5 hours ago" },
];

const exams = [
  { id: 1, title: "React Fundamentals Final", date: "2026-04-05", duration: "120m", type: "Multiple Choice", status: "Upcoming" },
  { id: 2, title: "Design Principles Midterm", date: "2026-03-30", duration: "90m", type: "Practical", status: "Scheduled" },
  { id: 3, title: "Node.js Basic Auth", date: "2026-03-15", duration: "60m", type: "Programming", status: "Completed", score: "88%" },
];

// Routes
app.get('/api/user', (req, res) => {
  res.json(mockUser);
});

app.get('/api/courses', (req, res) => {
  res.json(courses);
});

app.get('/api/assignments', (req, res) => {
  res.json(assignments);
});

app.get('/api/upcoming-deadlines', (req, res) => {
  res.json(upcomingDeadlines);
});

app.get('/api/recent-activity', (req, res) => {
  res.json(recentActivity);
});

app.get('/api/community-posts', (req, res) => {
  res.json(communityPosts);
});

app.get('/api/exams', (req, res) => {
  res.json(exams);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});