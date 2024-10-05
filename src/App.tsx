import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Landing from './views/Landing';
import Login from './views/Login';
import Verify from './views/Verify';
import Profile from './views/Profile';

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex justify-center">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/board/:id' element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  )
}
