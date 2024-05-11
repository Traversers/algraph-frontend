const List = ({ items, renderItem }) => {
  return (
    items.map((item, index) => renderItem(item, index))
  )
};

export default List;
