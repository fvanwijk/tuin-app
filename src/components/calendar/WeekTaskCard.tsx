import { TaskWithPlantDetails } from "../../api/fetchPlantTasks";
import { Card } from "../ui/Card";

interface WeekTasksCardProps {
  weekNumber: number;
  tasks: TaskWithPlantDetails[];
  onTaskComplete: (task: TaskWithPlantDetails) => void;
  isCurrentWeek: boolean;
}

function getPlantName(task: TaskWithPlantDetails): string {
  return task.plants.name_nl || task.plants.name;
}

export const WeekTasksCard = ({
  weekNumber,
  tasks,
  onTaskComplete,
  isCurrentWeek,
}: WeekTasksCardProps) => {
  return (
    <Card className={`${isCurrentWeek ? "border-2 border-green-500" : ""}`}>
      <div className="flex items-center justify-between mb-4">
        <h2
          className={`text-xl font-semibold ${
            isCurrentWeek ? "text-green-600" : ""
          }`}
        >
          Week {weekNumber}
          {isCurrentWeek && (
            <span className="ml-2 text-sm font-normal">(Huidige week)</span>
          )}
        </h2>
        <div className="text-sm text-gray-500">
          {tasks.length} {tasks.length === 1 ? "taak" : "taken"}
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="text-gray-500 text-center py-6">
          <p>Geen taken gepland voor deze week</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <li key={task.id} className="py-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <input
                    type="checkbox"
                    checked={!!task.isCompletedThisYear}
                    onChange={() => onTaskComplete(task)}
                    className="h-5 w-5 text-green-600 rounded focus:ring-green-500"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p
                    className={`font-medium ${
                      task.isCompletedThisYear
                        ? "line-through text-gray-500"
                        : "text-gray-900"
                    }`}
                  >
                    {task.title}
                  </p>
                  {task.description && (
                    <p
                      className={`text-sm ${
                        task.isCompletedThisYear
                          ? "line-through text-gray-400"
                          : "text-gray-600"
                      }`}
                    >
                      {task.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Plant: {getPlantName(task)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};
