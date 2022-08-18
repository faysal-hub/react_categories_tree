import Category from './Category/Category';

const Categories = ({ entries, trigger, editTrigger }) => {
  //add category
  const addHandler = (index) => {
    const newSubOption = {
      title: `Category article ${Math.floor(Math.random() * 100) + 1}`,
      subOptions: [],
    };

    entries[index].subOptions.push(newSubOption);
    trigger();
  };
  //edit category
  const editHandler = (index) => {
    const title = entries[index].title;

    editTrigger(title, index);
  };
  //delete category
  const deleteHandler = (index) => {
    entries.splice(index, 1);

    trigger();
  };

  return (
    <ul style={{ listStyleType: 'none', marginTop: '5px' }}>
      {/* loop through categories */}
      {entries.map((entry, index) => {
        return (
          //render category
          <li key={index} style={{ padding: '0.10rem 0.25rem' }}>
            <Category
              entry={entry}
              add={() => addHandler(index)}
              edit={() => editHandler(index)}
              delete={() => deleteHandler(index)}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Categories;
