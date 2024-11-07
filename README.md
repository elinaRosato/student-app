# Student App

A modern web application built with Next.js, Supabase, and Tailwind CSS. This app provides user authentication and authorization, along with secure data management features for students.

## Features

- User Sign Up and Sign In
- User Authentication via Supabase
- Responsive UI built with Tailwind CSS
- Code style enforcement with Prettier and Husky
- Modern tech stack for scalability

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Supabase (Authentication and Database)
- **Development Tools**:
  - Prettier for code formatting
  - Husky for pre-commit hooks

## Getting Started

### Prerequisites

Before you can run this project locally, make sure you have the following installed:

- Node.js (v14 or higher)
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/elinaRosato/student-app.git

2. Navigate into the project directory:

   ```bash
   cd student-app

3. Install the dependencies:

   ```bash
   npm install

### Setting Up Supabase
1. Create a Supabase project by signing up at Supabase.
2. Create a new project and obtain your Supabase credentials (API keys).
3. Set up the Supabase credentials in your environment variables. You can create a .env.local file in the root of your project and add the following:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

### Running the App Locally
To start the development server and view the app locally, run:
    ```bash
    npm run dev
The app will be available at http://localhost:3000.

## Database Schema

The app uses the following database schema with Supabase:

### Users Table
| Column Name     | Type     | Description                          |
|-----------------|----------|--------------------------------------|
| user_id         | SERIAL   | Primary key, unique identifier       |
| username        | VARCHAR  | Unique username, not null            |
| password        | VARCHAR  | User's password, not null            |
| email_address   | VARCHAR  | Unique email address, not null       |
| name            | VARCHAR  | User's first name, not null          |
| surname         | VARCHAR  | User's surname, not null             |

### Courses Table
| Column Name     | Type     | Description                          |
|-----------------|----------|--------------------------------------|
| course_id       | SERIAL   | Primary key, unique identifier       |
| course_code     | VARCHAR  | Unique course code                   |
| course_name     | VARCHAR  | Name of the course, default: 'New Course'|
| course_field    | VARCHAR  | Field of the course (e.g., Science)  |
| user_id         | INT      | Foreign key to Users table           |

### Notebooks Table
| Column Name     | Type     | Description                          |
|-----------------|----------|--------------------------------------|
| notebook_id     | SERIAL   | Primary key, unique identifier       |
| notebook_name   | VARCHAR  | Name of the notebook, default: 'New Notebook' |
| user_id         | INT      | Foreign key to Users table           |

### Notebook_Courses Table (Many-to-Many Relationship)
| Column Name     | Type     | Description                          |
|-----------------|----------|--------------------------------------|
| notebook_id     | INT      | Foreign key to Notebooks table       |
| course_id       | INT      | Foreign key to Courses table         |

### Notes Table
| Column Name     | Type     | Description                          |
|-----------------|----------|--------------------------------------|
| note_id         | SERIAL   | Primary key, unique identifier       |
| note_title      | VARCHAR  | Title of the note, default: 'New Note'|
| date_created    | TIMESTAMP| Timestamp when the note was created  |
| date_modified   | TIMESTAMP| Timestamp of last modification       |
| notebook_id     | INT      | Foreign key to Notebooks table       |

### Blocks Table
| Column Name     | Type     | Description                          |
|-----------------|----------|--------------------------------------|
| block_id        | SERIAL   | Primary key, unique identifier       |
| block_type      | VARCHAR  | Type of block (e.g., text, image)    |
| block_content   | TEXT     | Content of the block                 |
| block_metadata  | JSONB    | JSON metadata for flexibility        |
| note_id         | INT      | Foreign key to Notes table           |

### Tasks Table
| Column Name     | Type     | Description                          |
|-----------------|----------|--------------------------------------|
| task_id         | SERIAL   | Primary key, unique identifier       |
| task_description| TEXT     | Description of the task, default: 'New Task' |
| task_due_date   | DATE     | Due date for the task                |
| task_status     | VARCHAR  | Status of the task ('Not Started', 'Done', 'In Progress') |
| user_id         | INT      | Foreign key to Users table           |

### Task_Courses Table (Many-to-Many Relationship)
| Column Name     | Type     | Description                          |
|-----------------|----------|--------------------------------------|
| task_id         | INT      | Foreign key to Tasks table          |
| course_id       | INT      | Foreign key to Courses table         |

### Resources Table
| Column Name     | Type     | Description                          |
|-----------------|----------|--------------------------------------|
| resource_id     | SERIAL   | Primary key, unique identifier       |
| resource_name   | VARCHAR  | Name of the resource                 |
| resource_type   | VARCHAR  | Type of resource (PDF, Video, etc.)  |
| resource_content| TEXT     | Content or URL of the resource       |
| user_id         | INT      | Foreign key to Users table           |

### Resource_Courses Table (Many-to-Many Relationship)
| Column Name     | Type     | Description                          |
|-----------------|----------|--------------------------------------|
| resource_id     | INT      | Foreign key to Resources table       |
| course_id       | INT      | Foreign key to Courses table         |

## Contributing
1. Fork the repository.
2. Create your feature branch (git checkout -b feature-name).
3. Commit your changes (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature-name).
5. Open a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements
- **Next.js** - The React Framework
- **Supabase** - Open Source Backend-as-a-Service
- **Tailwind CSS** - A utility-first CSS framework
- **Prettier** - Code formatter
- **Husky** - Git hooks for pre-commit

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
