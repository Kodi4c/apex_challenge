//*********************************************** */
//
//         App JS
//
//
//*********************************************** */
import './App.css';
import Content from './components/Content';
import Container from '@material-ui/core/Container';



function App() {
  return (
    <div className="App">
      <Container maxWidth="md">
          <Content/>
      </Container>
    </div>
  );
}

export default App;
