import { TaskWithPlantDetails, getCurrentYear, getWeekNumber } from '../api/fetchPlantTasks';
import { WeekTasksCard } from '../components/calendar/WeekTaskCard';
import { getPlantTypeLabel } from '../components/plants/utils';
import { Card } from '../components/ui/Card';
import { Tag } from '../components/ui/Tag';
import { useCompleteTaskMutation, useCurrentWeekTasksQuery } from '../hooks/usePlantTasks';
import { usePlantsQuery } from '../hooks/usePlants';

export const HomePage = () => {
  const currentWeek = getWeekNumber(new Date());
  const currentYear = getCurrentYear();

  const { data: weekTasks = [] } = useCurrentWeekTasksQuery();
  const { data: plants = [] } = usePlantsQuery();
  const completeTaskMutation = useCompleteTaskMutation();

  // Group plants by type
  const plantsByType = plants.reduce<Record<string, number>>((acc, plant) => {
    const type = plant.type || 'Onbekend';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  // Sort types by count (descending)
  const sortedTypes = Object.entries(plantsByType).sort(([, countA], [, countB]) => countB - countA);

  const handleTaskComplete = (task: TaskWithPlantDetails) => {
    completeTaskMutation.mutate({
      taskId: task.id,
      plantId: task.plant_id,
      completed: !task.isCompletedThisYear,
    });
  };

  const completedTasksCount = weekTasks.filter((task) => task.isCompletedThisYear).length;
  const completionPercentage = weekTasks.length > 0 ? Math.round((completedTasksCount / weekTasks.length) * 100) : 0;

  return (
    <div className="container p-4">
      <h1 className="text-5xl font-bold mb-4">Tuin app</h1>
      <p className="mb-8">Beheer je tuin als een baas.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Tasks Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Taken deze week</h2>
          {weekTasks.length > 0 ? (
            <div>
              <div className="mb-4 bg-white rounded-lg p-4 shadow">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium">Voortgang</span>
                  <span className="text-green-600 font-medium">
                    {completedTasksCount} / {weekTasks.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
                </div>
              </div>
              <WeekTasksCard
                weekNumber={currentWeek}
                tasks={weekTasks}
                onTaskComplete={handleTaskComplete}
                isCurrentWeek={true}
                selectedYear={currentYear}
              />
            </div>
          ) : (
            <Card>
              <div className="text-center p-6">
                <p className="text-gray-500">Geen taken gepland voor deze week</p>
              </div>
            </Card>
          )}
        </div>

        {/* Plants Summary Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Mijn planten</h2>
          <Card>
            {plants.length > 0 ? (
              <div>
                <div className="mb-4 flex justify-between items-center">
                  <span className="text-lg font-medium">Totaal aantal planten</span>
                  <Tag variant="success" size="md">
                    {plants.length}
                  </Tag>
                </div>

                <h3 className="text-md font-medium mb-3">Aantal per type</h3>
                <ul className="space-y-2">
                  {sortedTypes.map(([type, count]) => (
                    <li key={type} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{getPlantTypeLabel(type)}</span>
                        <Tag variant="success" size="sm">
                          {count}
                        </Tag>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 text-center">
                  <a href="/plants" className="text-green-600 hover:text-green-700 text-sm font-medium">
                    Bekijk alle planten
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center p-6">
                <p className="text-gray-500">Nog geen planten toegevoegd</p>
                <a href="/plants/add" className="mt-3 inline-block text-green-600 hover:text-green-700 font-medium">
                  Plant toevoegen
                </a>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
