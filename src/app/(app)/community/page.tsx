import React from 'react';

const CommunityPage = () => {
  return (
    <div>
      <h1>Bienvenue dans la Communauté</h1>
      <p>Nous sommes ravis de vous accueillir dans notre communauté. Ici, vous pouvez partager vos idées, collaborer avec d'autres membres et participer à des discussions enrichissantes.</p>
      <section>
        <h2>Dernières Activités</h2>
        <ul>
          <li>Discussion sur les nouvelles fonctionnalités</li>
          <li>Événement de réseautage en ligne</li>
          <li>Atelier de développement personnel</li>
        </ul>
      </section>
      <section>
        <h2>Ressources</h2>
        <ul>
          <li><a href="#">Guide de la communauté</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Support</a></li>
        </ul>
      </section>
    </div>
  );
};

export default CommunityPage;
