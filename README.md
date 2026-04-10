# CV Builder con IA - Plan de Proyecto

## 📋 Descripción del Proyecto

Aplicación web profesional para crear hojas de vida (CV/Curriculum) con funcionalidades de IA para:
- Optimizar contenido y mejorar redacción
- Sugerir habilidades basadas en experiencia
- Matching con ofertas laborales
- Consejos para entrevistas

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                      DOCKER COMPOSE                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │ Astro Front │  │   Gateway   │  │    Microservicios       │ │
│  │   (SSR)     │──│   (Express) │──│  ┌─────┐ ┌─────┐ ┌────┐ │ │
│  │  :3000      │  │   :3001     │  │  │ CV  │ │  IA │ │ PDF │ │ │
│  └─────────────┘  └─────────────┘  │  │ :3002│ │:3003│ │:3004│ │ │
│                                    │  └─────┘ └─────┘ └────┘ │ │
│                                    └─────────────────────────┘ │
│  ┌─────────────┐  ┌─────────────┐                              │
│  │ PostgreSQL  │  │   Redis    │                              │
│  │   :5432     │  │   :6379    │                              │
│  └─────────────┘  └─────────────┘                              │
└─────────────────────────────────────────────────────────────────┘
```

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| **Frontend** | Astro 4 + React ( islands) |
| **Backend** | Node.js + Express + TypeScript |
| **Base de Datos** | PostgreSQL + Prisma ORM |
| **Cache** | Redis |
| **IA** | OpenAI API (GPT-4o mini) |
| **PDF** | Puppeteer (headless) |
| **Contenedores** | Docker + Docker Compose |

## 📁 Estructura del Proyecto

```
/
├── docker-compose.yml
│
├── services/
│   ├── gateway/              # API Gateway
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── routes/
│   │   │   └── middleware/
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── ms-cv/                # Microservicio CV (CRUD)
│   │   ├── src/
│   │   │   ├── domain/       # Entities, interfaces
│   │   │   ├── application/  # Use cases
│   │   │   ├── infrastructure/ # DB, repositories
│   │   │   └── presentation/  # Routes
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── ms-ia/                # Microservicio IA
│   │   ├── src/
│   │   │   ├── services/
│   │   │   │   ├── ContentOptimizer.ts
│   │   │   │   ├── SkillsSuggestions.ts
│   │   │   │   ├── JobMatcher.ts
│   │   │   │   └── InterviewTips.ts
│   │   │   └── prompts/
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── ms-pdf/               # Microservicio PDF
│   │   ├── src/
│   │   │   ├── templates/
│   │   │   └── generator/
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── shared/               # Código compartido
│       ├── types/
│       ├── dto/
│       └── prisma/
│
└── frontend/                 # Astro app
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   └── layouts/
    ├── Dockerfile
    └── package.json
```

## 🔌 APIs de los Microservicios

### ms-cv (Puerto 3002)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/cv` | Listar CVs del usuario |
| POST | `/api/cv` | Crear nuevo CV |
| GET | `/api/cv/:id` | Obtener CV por ID |
| PUT | `/api/cv/:id` | Actualizar CV |
| DELETE | `/api/cv/:id` | Eliminar CV |

### ms-ia (Puerto 3003)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/ai/optimize` | Optimizar contenido del CV |
| POST | `/api/ai/suggest-skills` | Sugerencias de habilidades |
| POST | `/api/ai/match-job` | Match con oferta laboral |
| POST | `/api/ai/interview-tips` | Consejos para entrevistas |

### ms-pdf (Puerto 3004)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/pdf/generate` | Generar PDF del CV |
| GET | `/api/pdf/templates` | Listar plantillas disponibles |

## 🚀 Getting Started

### Prerrequisitos
- Docker >= 20.10
- Node.js >= 20 (para desarrollo local)
- npm o yarn

### Configuración

1. **Clonar el repositorio**
2. **Crear archivo `.env`** en la raíz:

```env
# Database
DATABASE_URL=postgresql://cvbuilder:devpass@postgres:5432/cvbuilder

# Redis
REDIS_URL=redis://redis:6379

# OpenAI
OPENAI_API_KEY=sk-tu-api-key-aqui

# Puertos de servicios
MS_CV_URL=http://ms-cv:3002
MS_IA_URL=http://ms-ia:3003
MS_PDF_URL=http://ms-pdf:3004
```

### Ejecutar con Docker Compose

```bash
# Iniciar todos los servicios
docker-compose up --build

# O en modo desarrollo con reload
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

### Servicios disponibles

| Servicio | URL |
|----------|-----|
| Frontend Astro | http://localhost:3000 |
| Gateway | http://localhost:3001 |
| ms-cv | http://localhost:3002 |
| ms-ia | http://localhost:3003 |
| ms-pdf | http://localhost:3004 |
| PostgreSQL | localhost:5432 |
| Redis | localhost:6379 |

## 📝 Estructura de Datos (Schema Prisma)

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  resumes   Resume[]
}

model Resume {
  id            String   @id @default(uuid())
  userId        String
  user          User     @relation(fields: [userId], references: [id])
  personalInfo  Json
  experience    Json
  education     Json
  skills        String[]
  templateId    String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Template {
  id          String   @id @default(uuid())
  name        String
  description String?
  thumbnail   String?
  isPremium   Boolean  @default(false)
}
```

## 🧪 Funcionalidades IA

### 1. Optimización de Contenido
- Mejorar redacción de experiencia laboral
- Corregir ortografía y gramática
- Estructurar mejor descripciones (método STAR)
- Adaptar tono profesional

### 2. Sugerencias de Habilidades
- Analizar experiencia → recomendar skills técnicos/blandos
- Skills en tendencia para el sector
- Completar gaps de habilidades

### 3. Match con Ofertas Laborales
- **Input**: Job description (URL o texto)
- **Output**: Score de compatibilidad (%)
- Sugerencias de mejoras específicas

### 4. Consejos para Entrevistas
- Preguntas comunes por tipo de puesto
- Respuestas de ejemplo
- Tips por industria

## 💰 Costos Estimados

| Componente | Costo |
|------------|-------|
| PostgreSQL (Docker) | $0 |
| Redis (Docker) | $0 |
| Docker (local) | $0 |
| OpenAI API | ~$10-30/mes |
| **Total** | **$10-30/mes** |

## 🚀 Quick Start

```bash
# 1. Clonar el repositorio
cd project

# 2. Configurar variables de entorno (ya viene el .env configurado)
# IMPORTANTE: Edita .env y agrega tu OpenAI API Key

# 3. Iniciar servicios con Docker Compose
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# 4. Verificar servicios
# Frontend: http://localhost:3000
# Gateway: http://localhost:3001/health
```

## 📅 Plan de Implementación

### Semana 1: Foundation
- [x] Plan del proyecto (este documento)
- [x] Setup de Docker Compose
- [x] Estructura de microservicios
- [x] Configuración de Prisma

### Semana 2: Editor + Templates
- [x] Formulario de entrada de datos CV
- [x] Sistema de selección de templates
- [ ] Preview en tiempo real

### Semana 3: IA Integration
- [x] Integrar OpenAI API
- [x] Endpoints de optimización
- [x] Sugerencias de skills

### Semana 4: Match + Polish
- [x] Feature: Job description match
- [x] Consejos para entrevistas
- [ ] UI/UX improvements
- [ ] Deploy

## 🔧 Comandos Útiles

```bash
# Ver logs de un servicio específico
docker-compose logs -f ms-cv

# Reiniciar un servicio
docker-compose restart ms-ia

# Acceder a la base de datos
docker-compose exec postgres psql -U cvbuilder -d cvbuilder

# Ver estado de los contenedores
docker-compose ps
```

## 📄 Licencia

MIT