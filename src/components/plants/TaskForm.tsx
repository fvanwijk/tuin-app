// filepath: /Users/fvanwijk/projects/tuin-app/src/components/plants/TaskForm.tsx
import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { PlantTaskData } from "../../api/fetchPlantTasks";

interface TaskFormProps {
  initialValues?: Partial<PlantTaskData>;
  onSubmit: (data: PlantTaskData) => void;
  isSubmitting?: boolean;
  plantId: string;
  onCancel?: () => void;
}

export const TaskForm = ({
  initialValues = {},
  onSubmit,
  isSubmitting = false,
  plantId,
  onCancel,
}: TaskFormProps) => {
  const [title, setTitle] = useState(initialValues.title || "");
  const [description, setDescription] = useState(
    initialValues.description || ""
  );
  const [weekNumber, setWeekNumber] = useState<number | undefined>(
    initialValues.week_number || undefined
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      id: initialValues.id,
      plant_id: plantId,
      title,
      description: description || null,
      week_number: weekNumber || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Titel
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="bijv. Water geven of Snoeien"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Beschrijving
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          rows={2}
          placeholder="Optionele beschrijving"
        />
      </div>

      <div>
        <label
          htmlFor="weekNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Weeknummer (1-52)
        </label>
        <Input
          id="weekNumber"
          type="number"
          min="1"
          max="52"
          value={weekNumber || ""}
          onChange={(e) =>
            setWeekNumber(e.target.value ? parseInt(e.target.value) : undefined)
          }
          placeholder="Voer een weeknummer in"
        />
        <p className="mt-1 text-xs text-gray-500">
          Taken worden jaarlijks herhaald in dezelfde week
        </p>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Annuleren
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Opslaan..."
            : initialValues.id
            ? "Bijwerken"
            : "Toevoegen"}
        </Button>
      </div>
    </form>
  );
};
