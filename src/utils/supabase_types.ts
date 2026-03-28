export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
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
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
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
      contact_submissions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profile: {
        Row: {
          checked_in: boolean
          created_at: string
          diet_restrictions: Json | null
          first_hackathon: boolean
          first_name: string
          grad_year: number
          has_eaten: boolean
          heard_about: string | null
          helpful_links: string | null
          id: string
          is_admin: boolean
          last_name: string
          participating: boolean
          shirt_size: string | null
          team_id: string | null
        }
        Insert: {
          checked_in?: boolean
          created_at?: string
          diet_restrictions?: Json | null
          first_hackathon?: boolean
          first_name: string
          grad_year: number
          has_eaten?: boolean
          heard_about?: string | null
          helpful_links?: string | null
          id: string
          is_admin?: boolean
          last_name: string
          participating?: boolean
          shirt_size?: string | null
          team_id?: string | null
        }
        Update: {
          checked_in?: boolean
          created_at?: string
          diet_restrictions?: Json | null
          first_hackathon?: boolean
          first_name?: string
          grad_year?: number
          has_eaten?: boolean
          heard_about?: string | null
          helpful_links?: string | null
          id?: string
          is_admin?: boolean
          last_name?: string
          participating?: boolean
          shirt_size?: string | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["team_id"]
          },
        ]
      }
      team: {
        Row: {
          max_members: number
          team_id: string
          team_leader: string
          team_name: string
        }
        Insert: {
          max_members?: number
          team_id?: string
          team_leader: string
          team_name: string
        }
        Update: {
          max_members?: number
          team_id?: string
          team_leader?: string
          team_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_check_in_user: { Args: { target_id: string }; Returns: Json }
      admin_mark_eaten: { Args: { target_id: string }; Returns: Json }
      create_team: {
        Args: { p_max_members: number; p_team_name: string }
        Returns: undefined
      }
      get_my_checked_in: { Args: never; Returns: boolean }
      get_my_has_eaten: { Args: never; Returns: boolean }
      get_my_team_id: { Args: never; Returns: string }
      get_my_team_members: {
        Args: never
        Returns: {
          first_hackathon: boolean
          first_name: string
          grad_year: number
          id: string
          last_name: string
          team_id: string
        }[]
      }
      get_my_team_summary: {
        Args: never
        Returns: {
          leader_first_name: string
          leader_last_name: string
          max_members: number
          member_count: number
          team_id: string
          team_leader: string
          team_name: string
        }[]
      }
      get_team_emails: {
        Args: { p_team_id: string }
        Returns: {
          email: string
          id: string
        }[]
      }
      join_team: { Args: { p_team_id: string }; Returns: undefined }
      kick_team_member: { Args: { target_id: string }; Returns: undefined }
      leave_team: { Args: never; Returns: undefined }
      search_teams: {
        Args: { search_term: string }
        Returns: {
          leader_first_name: string
          leader_last_name: string
          max_members: number
          member_count: number
          team_id: string
          team_leader: string
          team_name: string
        }[]
      }
      toggle_participation: { Args: never; Returns: undefined }
      transfer_team_leadership: {
        Args: { target_id: string }
        Returns: undefined
      }
      update_my_profile: {
        Args: {
          p_diet_restrictions?: Json
          p_first_hackathon?: boolean
          p_first_name?: string
          p_grad_year?: number
          p_last_name?: string
          p_shirt_size?: string
        }
        Returns: undefined
      }
      update_my_team: {
        Args: { p_max_members: number; p_team_name: string }
        Returns: undefined
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
