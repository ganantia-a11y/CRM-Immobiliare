# Database Schema - Real Estate CRM

## Tabelle Principali

### 1. **users** - Utenti del sistema
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role ENUM('admin', 'agent', 'manager', 'client') NOT NULL,
    department VARCHAR(100),
    commission_rate DECIMAL(5,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. **properties** - Immobili in catalogo
```sql
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20),
    province VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Italy',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    property_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'available',
    price DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    bedrooms INT,
    bathrooms INT,
    total_area DECIMAL(10, 2),
    land_area DECIMAL(10, 2),
    year_built INT,
    condition VARCHAR(50),
    heating_type VARCHAR(100),
    energy_class VARCHAR(10),
    features TEXT[] DEFAULT ARRAY[]::TEXT[],
    images_count INT DEFAULT 0,
    documents_count INT DEFAULT 0,
    agent_id UUID NOT NULL REFERENCES users(id),
    owner_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL REFERENCES users(id)
);

CREATE INDEX idx_properties_city_status ON properties(city, status);
CREATE INDEX idx_properties_agent_id ON properties(agent_id);
```

### 3. **clients** - Clienti (Buyer/Seller/Tenant)
```sql
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    mobile VARCHAR(20),
    client_type VARCHAR(50) NOT NULL,
    company_name VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(100),
    postal_code VARCHAR(20),
    tax_id VARCHAR(50),
    budget_min DECIMAL(15, 2),
    budget_max DECIMAL(15, 2),
    preferred_property_type TEXT[] DEFAULT ARRAY[]::TEXT[],
    preferred_location TEXT[] DEFAULT ARRAY[]::TEXT[],
    status VARCHAR(50) DEFAULT 'prospect',
    assigned_agent_id UUID REFERENCES users(id),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_clients_agent_id ON clients(assigned_agent_id);
```

### 4. **deals** - Trattative/Offerte
```sql
CREATE TABLE deals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id),
    client_id UUID NOT NULL REFERENCES clients(id),
    agent_id UUID NOT NULL REFERENCES users(id),
    deal_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'negotiation',
    offered_price DECIMAL(15, 2),
    final_price DECIMAL(15, 2),
    deposit_amount DECIMAL(15, 2),
    commission_amount DECIMAL(15, 2),
    commission_rate DECIMAL(5, 2),
    expected_close_date DATE,
    actual_close_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_deals_status ON deals(status);
CREATE INDEX idx_deals_agent_id ON deals(agent_id);
```

### 5. **property_images** - Foto degli immobili
```sql
CREATE TABLE property_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    title VARCHAR(255),
    is_primary BOOLEAN DEFAULT false,
    display_order INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6. **communications** - Log comunicazioni
```sql
CREATE TABLE communications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES clients(id),
    agent_id UUID NOT NULL REFERENCES users(id),
    communication_type VARCHAR(50) NOT NULL,
    subject VARCHAR(255),
    message TEXT,
    duration_minutes INT,
    outcome VARCHAR(255),
    next_followup_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_communications_client_id ON communications(client_id);
```

### 7. **contracts** - Contratti
```sql
CREATE TABLE contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deal_id UUID NOT NULL REFERENCES deals(id),
    contract_number VARCHAR(50) UNIQUE NOT NULL,
    contract_type VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    document_url VARCHAR(500),
    signed_by_seller BOOLEAN DEFAULT false,
    signed_by_buyer BOOLEAN DEFAULT false,
    seller_signature_date TIMESTAMP,
    buyer_signature_date TIMESTAMP,
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 8. **property_documents** - Documenti immobili
```sql
CREATE TABLE property_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    document_type VARCHAR(100) NOT NULL,
    document_url VARCHAR(500) NOT NULL,
    file_name VARCHAR(255),
    file_size INT,
    uploaded_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
