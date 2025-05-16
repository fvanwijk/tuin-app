export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      borders: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      plants: {
        Row: {
          alive: boolean | null;
          border_text: string | null;
          color: string | null;
          comments: string | null;
          created_at: string | null;
          id: string;
          name: string;
          name_nl: string | null;
          type: string | null;
          user_id: string;
        };
        Insert: {
          alive?: boolean | null;
          border_text?: string | null;
          color?: string | null;
          comments?: string | null;
          created_at?: string | null;
          id?: string;
          name: string;
          name_nl?: string | null;
          type?: string | null;
          user_id?: string;
        };
        Update: {
          alive?: boolean | null;
          border_text?: string | null;
          color?: string | null;
          comments?: string | null;
          created_at?: string | null;
          id?: string;
          name?: string;
          name_nl?: string | null;
          type?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      plant_tasks: {
        Row: {
          id: string;
          plant_id: string;
          title: string;
          description: string | null;
          week_number: number | null;
          completed: boolean;
          created_at: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          plant_id: string;
          title: string;
          description?: string | null;
          week_number?: number | null;
          completed?: boolean;
          created_at?: string;
          user_id?: string;
        };
        Update: {
          id?: string;
          plant_id?: string;
          title?: string;
          description?: string | null;
          week_number?: number | null;
          completed?: boolean;
          created_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "plant_tasks_plant_id_fkey";
            columns: ["plant_id"];
            isOneToOne: false;
            referencedRelation: "plants";
            referencedColumns: ["id"];
          }
        ];
      };
      plants_borders: {
        Row: {
          border_id: string;
          created_at: string;
          plant_id: string;
          user_id: string;
        };
        Insert: {
          border_id: string;
          created_at?: string;
          plant_id: string;
          user_id?: string;
        };
        Update: {
          border_id?: string;
          created_at?: string;
          plant_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "plants_borders_border_id_fkey";
            columns: ["border_id"];
            isOneToOne: false;
            referencedRelation: "borders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "plants_borders_plant_id_fkey";
            columns: ["plant_id"];
            isOneToOne: false;
            referencedRelation: "plants";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
