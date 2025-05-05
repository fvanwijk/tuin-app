import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import type { PlantBorder } from "../../api/fetchPlants";
import { useBorders } from "../../hooks/usePlants";

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

export const PlantForm = ({
  initialValues = { name: "" },
  onSubmit,
  isSubmitting = false,
}: PlantFormProps) => {
  const [name, setName] = useState(initialValues.name || "");
  const [nameDutch, setNameDutch] = useState(initialValues.name_nl || "");
  const [color, setColor] = useState<string>(initialValues.color || "");
  const [comments, setComments] = useState(initialValues.comments || "");
  const [alive, setAlive] = useState(initialValues.alive !== false);
  const [selectedBorders, setSelectedBorders] = useState<PlantBorder[]>(
    initialValues.borders || []
  );

  const { data: borders = [], isLoading: isBordersLoading } = useBorders();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert comma-separated colors to JSON array if needed
    let formattedColor = null;
    if (color.trim()) {
      const colorArray = color
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);
      formattedColor = colorArray.length > 0 ? colorArray.join(",") : null;
    }

    onSubmit({
      ...initialValues,
      name,
      name_nl: nameDutch || null,
      color: formattedColor,
      comments: comments || null,
      alive,
      borders: selectedBorders,
    });
  };

  // Handle border selection changes
  const handleBorderChange = (borderId: string) => {
    setSelectedBorders((prev) => {
      // If already selected, remove it
      if (prev.some(({ id }) => id === borderId)) {
        return prev.filter(({ id }) => id !== borderId);
      }
      // Otherwise add it
      return [...prev, borders.find((b) => b.id === borderId) as PlantBorder];
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
          htmlFor="color"
          className="block text-sm font-medium text-gray-700"
        >
          Kleuren (comma separated)
        </label>
        <Input
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="red, blue, green"
        />
      </div>
      <div>
        <label
          htmlFor="borders"
          className="block text-sm font-medium text-gray-700"
        >
          Borders
        </label>
        <div className="mt-2 space-y-2">
          {isBordersLoading ? (
            <p className="text-gray-500 text-sm">Borders laden...</p>
          ) : (
            borders.map((border) => (
              <div key={border.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`border-${border.id}`}
                  checked={selectedBorders.some((b) => b.id === border.id)}
                  onChange={() => handleBorderChange(border.id)}
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label
                  htmlFor={`border-${border.id}`}
                  className="ml-2 block text-sm text-gray-900"
                >
                  {border.name}
                </label>
              </div>
            ))
          )}
        </div>
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
