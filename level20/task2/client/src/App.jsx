import React from 'react';
import SearchPage from './components/SearchPage';

const App = () => {
  return (
    <div style={{ backgroundImage: 'url("/bookshelf-bg.jpg")', backgroundSize: 'cover', minHeight: '100vh', paddingTop: '3rem' }}>
      <SearchPage />
    </div>
  );
};

export default App;
