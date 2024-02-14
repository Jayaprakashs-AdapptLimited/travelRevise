import { useState } from "react";
import "./App.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "charger", quantity: 2, packed: false },
];

function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    // console.log(id);
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );

  function Logo() {
    return <h1> Far Away </h1>;
  }
  function Form({ onAddItems }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e) {
      e.preventDefault();
      // console.log(e);
      const newItem = { id: Date.now(), description, quantity, packed: false };
      console.log(newItem);
      onAddItems(newItem);
      setDescription("");
      setQuantity(1);
    }
    return (
      <form className="add-form" onSubmit={handleSubmit}>
        <h3> Need for your Trip </h3>
        <select
          value={quantity}
          onChange={(e) => {
            console.log(e.target.value);
            setQuantity(Number(e.target.value));
          }}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {" "}
              {num}{" "}
            </option>
          ))}
          {/* <option value={1}> 1 </option>
          <option value={2}> 2 </option>
          <option value={3}> 3 </option> */}
        </select>

        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => {
            console.log(e.target.value);
            setDescription(e.target.value);
          }}
        />
        <button> ADD </button>
      </form>
    );
  }
  function PackingList({ items, onDeleteItem, onToggleItem }) {
    const [sortBy, setSortBy] = useState("input");

    let sortedItems;

    if (sortBy === "input") sortedItems = items;
    if (sortBy === "description")
      sortedItems = items
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));

    if(sortBy === "packed") sortedItems = items.slice().
    return (
      <div className="list">
        <ul>
          {sortedItems.map((item) => (
            <Item
              item={item}
              key={item.id}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
            />
          ))}
        </ul>

        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input"> Sort by Input order</option>
            <option value="description"> Sort by Description</option>
            <option value="packed"> Sort by Packed status </option>
          </select>
        </div>
      </div>
    );
  }

  function Item({ item, onDeleteItem, onToggleItem }) {
    return (
      <li>
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => {
            onToggleItem(item.id);
          }}
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => onDeleteItem(item.id)}> ❌ </button>
      </li>
    );
  }

  function Stats({ items }) {
    if (!items.length)
      return (
        <footer className="stats">
          <em> Add some items to the list </em>
        </footer>
      );
    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    const percentage = (numPacked / numItems) * 100;

    return (
      <footer className="stats">
        {percentage === 100 ? (
          <em> You got everything, Ready to go </em>
        ) : (
          <em>
            You have {numItems} items on your list, You already packed
            {numPacked}({percentage}%)
          </em>
        )}
      </footer>
    );
  }
}

export default App;
