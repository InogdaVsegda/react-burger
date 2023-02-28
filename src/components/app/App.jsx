import React from 'react';
import './App.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const URL = 'https://norma.nomoreparties.space/api/ingredients'

function App() {

  const [state, setState] = React.useState({ 
    productData: null,
    loading: true
  })

  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch(URL);
      const productData = await res.json();
      setState({ productData: productData.data });
    }

    try {
      getData();
    } catch (e) {
        console.error(e);
    } finally {
        setState({ loading: false })
    }
  }, [])

  return (
    <div className="App">
      <AppHeader/>
      <main className='container'>
        <BurgerIngredients productData={state.productData}/>
        <BurgerConstructor productData={state.productData}/>
      </main>
    </div>
  );
}

export default App;
