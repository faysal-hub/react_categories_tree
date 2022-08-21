import Category from '../Category/Category';

const Categories = ({ entries, trigger, editTrigger }) => {
  //add category to the list of categories
  const addHandler = (index) => {
    const newSubOption = {
      title: `Category article ${parseInt(localStorage.getItem('counter'))}`,
      subOptions: [],
    };

    //update the localStorage counter
    localStorage.setItem(
      'counter',
      parseInt(localStorage.getItem('counter')) + 1
    );

    //update the entries array
    entries[index].subOptions.push(newSubOption);
    trigger();
  };

  //edit the title of a category
  const editHandler = (index) => {
    const title = entries[index].title;

    editTrigger(title, index);
  };

  //delete a category and it's children
  const deleteHandler = (index) => {
    entries.splice(index, 1);
    trigger();
  };

  return (
    //render the categories
    <ul
      style={{ listStyleType: 'none', marginTop: '5px', paddingLeft: '15px' }}
    >
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
