import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0);

  const setProgressValue = (progress) => {
    setProgress(progress);
  };

  const pageSize = 9;

  return (
    <Router>
      <div>
        <LoadingBar
          transitionTime={10}
          color='#f11946'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgressValue} apiKey={apiKey} key='home' country='in' pageSize={pageSize} category='general' />} />
          <Route exact path="/health" element={<News setProgress={setProgressValue} apiKey={apiKey} key="health" country='in' pageSize={pageSize} category='health' />} />
          <Route exact path="/sports" element={<News setProgress={setProgressValue} apiKey={apiKey} key="sports" country='in' pageSize={pageSize} category='sports' />} />
          <Route exact path="/general" element={<News setProgress={setProgressValue} apiKey={apiKey} key="general" country='in' pageSize={pageSize} category='general' />} />
          <Route exact path="/science" element={<News setProgress={setProgressValue} apiKey={apiKey} key="science" country='in' pageSize={pageSize} category='science' />} />
          <Route exact path="/business" element={<News setProgress={setProgressValue} apiKey={apiKey} key="business" country='in' pageSize={pageSize} category='business' />} />
          <Route exact path="/technology" element={<News setProgress={setProgressValue} apiKey={apiKey} key="technology" country='in' pageSize={pageSize} category='technology' />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgressValue} apiKey={apiKey} key="entertainment" country='in' pageSize={pageSize} category='entertainment' />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;