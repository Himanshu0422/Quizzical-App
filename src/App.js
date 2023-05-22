import { useState } from 'react';
import Start from './components/Start';
import Questions from './components/Questions';

function App() {

  const [firstLoad, setFirstLoad] = useState(true);

  return (
    <div>
      <div className="blob yellow"></div><div className="blob blue"></div>
      {firstLoad ? <Start setFirstLoad={() => setFirstLoad(false)} /> : <Questions />}
    </div>
  );
}

export default App;
