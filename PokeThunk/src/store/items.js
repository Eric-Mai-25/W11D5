export const LOAD_ITEMS = "items/LOAD_ITEMS";
export const UPDATE_ITEM = "items/UPDATE_ITEM";
export const REMOVE_ITEM = "items/REMOVE_ITEM";
export const ADD_ITEM = "items/ADD_ITEM";

const load = (items, pokemonId) => ({
  type: LOAD_ITEMS,
  items,
  pokemonId
});

const update = (item) => ({
  type: UPDATE_ITEM,
  item
});

const add = (item) => ({
  type: ADD_ITEM,
  item
});

const remove = (itemId, pokemonId) => ({
  type: REMOVE_ITEM,
  itemId,
  pokemonId
});

const initialState = {};

export const showItem = (pokeId) => async dispatch =>{
  const response = await fetch(`/api/pokemon/${pokeId}/items`)

  if (response.ok){
    const pokeItems = await response.json()
    dispatch(load(pokeItems, pokeId))
  }
}

export const updateItem = (payload, itemId) => async dispatch =>{
  const response = await fetch(`/api/items/${itemId}`,{
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }})

  if (response.ok){
    const pokeItem = await response.json()
    dispatch(update(pokeItem))
  }
}

export const deleteItem = (itemId, pokemonId) => async dispatch =>{
  const response = await fetch(`/api/items/${itemId}`,{
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }})

  if (response.ok){
    const pokeItem = await response.json()
    dispatch(remove(pokeItem.id, pokemonId))
  }
}

export const createItem = (payload, pokemonId) => async dispatch =>{
  const response = await fetch(`/api/pokemon/${pokemonId}/items`,{
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }})

  if (response.ok){
    const pokeItem = await response.json()
    dispatch(add(pokeItem))
  }
}

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ITEMS: 
      const newItems = {};
      action.items.forEach(item => {
        newItems[item.id] = item;
      })
      return {
        ...state,
        ...newItems
      }
    case REMOVE_ITEM: 
      const newState = { ...state };
      delete newState[action.itemId];
      return newState;
    case ADD_ITEM:
      return {
        ...state,
        [action.item.id]: action.item
      };
    case UPDATE_ITEM: 
      return {
        ...state,
        [action.item.id]: action.item
      };
    default:
      return state;
  }
};

export default itemsReducer;