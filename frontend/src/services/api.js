const API_BASE = 'http://localhost:3000/api';

export const fetchUser = async () => {
  const response = await fetch(`${API_BASE}/user`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

export const fetchCourses = async () => {
  const response = await fetch(`${API_BASE}/courses`);
  if (!response.ok) throw new Error('Failed to fetch courses');
  return response.json();
};

export const fetchAssignments = async () => {
  const response = await fetch(`${API_BASE}/assignments`);
  if (!response.ok) throw new Error('Failed to fetch assignments');
  return response.json();
};

export const fetchUpcomingDeadlines = async () => {
  const response = await fetch(`${API_BASE}/upcoming-deadlines`);
  if (!response.ok) throw new Error('Failed to fetch upcoming deadlines');
  return response.json();
};

export const fetchRecentActivity = async () => {
  const response = await fetch(`${API_BASE}/recent-activity`);
  if (!response.ok) throw new Error('Failed to fetch recent activity');
  return response.json();
};

export const fetchCommunityPosts = async () => {
  const response = await fetch(`${API_BASE}/community-posts`);
  if (!response.ok) throw new Error('Failed to fetch community posts');
  return response.json();
};

export const fetchExams = async () => {
  const response = await fetch(`${API_BASE}/exams`);
  if (!response.ok) throw new Error('Failed to fetch exams');
  return response.json();
};