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
      <div id="background">
        <Container maxWidth="md" id="outer_container">
            <Content/>
        </Container>
      </div>
    </div>
  );
}

export default App;
