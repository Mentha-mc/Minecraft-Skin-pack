import React from 'react';
import SkinEditor from './components/SkinEditor';
import { Pickaxe } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center gap-3">
          <Pickaxe className="w-8 h-8 text-emerald-400" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Minecraft 皮肤包生成器
          </h1>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <SkinEditor />
      </main>
      <footer className="border-t border-gray-700 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-400">
          Made with  for Mnetha
        </div>
      </footer>
    </div>
  );
}

export default App;