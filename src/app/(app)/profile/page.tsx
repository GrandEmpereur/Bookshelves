import React from 'react';

const ProfilePage = () => {
  return (
    <div>
      <h1>Profil de l'utilisateur</h1>
      <p>Bienvenue sur la page de profil. Ici, vous pouvez voir et modifier vos informations personnelles.</p>
      <form>
        <label>
          Nom:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <br />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default ProfilePage;
