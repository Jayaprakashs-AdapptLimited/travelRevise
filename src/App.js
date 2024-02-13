import { useState } from "react";
import "./App.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "charger", quantity: 2, packed: false },
];

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );

  function Logo() {
    return <h1> Far Away </h1>;
  }
  function Form() {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e);
        const newItem = {id: Date.now(), description, quantity, packed: false};
        console.log(newItem);
    }
    return (
      <form className="add-form" onSubmit={handleSubmit}>
        <h3> Need for your Trip </h3>
        <select value={quantity} onChange={(e) => {
          console.log(e.target.value);
          setQuantity(Number(e.target.value))}}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => 
            <option value={num} key={num}> {num} </option>
          )}
          {/* <option value={1}> 1 </option>
          <option value={2}> 2 </option>
          <option value={3}> 3 </option> */}
        </select>

        <input type="text" placeholder="Item..." value={description}
        onChange={(e) =>{
          console.log(e.target.value)
        setDescription(e.target.value)}
        } 
         />
        <button> ADD </button>
      </form>
    );
  }
  function PackingList() {
    return (
      <div className="list">
        <ul>
          {initialItems.map((item) => (
            <Item item={item} key={item.id} />
          ))}
        </ul>
      </div>
    );
  }

  function Item({ item }) {
    return (
      <li>
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button> ❌ </button>
      </li>
    );
  }

  function Stats() {
    return (
      <footer className="stats">
        <em> You have X items on your list, You already packed X(%) </em>
      </footer>
    );
  }
}

export default App;
