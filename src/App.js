import logo from './logo.svg';
// import './App.css';
// import './global.less'
import 'antd/dist/antd.css';
import tb from './tb.jsx';

function App() {
    let tbcontent=tb();
  return (
    <div className="App">
      <header className="App-header">
          {tbcontent}
      </header>
    </div>
  );
}

export default App;
