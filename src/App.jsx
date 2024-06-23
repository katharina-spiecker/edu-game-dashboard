import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import OverviewTopicsView from "./views/OverviewTopicsView.jsx";
import SingleTopicView from './views/SingleTopicView.jsx';
import Layout from "./Layout.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<OverviewTopicsView />} />
          <Route path="/edit-topic/:id" element={<SingleTopicView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}