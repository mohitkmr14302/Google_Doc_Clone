import logo from './logo.svg';
import {BrowserRouter as Router , Routes, Route,Navigate} from 'react-router-dom';
import {v4 as uuid} from 'uuid'
import './App.css';
import Editor from './component/Editor'

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path='/' element={<Navigate replace to={`/doc/${uuid()}`}/>}/>
          <Route path='/doc/:id' element={<Editor/>}/>
        </Routes>
      </Router>
      {/* <Editor/> */}
    </>
  );
}

export default App;
