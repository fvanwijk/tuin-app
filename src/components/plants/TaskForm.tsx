// filepath: /Users/fvanwijk/projects/tuin-app/src/components/plants/TaskForm.tsx
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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

// Define form values type
type TaskFormValues = {
  title: string;
  description: string;
  week_number: number;
};

export const TaskForm = ({
  initialValues,
  onSubmit,
  isSubmitting = false,
  plantId,
  onCancel,
}: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormValues>({
    defaultValues: initialValues && {
      title: initialValues.title || "",
      description: initialValues.description || "",
      week_number: initialValues.week_number,
    },
  });

  // Update form when initialValues changes (e.g., when editing an existing task)
  useEffect(() => {
    if (initialValues) {
      reset({
        title: initialValues.title || "",
        description: initialValues.description || "",
        week_number: initialValues.week_number,
      });
    }
  }, [initialValues, reset]);

  const onFormSubmit: SubmitHandler<TaskFormValues> = (data) => {
    onSubmit({
      id: initialValues?.id,
      plant_id: plantId,
      title: data.title,
      description: data.description || null,
      week_number: data.week_number,
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Titel
        </label>
        <Input
          id="title"
          {...register("title", {
            required: "Titel is verplicht",
            maxLength: {
              value: 255,
              message: "Titel mag maximaal 255 karakters lang zijn",
            },
          })}
          placeholder="bijv. Water geven of Snoeien"
          error={errors.title?.message}
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
          {...register("description")}
          className={`mt-1 block w-full rounded-md ${
            errors.description
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-green-500 focus:border-green-500"
          } shadow-sm`}
          rows={2}
          placeholder="Optionele beschrijving"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="week_number"
          className="block text-sm font-medium text-gray-700"
        >
          Weeknummer (1-52)
        </label>
        <Input
          id="week_number"
          type="number"
          {...register("week_number", {
            min: { value: 1, message: "Weeknummer moet minimaal 1 zijn" },
            max: { value: 52, message: "Weeknummer mag maximaal 52 zijn" },
            valueAsNumber: true,
          })}
          placeholder="Voer een weeknummer in"
          error={errors.week_number?.message}
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
            : initialValues
            ? "Bijwerken"
            : "Toevoegen"}
        </Button>
      </div>
    </form>
  );
};
