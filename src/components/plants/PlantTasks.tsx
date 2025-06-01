// filepath: /Users/fvanwijk/projects/tuin-app/src/components/plants/PlantTasks.tsx
import { useState, Fragment } from "react";
import {
  usePlantTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../../hooks/usePlantTasks";
import { Button } from "../ui/Button";
import { Tag } from "../ui/Tag";
import {
  PlantTask,
  PlantTaskData,
  getWeekNumber,
} from "../../api/fetchPlantTasks";
import { TaskForm } from "./TaskForm";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

interface PlantTasksProps {
  plantId: string;
  plantName: string;
}

export const PlantTasks = ({ plantId, plantName }: PlantTasksProps) => {
  const { data: tasks, isLoading, error } = usePlantTasksQuery(plantId);
  const addTaskMutation = useAddTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<PlantTask | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleAddTask = (data: PlantTaskData) => {
    addTaskMutation.mutate(data, {
      onSuccess: () => {
        setIsAddDialogOpen(false);
      },
    });
  };

  const handleUpdateTask = (data: PlantTaskData) => {
    updateTaskMutation.mutate(data, {
      onSuccess: () => {
        setIsEditDialogOpen(false);
        setCurrentTask(null);
      },
    });
  };

  const handleDeleteTask = () => {
    if (currentTask?.id) {
      deleteTaskMutation.mutate(currentTask.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setCurrentTask(null);
        },
      });
    }
  };

  // Get current week number to highlight current week tasks
  const currentWeek = getWeekNumber(new Date());

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-gray-900">
          Taken voor deze plant
        </h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>Taak toevoegen</Button>
      </div>

      {isLoading && <p className="text-gray-500">Taken laden...</p>}
      {error && (
        <p className="text-red-500">
          Er was een probleem bij het laden van de taken.
        </p>
      )}

      {tasks && tasks.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-4">
          <p>Nog geen taken aangemaakt voor deze plant.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {tasks?.map((task) => (
            <li key={task.id} className="py-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {task.title}
                  </p>
                  {task.description && (
                    <p className="text-sm text-gray-600">{task.description}</p>
                  )}
                  {task.week_number && (
                    <div
                      className={`text-xs ${
                        task.week_number === currentWeek
                          ? "font-bold text-green-600"
                          : "text-gray-500"
                      } mt-1`}
                    >
                      <Tag
                        variant={
                          task.week_number === currentWeek ? "success" : "gray"
                        }
                        size="md"
                        className={
                          task.week_number === currentWeek
                            ? "ring-1 ring-inset ring-green-700/10"
                            : "ring-1 ring-inset ring-gray-400/10"
                        }
                      >
                        Week {task.week_number}
                        {task.week_number === currentWeek && " (huidige week)"}
                      </Tag>
                    </div>
                  )}
                </div>
                <div className="ml-3 flex-shrink-0 flex">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentTask(task);
                      setIsEditDialogOpen(true);
                    }}
                    className="mr-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Bewerken
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentTask(task);
                      setIsDeleteDialogOpen(true);
                    }}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Verwijderen
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Add Task Dialog */}
      <Transition appear show={isAddDialogOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsAddDialogOpen(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Taak toevoegen voor {plantName}
                  </DialogTitle>

                  <div className="mt-4">
                    <TaskForm
                      plantId={plantId}
                      onSubmit={handleAddTask}
                      isSubmitting={addTaskMutation.isPending}
                      onCancel={() => setIsAddDialogOpen(false)}
                    />
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Edit Task Dialog */}
      <Transition appear show={isEditDialogOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsEditDialogOpen(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Taak bewerken voor {plantName}
                  </DialogTitle>

                  {currentTask && (
                    <div className="mt-4">
                      <TaskForm
                        plantId={plantId}
                        initialValues={currentTask}
                        onSubmit={handleUpdateTask}
                        isSubmitting={updateTaskMutation.isPending}
                        onCancel={() => setIsEditDialogOpen(false)}
                      />
                    </div>
                  )}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Delete Confirmation Dialog */}
      <Transition appear show={isDeleteDialogOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsDeleteDialogOpen(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Taak verwijderen
                  </DialogTitle>

                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Weet je zeker dat je de taak "{currentTask?.title}" wilt
                      verwijderen?
                    </p>
                  </div>

                  <div className="mt-6 flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setIsDeleteDialogOpen(false)}
                    >
                      Annuleren
                    </Button>
                    <Button
                      type="button"
                      onClick={handleDeleteTask}
                      isLoading={deleteTaskMutation.isPending}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Verwijderen
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
