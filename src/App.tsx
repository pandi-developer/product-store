import './App.css';
import Header from './components/Header';
import Product from './components/Product';

function App() {
  return (
    <div className='App' style={{ height: '100%' }}>
    <Header cartItems={[0, 0]} />
    <div className='Content' style={{ display: 'flex', height: 'calc(100% - 60px)' }} >
      <div className="row" style={{width:'100%'}}>
        <div className="column" style={{backgroundColor: '#bbb', width:'100%'}} > <Product /> </div>
      </div>
    </div>
  </div>
  );
}

export default App;
