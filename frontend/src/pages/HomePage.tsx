import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, TrendingUp, Users } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="p-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Benvenuto in CRM Immobiliare</h1>
        <p className="text-gray-600 text-lg">Gestisci le tue proprietà, clienti e trattative in un'unica piattaforma</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <Building2 size={40} className="text-blue-600 mb-4" />
          <h2 className="text-xl font-bold mb-2">Gestione Proprietà</h2>
          <p className="text-gray-600 mb-4">Catalogo completo di immobili con foto, documenti e caratteristiche</p>
          <Link to="/properties" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
            Vai alle proprietà <ArrowRight size={16} />
          </Link>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <Users size={40} className="text-green-600 mb-4" />
          <h2 className="text-xl font-bold mb-2">Gestione Clienti</h2>
          <p className="text-gray-600 mb-4">Traccia buyer, seller, tenant e landlord con tutti i loro dati</p>
          <Link to="/clients" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            Vai ai clienti <ArrowRight size={16} />
          </Link>
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <TrendingUp size={40} className="text-purple-600 mb-4" />
          <h2 className="text-xl font-bold mb-2">Analytics</h2>
          <p className="text-gray-600 mb-4">Dashboard con KPI, statistiche e reportistica completa</p>
          <Link to="/dashboard" className="text-purple-600 hover:text-purple-700 flex items-center gap-2">
            Vai al dashboard <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Ultimi Immobili Inseriti</h2>
        <p className="text-gray-600">Carica le tue prime proprietà per iniziare!</p>
      </div>
    </div>
  );
};

export default HomePage;
