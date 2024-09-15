import React from 'react';

const ListsPage = () => {
  const lists = [
    { id: 1, name: 'Liste de lecture', description: 'Livres à lire cette année' },
    { id: 2, name: 'Liste de souhaits', description: 'Livres que je veux acheter' },
    { id: 3, name: 'Livres terminés', description: 'Livres que j\'ai déjà lus' },
  ];

  return (
    <div>
      <h1>Mes Listes</h1>
      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            <h2>{list.name}</h2>
            <p>{list.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListsPage;
