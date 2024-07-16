import React from 'react';
import {InputForm} from '@/components/form';
import Link from 'next/link';

function App() {
  return (
    <div className="App">
      <InputForm />

      <Link href="/design">
        <span>About</span>
      </Link>

      <Link href="/community">
        <span>Community</span>
      </Link>
    </div>
  );
}

export default App;
