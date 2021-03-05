import { useEffect } from 'react';
import './App.css';
import Casters from './components/casters/casters';
import Time from './components/casters/timestamp';

function App() {

  useEffect(() => {
    document.title = 'Boxcast Monitor';
  })

  return (
    <div class = 'body'>
        <div class="header">
            <div class="title">Boxcast Monitor</div>
            <div class="update">
                <Time/>
            </div>
        </div>
        <div class="container">
              <Casters/>
        </div>
        <div class="footer">
            <Time/>
        </div>
    </div>
    

  );
}

export default App;
