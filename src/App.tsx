import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryProvider } from './presentation/providers/QueryProvider';
import { AppLayout } from './presentation/components/layout';
import { Dashboard } from './presentation/pages/Dashboard';
import { Transactions } from './presentation/pages/Transactions';
import { Accounts } from './presentation/pages/Accounts';
import { Categories } from './presentation/pages/Categories';
import { Export } from './presentation/pages/Export';

function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/export" element={<Export />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
