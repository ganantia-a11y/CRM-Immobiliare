# API Documentation - CRM Immobiliare

## Base URL
```
http://localhost:5000/api
```

## Authentication
Tutte le richieste protette richiedono un header:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## Endpoints Proprietà

### GET /properties
Ottieni lista di proprietà con filtri

**Query Parameters:**
- `city` (string) - Filtro per città
- `priceMin` (number) - Prezzo minimo
- `priceMax` (number) - Prezzo massimo
- `type` (string) - Tipo proprietà (residential, commercial, land, industrial)
- `status` (string) - Stato (available, pending, sold, rented)
- `sortBy` (string) - Ordinamento (newest, price-low, price-high, area)
- `page` (number) - Numero pagina (default: 1)
- `limit` (number) - Risultati per pagina (default: 12)

**Esempio:**
```bash
GET /properties?city=Milano&priceMin=100000&priceMax=500000&sortBy=price-low&page=1
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Appartamento Milano Centro",
      "address": "Via Dante 10",
      "city": "Milano",
      "price": 350000,
      "bedrooms": 3,
      "bathrooms": 2,
      "total_area": 120,
      "property_type": "residential",
      "status": "available",
      "agent_first_name": "Marco",
      "agent_last_name": "Rossi"
    }
  ],
  "total": 45,
  "page": 1,
  "hasMore": true
}
```

### GET /properties/:id
Ottieni dettagli di una proprietà

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Appartamento Milano Centro",
    "price": 350000,
    "bedrooms": 3,
    "bathrooms": 2,
    "total_area": 120,
    "images": [
      {
        "id": "image-id-1",
        "image_url": "https://s3.amazonaws.com/...",
        "is_primary": true
      }
    ]
  }
}
```

### POST /properties (Protetto)
Crea una nuova proprietà

**Body:**
```json
{
  "title": "Appartamento Milano Centro",
  "address": "Via Dante 10",
  "city": "Milano",
  "price": 350000,
  "property_type": "residential",
  "bedrooms": 3,
  "bathrooms": 2,
  "total_area": 120
}
```

### PUT /properties/:id (Protetto)
Aggiorna una proprietà

### DELETE /properties/:id (Protetto)
Elimina una proprietà

---

## Endpoints Autenticazione

### POST /auth/login
Accedi al sistema

**Body:**
```json
{
  "email": "marco.rossi@crmimmobiliare.it",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "marco.rossi@crmimmobiliare.it",
    "first_name": "Marco",
    "last_name": "Rossi",
    "role": "agent"
  }
}
```

### POST /auth/register
Registra un nuovo utente

**Body:**
```json
{
  "email": "nuovo.agente@crmimmobiliare.it",
  "password": "securepassword",
  "first_name": "Nuovo",
  "last_name": "Agente"
}
```
