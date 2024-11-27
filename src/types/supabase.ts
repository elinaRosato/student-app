export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      blocks: {
        Row: {
          block_content: string | null
          block_id: number
          block_metadata: Json | null
          block_type: string
          note_id: number | null
          user_id: string
        }
        Insert: {
          block_content?: string | null
          block_id?: number
          block_metadata?: Json | null
          block_type: string
          note_id?: number | null
          user_id: string
        }
        Update: {
          block_content?: string | null
          block_id?: number
          block_metadata?: Json | null
          block_type?: string
          note_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blocks_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["note_id"]
          },
        ]
      }
      courses: {
        Row: {
          course_code: string | null
          course_field: string | null
          course_id: number
          course_name: string
          credits: number | null
          tags: Json | null
          user_id: string | null
        }
        Insert: {
          course_code?: string | null
          course_field?: string | null
          course_id?: number
          course_name?: string
          credits?: number | null
          tags?: Json | null
          user_id?: string | null
        }
        Update: {
          course_code?: string | null
          course_field?: string | null
          course_id?: number
          course_name?: string
          credits?: number | null
          tags?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      notebook_courses: {
        Row: {
          course_id: number
          notebook_id: number
        }
        Insert: {
          course_id: number
          notebook_id: number
        }
        Update: {
          course_id?: number
          notebook_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "notebook_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "notebook_courses_notebook_id_fkey"
            columns: ["notebook_id"]
            isOneToOne: false
            referencedRelation: "notebooks"
            referencedColumns: ["notebook_id"]
          },
        ]
      }
      notebooks: {
        Row: {
          notebook_id: number
          notebook_name: string
          user_id: string
        }
        Insert: {
          notebook_id?: number
          notebook_name?: string
          user_id: string
        }
        Update: {
          notebook_id?: number
          notebook_name?: string
          user_id?: string
        }
        Relationships: []
      }
      notes: {
        Row: {
          date_created: string | null
          date_modified: string | null
          note_id: number
          note_title: string
          notebook_id: number
          user_id: string
        }
        Insert: {
          date_created?: string | null
          date_modified?: string | null
          note_id?: number
          note_title?: string
          notebook_id?: number
          user_id: string
        }
        Update: {
          date_created?: string | null
          date_modified?: string | null
          note_id?: number
          note_title?: string
          notebook_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notes_notebook_id_fkey"
            columns: ["notebook_id"]
            isOneToOne: false
            referencedRelation: "notebooks"
            referencedColumns: ["notebook_id"]
          },
        ]
      }
      resource_courses: {
        Row: {
          course_id: number
          resource_id: number
        }
        Insert: {
          course_id: number
          resource_id: number
        }
        Update: {
          course_id?: number
          resource_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "resource_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "resource_courses_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["resource_id"]
          },
        ]
      }
      resources: {
        Row: {
          resource_content: string
          resource_id: number
          resource_name: string
          resource_type: string | null
          user_id: string | null
        }
        Insert: {
          resource_content: string
          resource_id?: number
          resource_name: string
          resource_type?: string | null
          user_id?: string | null
        }
        Update: {
          resource_content?: string
          resource_id?: number
          resource_name?: string
          resource_type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      task_courses: {
        Row: {
          course_id: number
          task_id: number
        }
        Insert: {
          course_id: number
          task_id: number
        }
        Update: {
          course_id?: number
          task_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "task_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "task_courses_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["task_id"]
          },
        ]
      }
      tasks: {
        Row: {
          task_description: string
          task_due_date: string | null
          task_id: number
          task_status: string | null
          user_id: string | null
        }
        Insert: {
          task_description?: string
          task_due_date?: string | null
          task_id?: number
          task_status?: string | null
          user_id?: string | null
        }
        Update: {
          task_description?: string
          task_due_date?: string | null
          task_id?: number
          task_status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          name: string
          surname: string
          user_id: string
          username: string
        }
        Insert: {
          name: string
          surname: string
          user_id: string
          username: string
        }
        Update: {
          name?: string
          surname?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
