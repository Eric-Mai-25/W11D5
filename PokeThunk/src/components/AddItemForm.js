import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createItem } from '../store/items';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const AddItemForm = ({ itemId, hideForm }) => {
  let item = useSelector(state => state.items[itemId]);

  const [happiness, setHappiness] = useState('');
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch()
  const {pokemonId} = useParams()

  const updateName = (e) => setName(e.target.value);
  const updateHappiness = (e) => setHappiness(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...item,
      name,
      happiness,
      price
    };
    dispatch(createItem(payload, pokemonId ))
    hideForm()
    // let returnedItem;
    // if (returnedItem) {
    //   hideForm();
    // }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <section className="edit-form-holder centered middled">
      <form className="item-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={updateName}
        />
        <input
          type="number"
          placeholder="Happiness"
          min="0"
          max="100"
          required
          value={happiness}
          onChange={updateHappiness}
        />
        <input
          type="number"
          placeholder="Price"
          required
          value={price}
          onChange={updatePrice}
        />
        <button type="submit">Add Item</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

export default AddItemForm;