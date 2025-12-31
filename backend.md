# Disaster Management Backend – Documentation

## Tech Stack

- **AdonisJS v6**
- **PostgreSQL**
- **PostGIS**
- **Lucid ORM**
- **VineJS (Validation)**
- **WebSockets**
- **JWT / Access Tokens**

---

## Project Overview

YuvaLinkBackend/
├── .adonisrc.json          
├── .env                    
├── .gitignore
├── package.json
├── ace                     
├── build/              
├── contracts/              
│   └── contracts.ts
├── start/                  
│   ├── kernel.ts           
│   ├── routes.ts       
├── app/                    
│   ├── Controllers/Http/  
│   │   └── UserController.ts
│   ├── Models/             
│   │   └── User.ts
│   ├── Middleware/         
│   │   └── Auth.ts
│   ├── Services/           
│   ├── Validators/         
│   │   └── CreateUserValidator.ts
│   ├── Exceptions/         
│   └── Repositories/       
├── database/               
│   ├── migrations/         
│   ├── seeds/              
│   └── factories/          
├── resources/              
│   ├── views/
│   └── public/
├── tests/                  
│   ├── feature/
│   └── unit/
├── tsconfig.json           
└── README.md


This backend supports a disaster management system where:

- Admin users create disasters
- Volunteers register and get assigned to disasters
- Appointments group **1 admin with up to 15 volunteers**
- Each appointment creates a **chat room** using WebSockets

---

## Installation Process

### Prerequisites

- Node.js >= 18
- PostgreSQL >= 14
- PostGIS enabled
- npm or pnpm

---

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd backend
```
Step 2: Install Dependencies
```bash
npm install
```

Step 3: Environment Setup
Create .env file:

```env
NODE_ENV=development
PORT=3333
APP_KEY=base64:GENERATE_KEY
HOST=0.0.0.0

DB_CONNECTION=pg
PG_HOST=127.0.0.1
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=password
PG_DB_NAME=disaster_db
```
Generate app key:
```bash
node ace generate:key
```
Step 4: Enable PostGIS
```sql
CREATE EXTENSION postgis;
```
Step 5: Run Migrations
```bash
node ace migration:run
```
Step 6: Start Server
```bash
npm run dev
```
# Database Migrations
1. Users Table
```
table.uuid('id').primary()
table.string('name').notNullable()
table.string('email').unique().notNullable()
table.string('password').notNullable()
table.enum('role', ['admin', 'volunteer']).notNullable()
table.timestamps(true)
```
2. Access Tokens Table
 ```
table.increments('id')
table.uuid('user_id').references('users.id').onDelete('CASCADE')
table.string('token', 64).notNullable()
table.timestamp('expires_at')
table.timestamps(true)
```
3. Volunteers Table
```
table.uuid('id').primary()
table.uuid('user_id').references('users.id').onDelete('CASCADE')
table.string('phone')
table.string('skills')
table.boolean('available').defaultTo(true)
table.timestamps(true)
```
4. Disasters Table (PostGIS)
```
table.uuid('id').primary()
table.string('title').notNullable()
table.text('description')
table.specificType('location', 'geography(Point, 4326)').notNullable()
table.timestamp('starts_at')
table.timestamp('ends_at')
table.timestamps(true)
```
5. Appointments Table
Used to:
Assign 1 admin
Assign up to 15 volunteers
Create chat 
```
table.uuid('id').primary()
table.uuid('admin_id').references('users.id')
table.uuid('disaster_id').references('disasters.id')
table.integer('max_volunteers').defaultTo(15)
table.timestamps(true)
```
6. Appointment Volunteers (Pivot Table)
```
table.increments('id')
table.uuid('appointment_id').references('appointments.id').onDelete('CASCADE')
table.uuid('volunteer_id').references('volunteers.id').onDelete('CASCADE')
table.unique(['appointment_id', 'volunteer_id'])
```
Models (Lucid ORM)
User Model
```
export default class User extends BaseModel {
  @column({ isPrimary: true }) id: string
  @column() name: string
  @column() email: string
  @column({ serializeAs: null }) password: string
  @column() role: 'admin' | 'volunteer'
}
```
Volunteer Model
```
export default class Volunteer extends BaseModel {
  @column({ isPrimary: true }) id: string
  @column() userId: string
  @column() skills: string
  @column() available: boolean
}
```
Disaster Model
```
export default class Disaster extends BaseModel {
  @column({ isPrimary: true }) id: string
  @column() title: string
  @column() description: string
  @column() location: any
}
````
Appointment Model
```
export default class Appointment extends BaseModel {
  @column({ isPrimary: true }) id: string
  @column() adminId: string
  @column() disasterId: string

  @manyToMany(() => Volunteer)
  volunteers: ManyToMany<typeof Volunteer>
}
```
Validation (VineJS)
Register User Validator
```
export const registerValidator = vine.compile(
  vine.object({
    name: vine.string(),
    email: vine.string().email(),
    password: vine.string().minLength(8),
    role: vine.enum(['admin', 'volunteer']),
  })
)
```
Create Disaster Validator
```
export const createDisasterValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3),
    description: vine.string().optional(),
    latitude: vine.number(),
    longitude: vine.number(),
  })
)
```
RESTful APIs
Authentication
Method	Endpoint	Description
POST	/auth/register	Register user
POST	/auth/login	Login
POST	/auth/logout	Logout

Disasters
Method	Endpoint	Description
POST	/disasters	Create disaster (admin)
GET	/disasters	List disasters
GET	/disasters/:id	Disaster details

Appointments
Method	Endpoint	Description
POST	/appointments	Create appointment
POST	/appointments/:id/join	Volunteer joins
GET	/appointments/:id	Appointment details

WebSockets – Chat Rooms
Each appointment creates one chat room
Room name: appointment:{appointmentId}
Only assigned users can connect
Maximum 15 volunteers per admin
```
ws.on('connection', (socket) => {
  socket.join(`appointment:${appointmentId}`)
})
```
## Security
Password hashing managed by Adonis Auth

