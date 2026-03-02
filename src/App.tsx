import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryProvider } from './presentation/providers/QueryProvider';
import { Dashboard } from './presentation/pages/Dashboard';

function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-surface">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
