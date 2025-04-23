import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ListPage from './pages/ListPage'
import ModelDetailPage from './pages/ModelDetailPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={
              <div className="px-4 py-6 sm:px-0">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                  <h1 className="text-2xl font-semibold text-gray-700">
                    欢迎来到 ModelHub
                  </h1>
                </div>
              </div>
            } />
            <Route path="/models" element={<ListPage />} />
            <Route path="/datasets" element={<ListPage />} />
            <Route path="/mcps" element={<ListPage />} />
            <Route path="/spaces" element={<ListPage />} />
            <Route path="/models/:namespace/:name" element={<ModelDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App 