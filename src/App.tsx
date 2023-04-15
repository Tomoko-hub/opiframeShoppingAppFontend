import React, {useEffect} from 'react';
import './App.css';
import useAction from './hooks/useAction';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';

function App() {
  const action = useAction();

  useEffect(()=> {
    action.getList();
  },[])

  return (
    <div className="App">
      <ShoppingForm add={action.add} />
      <ShoppingList 
        list={action.state.list} 
        edit={action.edit} 
        remove={action.remove} />
    </div>
  );
}

export default App;
