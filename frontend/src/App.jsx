import React, { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { MyCourses } from './pages/MyCourses';
import { Assignments } from './pages/Assignments';
import { Exams } from './pages/Exams';
import { Community } from './pages/Community';
import { Settings } from './pages/Settings';
import { VideoPlayer } from './components/learning/VideoPlayer';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Handle nested view for course player
  const renderContent = () => {
    if (selectedCourse) {
      return (
        <VideoPlayer 
          course={selectedCourse} 
          onBack={() => setSelectedCourse(null)} 
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onCourseClick={(course) => setSelectedCourse(course)} />;
      case 'courses':
        return <MyCourses onCourseClick={(course) => setSelectedCourse(course)} />;
      case 'assignments':
        return <Assignments />;
      case 'exams':
        return <Exams />;
      case 'community':
        return <Community />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onCourseClick={(course) => setSelectedCourse(course)} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;
