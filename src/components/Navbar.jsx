import React from 'react';
import { BookOpen, User, LogIn, PlusCircle } from 'lucide-react';

const Navbar = ({ currentView, onNavigate, isAuthenticated, onAuthAction }) => {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <button
          className="flex items-center gap-2 text-xl font-semibold text-gray-900"
          onClick={() => onNavigate('catalog')}
        >
          <BookOpen className="h-6 w-6 text-indigo-600" />
          BookMarket
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          <button
            onClick={() => onNavigate('catalog')}
            className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
              currentView === 'catalog' ? 'text-indigo-600' : 'text-gray-600'
            }`}
          >
            Catalogue
          </button>
          <button
            onClick={() => onNavigate('new')}
            className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
              currentView === 'new' ? 'text-indigo-600' : 'text-gray-600'
            }`}
          >
            Nouvelle annonce
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
              currentView === 'profile' ? 'text-indigo-600' : 'text-gray-600'
            }`}
          >
            Profil
          </button>
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="hidden text-sm text-gray-700 md:block">Connecté</div>
              <button
                onClick={() => onAuthAction('logout')}
                className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                aria-label="Se déconnecter"
              >
                <User className="h-4 w-4" />
                Déconnexion
              </button>
            </>
          ) : (
            <button
              onClick={() => onAuthAction('login')}
              className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              aria-label="Se connecter"
            >
              <LogIn className="h-4 w-4" />
              Connexion
            </button>
          )}
          <button
            onClick={() => onNavigate('new')}
            className="inline-flex items-center gap-2 rounded-md border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
          >
            <PlusCircle className="h-4 w-4" />
            Publier
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
