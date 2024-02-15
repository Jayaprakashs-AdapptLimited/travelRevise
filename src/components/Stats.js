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
          {numPacked}({Math.floor(percentage)}%)
        </em>
      )}
    </footer>
  );
}

export default Stats;
