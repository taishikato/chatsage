export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat_logs: {
        Row: {
          chatbot_internal_id: string
          conversation_id: string
          created_at: string
          id: number
          internal_id: string
          message: string | null
          role: string | null
        }
        Insert: {
          chatbot_internal_id: string
          conversation_id: string
          created_at?: string
          id?: number
          internal_id?: string
          message?: string | null
          role?: string | null
        }
        Update: {
          chatbot_internal_id?: string
          conversation_id?: string
          created_at?: string
          id?: number
          internal_id?: string
          message?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_logs_chatbot_internal_id_fkey"
            columns: ["chatbot_internal_id"]
            isOneToOne: false
            referencedRelation: "chatbots"
            referencedColumns: ["internal_id"]
          },
        ]
      }
      chatbots: {
        Row: {
          created_at: string
          id: number
          internal_id: string
          is_public: boolean
          name: string | null
          temperature: number | null
          user_auth_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          internal_id?: string
          is_public?: boolean
          name?: string | null
          temperature?: number | null
          user_auth_id: string
        }
        Update: {
          created_at?: string
          id?: number
          internal_id?: string
          is_public?: boolean
          name?: string | null
          temperature?: number | null
          user_auth_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_auth_id_fkey"
            columns: ["user_auth_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["auth_id"]
          },
        ]
      }
      urls: {
        Row: {
          chatbot_internal_id: string
          created_at: string
          id: number
          status: string | null
          url: string
        }
        Insert: {
          chatbot_internal_id: string
          created_at?: string
          id?: number
          status?: string | null
          url: string
        }
        Update: {
          chatbot_internal_id?: string
          created_at?: string
          id?: number
          status?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "urls_chatbot_internal_id_fkey"
            columns: ["chatbot_internal_id"]
            isOneToOne: false
            referencedRelation: "chatbots"
            referencedColumns: ["internal_id"]
          },
        ]
      }
      users: {
        Row: {
          auth_id: string
          created_at: string
          email: string | null
          id: number
        }
        Insert: {
          auth_id?: string
          created_at?: string
          email?: string | null
          id?: number
        }
        Update: {
          auth_id?: string
          created_at?: string
          email?: string | null
          id?: number
        }
        Relationships: []
      }
      vectors: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_chat_logs_by_chatbot: {
        Args: {
          chatbot_id: string
        }
        Returns: {
          conversation_id: string
          messages: Json
        }[]
      }
      match_vectors:
        | {
            Args: {
              query_embedding: string
              match_count?: number
              filter?: Json
            }
            Returns: {
              id: number
              content: string
              metadata: Json
              embedding: Json
              similarity: number
            }[]
          }
        | {
            Args: {
              query_embedding: string
              match_threshold: number
              match_count: number
            }
            Returns: {
              id: number
              content: string
              similarity: number
            }[]
          }
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
