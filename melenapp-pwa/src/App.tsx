// src/App.tsx
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import { useIsAuthenticated } from '@azure/msal-react';
import NavigationBar from './components/NavigationBar';
import ExerciseEditor from './components/ExerciseEditor';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ListPage from './pages/ListPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ExercisePage from './pages/ExercisePage';
import CategoryExerciseList from './pages/CategoryExerciseList';
// import RequireAuth from './components/RequireAuth';

const App: React.FC = () => {
//   const isAuthenticated = useIsAuthenticated();

  return (
    <BrowserRouter>
      {/* {isAuthenticated && <NavigationBar />} */}
      <NavigationBar />
      <Routes>
        <Route
          path="/"
          element={
            // <RequireAuth>
              <HomePage />
            // </RequireAuth>
          }
        />

        <Route
          path="/profile"
          element={
            // <RequireAuth>
              <ProfilePage />
            // </RequireAuth>
          }
        />
        <Route
          path="/list"
          element={
            // <RequireAuth>
              <ListPage />
            // </RequireAuth>
          }
        />
        <Route path="/exercises/*" element={<CategoryExerciseList />} />
        <Route path="/exercise/:id" element={<ExercisePage />} />
        <Route path="/editor/:id" element={<ExerciseEditor />} />
        <Route path="/editor" element={<ExerciseEditor />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
