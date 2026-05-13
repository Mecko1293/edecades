import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Decades from './pages/Decades';
import DecadeDetail from './pages/DecadeDetail';
import Categories from './pages/Categories';
import Music from './pages/Music';
import Sports from './pages/Sports';
import Trivia from './pages/Trivia';
import OnThisDay from './pages/OnThisDay';
import TimeCapsule from './pages/TimeCapsule';
import Search from './pages/Search';
import DirectorySubmit from './pages/DirectorySubmit';
import VideoShorts from './pages/VideoShorts';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Presidents from './pages/Presidents';
import HistoricalChat from './pages/HistoricalChat';
import DecadeStats from './pages/DecadeStats';

function NotFound() {
  return (
    <div className="text-center py-24 text-gray-400">
      <svg className="w-16 h-16 text-rose-gold/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 className="font-retro text-3xl text-white mb-2">Page Not Found</h2>
      <p className="mb-6">This moment in time doesn't exist — yet.</p>
      <a href="/" className="text-rose-gold underline">Return home</a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/decades" element={<Decades />} />
        <Route path="/decade/:id" element={<DecadeDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/music" element={<Music />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/trivia" element={<Trivia />} />
        <Route path="/onthisday" element={<OnThisDay />} />
        <Route path="/timecapsule" element={<TimeCapsule />} />
        <Route path="/search" element={<Search />} />
        <Route path="/shorts" element={<VideoShorts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/directory" element={<DirectorySubmit />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/presidents" element={<Presidents />} />
        <Route path="/chat" element={<HistoricalChat />} />
        <Route path="/stats" element={<DecadeStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
