import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import type { PlantBorder } from "../../api/fetchPlants";
import { useBorders } from "../../hooks/usePlants";
import Select from "react-select";

export interface PlantFormData {
  alive?: boolean | null;
  borders?: PlantBorder[];
  color?: string | null;
  comments?: string | null;
  id?: string;
  name_nl?: string | null;
  name: string;
}

interface PlantFormProps {
  initialValues?: PlantFormData;
  onSubmit: (data: PlantFormData) => void;
  isSubmitting?: boolean;
}

// Common plant flower colors
const COMMON_COLORS = [
  "red", "pink", "orange", "yellow", 
  "white", "cream", "blue", "purple", 
  "green", "brown", "black", "mixed"
];

// Option type for react-select
interface SelectOption {
  value: string;
  label: string;
}

export const PlantForm = ({
  initialValues = { name: "" },
  onSubmit,
  isSubmitting = false,
}: PlantFormProps) => {
  const [name, setName] = useState(initialValues.name || "");
  const [nameDutch, setNameDutch] = useState(initialValues.name_nl || "");
  
  // Convert initialValues.color string to array of color options
  const initialColors = initialValues.color 
    ? initialValues.color.split(",").map(c => ({ 
        value: c.trim(), 
        label: c.trim().charAt(0).toUpperCase() + c.trim().slice(1) 
      }))
    : [];
  const [selectedColors, setSelectedColors] = useState<SelectOption[]>(initialColors);
  
  const [comments, setComments] = useState(initialValues.comments || "");
  const [alive, setAlive] = useState(initialValues.alive !== false);
  
  const { data: borders = [], isLoading: isBordersLoading } = useBorders();
  
  // Convert initialValues.borders to format for react-select
  const initialSelectedBorders = initialValues.borders 
    ? initialValues.borders.map(border => ({ 
        value: border.id, 
        label: border.name 
      }))
    : [];
  const [selectedBorders, setSelectedBorders] = useState<SelectOption[]>(initialSelectedBorders);

  // Color options for the select input
  const colorOptions = COMMON_COLORS.map(color => ({
    value: color,
    label: color.charAt(0).toUpperCase() + color.slice(1)
  }));

  // Border options for the select input
  const borderOptions = borders.map(border => ({
    value: border.id,
    label: border.name
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format the color value from the array of selected colors
    const formattedColor = selectedColors.length > 0 
      ? selectedColors.map(option => option.value).join(",") 
      : null;

    // Map selected border options back to PlantBorder objects
    const formattedBorders = selectedBorders.length > 0
      ? selectedBorders.map(option => 
          borders.find(border => border.id === option.value)!
        )
      : [];

    onSubmit({
      ...initialValues,
      name,
      name_nl: nameDutch || null,
      color: formattedColor,
      comments: comments || null,
      alive,
      borders: formattedBorders,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Naam (Latijn)
        </label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label
          htmlFor="name_nl"
          className="block text-sm font-medium text-gray-700"
        >
          Nederlandse naam
        </label>
        <Input
          id="name_nl"
          value={nameDutch}
          onChange={(e) => setNameDutch(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="colors"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Kleuren
        </label>
        <Select
          id="colors"
          isMulti
          options={colorOptions}
          value={selectedColors}
          onChange={(selected) => setSelectedColors(selected as SelectOption[])}
          placeholder="Selecteer kleuren..."
          className="text-sm"
          classNamePrefix="react-select"
        />
      </div>
      <div>
        <label
          htmlFor="borders"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Borders
        </label>
        {isBordersLoading ? (
          <p className="text-gray-500 text-sm">Borders laden...</p>
        ) : (
          <Select
            id="borders"
            isMulti
            options={borderOptions}
            value={selectedBorders}
            onChange={(selected) => setSelectedBorders(selected as SelectOption[])}
            placeholder="Selecteer borders..."
            className="text-sm"
            classNamePrefix="react-select"
          />
        )}
      </div>
      <div>
        <label
          htmlFor="alive"
          className="inline-flex items-center text-sm font-medium text-gray-700"
        >
          <input
            type="checkbox"
            id="alive"
            checked={alive}
            onChange={(e) => setAlive(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 mr-2"
          />
          Plant leeft nog
        </label>
      </div>
      <div>
        <label
          htmlFor="comments"
          className="block text-sm font-medium text-gray-700"
        >
          Opmerkingen
        </label>
        <textarea
          id="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          rows={4}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Opslaan..." : "Opslaan"}
        </Button>
      </div>
    </form>
  );
};
