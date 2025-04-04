import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogList from "./components/BlogList";
import BlogPost from "./components/BlogPost";
import NotFound from "./components/NotFound";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/post/:id" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
