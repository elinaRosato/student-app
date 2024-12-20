-- Create the new public schema
CREATE SCHEMA IF NOT EXISTS public;

-- Users table
CREATE TABLE public.Users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL
);

-- Courses table
CREATE TABLE public.Courses (
    course_id SERIAL PRIMARY KEY,
    course_code VARCHAR(50),
    course_name VARCHAR(100) NOT NULL DEFAULT 'New Course',
    tags JSONB,
    credits FLOAT,
    course_field VARCHAR(50),
    user_id UUID REFERENCES Users(user_id) ON DELETE SET NULL -- One user per course
);

-- Notebooks table
CREATE TABLE public.Notebooks (
    notebook_id SERIAL PRIMARY KEY,
    notebook_name VARCHAR(100) NOT NULL DEFAULT 'New Notebook',
    user_id UUID REFERENCES Users(user_id) ON DELETE SET NULL
);

-- Junction table for Notebook - Course relationship (many-to-many)
CREATE TABLE public.Notebook_Courses (
    notebook_id INT REFERENCES Notebooks(notebook_id) ON DELETE CASCADE,
    course_id INT REFERENCES Courses(course_id) ON DELETE CASCADE,
    PRIMARY KEY (notebook_id, course_id)
);

-- Notes table
CREATE TABLE public.Notes (
    note_id SERIAL PRIMARY KEY,
    note_title VARCHAR(100) NOT NULL DEFAULT 'New Note',
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notebook_id INT REFERENCES Notebooks(notebook_id) ON DELETE SET NULL
);

-- Blocks table
CREATE TABLE public.Blocks (
    block_id SERIAL PRIMARY KEY,
    block_type VARCHAR(50) NOT NULL, -- Could be 'text', 'image', etc.
    block_content TEXT,
    block_metadata JSONB, -- Use JSONB for metadata flexibility
    note_id INT REFERENCES Notes(note_id) ON DELETE CASCADE
);

-- Tasks table
CREATE TABLE public.Tasks (
    task_id SERIAL PRIMARY KEY,
    task_description TEXT NOT NULL DEFAULT 'New Task',
    task_due_date DATE,
    task_status VARCHAR(50) CHECK (task_status IN ('Not Started', 'Done', 'In Progress')),
    user_id UUID REFERENCES Users(user_id) ON DELETE SET NULL
);

-- Junction table for Task - Course relationship (many-to-many)
CREATE TABLE public.Task_Courses (
    task_id INT REFERENCES Tasks(task_id) ON DELETE CASCADE,
    course_id INT REFERENCES Courses(course_id) ON DELETE CASCADE,
    PRIMARY KEY (task_id, course_id)
);

-- Resources table
CREATE TABLE public.Resources (
    resource_id SERIAL PRIMARY KEY,
    resource_name VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) CHECK (resource_type IN ('PDF', 'Video', 'Image', 'Document', 'Link')),
    resource_content TEXT NOT NULL,
    user_id UUID REFERENCES Users(user_id) ON DELETE SET NULL
);

-- Junction table for Resource - Course relationship (many-to-many)
CREATE TABLE public.Resource_Courses (
    resource_id INT REFERENCES Resources(resource_id) ON DELETE CASCADE,
    course_id INT REFERENCES Courses(course_id) ON DELETE CASCADE,
    PRIMARY KEY (resource_id, course_id)
);
