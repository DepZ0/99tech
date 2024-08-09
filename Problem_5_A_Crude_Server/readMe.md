## API Endpoints

## Run this Project

    Use npm run dev

### Create Resource

- **POST** `/resources`
- Request body: `{ "name": "Resource Name", "description": "Resource Description" }`

### List Resources

- **GET** `/resources`

### Get Resource by ID

- **GET** `/resources/:id`

### Update Resource

- **PUT** `/resources/:id`
- Request body: `{ "name": "Updated Name", "description": "Updated Description" }`

### Delete Resource

- **DELETE** `/resources/:id`
