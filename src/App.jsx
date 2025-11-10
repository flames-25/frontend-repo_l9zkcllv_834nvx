import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import AnnouncementCard from './components/AnnouncementCard';
import AnnouncementForm from './components/AnnouncementForm';

function App() {
  const [currentView, setCurrentView] = useState('catalog');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState({ query: '', author: '', isbn: '' });
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Le Petit Prince',
      author: 'Antoine de Saint-Exupéry',
      isbn: '9780156013987',
      price: 8.5,
      condition: 'Très bon',
      description: 'Édition de poche en très bon état, quelques marques légères.',
      cover_image_url:
        'https://images.unsplash.com/photo-1529653762956-c829a7e35d6b?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'L\'Étranger',
      author: 'Albert Camus',
      isbn: '9782070360024',
      price: 6.0,
      condition: 'Bon',
      description: 'Couverture un peu usée, pages intactes.',
      cover_image_url:
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 3,
      title: 'Harry Potter à l\'école des sorciers',
      author: 'J.K. Rowling',
      isbn: '9782070584628',
      price: 12.0,
      condition: 'Neuf',
      description: 'Jamais lu, parfait pour les fans.',
      cover_image_url:
        'https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=1200&auto=format&fit=crop',
    },
  ]);

  const handleAuthAction = (action) => {
    if (action === 'login') {
      setCurrentView('profile');
    } else if (action === 'logout') {
      setIsAuthenticated(false);
      setCurrentView('catalog');
    }
  };

  const handleCreate = (payload) => {
    const next = { id: Date.now(), ...payload };
    setItems((prev) => [next, ...prev]);
    setCurrentView('catalog');
  };

  const filtered = useMemo(() => {
    const q = search.query.trim().toLowerCase();
    const a = search.author.trim().toLowerCase();
    const i = search.isbn.trim().toLowerCase();
    return items.filter((it) => {
      const byTitle = !q || it.title.toLowerCase().includes(q);
      const byAuthor = !a || it.author.toLowerCase().includes(a);
      const byIsbn = !i || (it.isbn || '').toLowerCase().includes(i);
      return byTitle && byAuthor && byIsbn;
    });
  }, [items, search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50">
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        isAuthenticated={isAuthenticated}
        onAuthAction={handleAuthAction}
      />

      <main className="mx-auto max-w-6xl px-4 py-8">
        {currentView === 'catalog' && (
          <div className="space-y-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Catalogue d\'annonces</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Recherchez par titre, auteur ou ISBN et contactez le vendeur en un clic.
                </p>
              </div>
            </div>

            <SearchBar onSearch={setSearch} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <AnnouncementCard
                  key={item.id}
                  item={item}
                  onView={(it) => setSelected(it)}
                  onContact={(it) => {
                    setSelected(it);
                    alert(`Contactez le vendeur au sujet de: ${it.title}`);
                  }}
                />
              ))}
            </div>

            {selected && (
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-semibold">Détails de l\'annonce</h2>
                  <button className="text-sm text-gray-500 hover:text-gray-700" onClick={() => setSelected(null)}>
                    Fermer
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selected.cover_image_url}
                    alt={selected.title}
                    className="h-56 w-full rounded-lg object-cover"
                  />
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold text-gray-900">{selected.title}</h3>
                    <p className="text-gray-600">{selected.author}</p>
                    <p className="text-sm text-gray-400">ISBN: {selected.isbn}</p>
                    <p className="mt-3 text-gray-700">{selected.description}</p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                      {selected.price} € · {selected.condition}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {currentView === 'new' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Publier une annonce</h1>
            {!isAuthenticated && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
                Veuillez vous connecter pour publier. Vous pouvez tout de même préremplir le formulaire.
              </div>
            )}
            <AnnouncementForm onSubmit={handleCreate} />
          </div>
        )}

        {currentView === 'profile' && (
          <div className="mx-auto max-w-2xl space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Espace utilisateur</h1>
            {!isAuthenticated ? (
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsAuthenticated(true);
                    setCurrentView('catalog');
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                    <input
                      type="password"
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
                      required
                    />
                  </div>
                  <button className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                    Se connecter
                  </button>
                </form>
              </div>
            ) : (
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-gray-700">Vous êtes connecté. Vos annonces apparaîtront ici ultérieurement.</p>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="mt-10 border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BookMarket — Projet démo MVP
      </footer>
    </div>
  );
}

export default App;
