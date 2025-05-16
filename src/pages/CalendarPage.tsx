import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import {
  useWeekTasksQuery,
  useCompleteTaskMutation,
} from "../hooks/usePlantTasks";
import {
  TaskWithPlantDetails,
  getWeekNumber,
  getCurrentYear,
} from "../api/fetchPlantTasks";
import { WeekTasksCard } from "../components/calendar/WeekTaskCard";

export const CalendarPage = () => {
  const navigate = useNavigate();
  const { year: yearParam, week: weekParam } = useParams<{
    year?: string;
    week?: string;
  }>();

  const currentSystemWeek = getWeekNumber(new Date());
  const currentSystemYear = getCurrentYear();

  // Use route params or default to current year and week
  const year = yearParam ? parseInt(yearParam, 10) : currentSystemYear;
  const week = weekParam ? parseInt(weekParam, 10) : currentSystemWeek;

  // Calculate next two weeks
  const nextWeek = week < 52 ? week + 1 : 1;
  const followingWeek = nextWeek < 52 ? nextWeek + 1 : 1;

  // Calculate previous week
  const previousWeek = week > 1 ? week - 1 : 52;

  // Handle year change for week transitions
  const nextWeekYear = week === 52 ? year + 1 : year;
  const followingWeekYear = nextWeek === 52 ? nextWeekYear + 1 : nextWeekYear;
  const previousWeekYear = week === 1 ? year - 1 : year;

  // Years for the year selector (allow 5 years in past and 5 years in future)
  const yearRange = Array.from(
    { length: 11 },
    (_, i) => currentSystemYear - 5 + i
  );

  // Fetch tasks for each week individually
  const {
    data: currentWeekTasks = [],
    isLoading: isLoadingCurrentWeek,
    error: currentWeekError,
  } = useWeekTasksQuery(week, year);

  const {
    data: nextWeekTasks = [],
    isLoading: isLoadingNextWeek,
    error: nextWeekError,
  } = useWeekTasksQuery(nextWeek, nextWeekYear);

  const {
    data: followingWeekTasks = [],
    isLoading: isLoadingFollowingWeek,
    error: followingWeekError,
  } = useWeekTasksQuery(followingWeek, followingWeekYear);

  const completeTaskMutation = useCompleteTaskMutation();

  const isLoading =
    isLoadingCurrentWeek || isLoadingNextWeek || isLoadingFollowingWeek;
  const hasError = currentWeekError || nextWeekError || followingWeekError;

  // Handle direct navigation to another week
  const handleWeekChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWeek = parseInt(e.target.value, 10);
    navigate(`/calendar/${year}/${selectedWeek}`);
  };

  // Handle direct navigation to another year
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = parseInt(e.target.value, 10);
    navigate(`/calendar/${selectedYear}/${week}`);
  };

  // Handle task completion toggle
  const handleTaskCompletion = (task: TaskWithPlantDetails) => {
    // Determine which year the task belongs to
    let taskYear;
    if (task.week_number === week) {
      taskYear = year;
    } else if (task.week_number === nextWeek) {
      taskYear = nextWeekYear;
    } else {
      taskYear = followingWeekYear;
    }

    completeTaskMutation.mutate({
      taskId: task.id,
      plantId: task.plant_id,
      completed: !task.isCompletedThisYear,
      year: taskYear,
    });
  };

  return (
    <div className="container p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Tuinkalender</h1>
        <p className="text-gray-600">
          Bekijk en beheer je geplande taken per week voor het jaar {year}.
        </p>
      </div>

      {/* Week navigation controls */}
      <div className="flex flex-wrap items-center justify-between mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
        <Button
          onClick={() =>
            navigate(`/calendar/${previousWeekYear}/${previousWeek}`)
          }
          variant="secondary"
          className="flex items-center mb-2 sm:mb-0"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Vorige week
        </Button>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Jaar:</span>
            <select
              value={year}
              onChange={handleYearChange}
              className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
            >
              {yearRange.map((yearOption) => (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                  {yearOption === currentSystemYear ? " (huidig)" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Week:</span>
            <select
              value={week}
              onChange={handleWeekChange}
              className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
            >
              {Array.from({ length: 52 }, (_, i) => i + 1).map((weekNum) => (
                <option key={weekNum} value={weekNum}>
                  Week {weekNum}
                  {weekNum === currentSystemWeek && year === currentSystemYear
                    ? " (nu)"
                    : ""}
                </option>
              ))}
            </select>
          </div>

          <Button
            onClick={() =>
              navigate(`/calendar/${currentSystemYear}/${currentSystemWeek}`)
            }
            variant="secondary"
            className="text-sm"
          >
            Huidige week
          </Button>
        </div>

        <Button
          onClick={() => navigate(`/calendar/${nextWeekYear}/${nextWeek}`)}
          variant="secondary"
          className="flex items-center mb-2 sm:mb-0"
        >
          Volgende week
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </Button>
      </div>

      {isLoading && (
        <div className="text-center py-10">
          <p className="text-gray-500">Taken laden...</p>
        </div>
      )}

      {hasError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Er is een fout opgetreden bij het ophalen van de taken.
        </div>
      )}

      {!isLoading && !hasError && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Selected Week */}
          <WeekTasksCard
            weekNumber={week}
            tasks={currentWeekTasks}
            onTaskComplete={handleTaskCompletion}
            isCurrentWeek={
              week === currentSystemWeek && year === currentSystemYear
            }
            selectedYear={year}
          />

          {/* Next Week */}
          <WeekTasksCard
            weekNumber={nextWeek}
            tasks={nextWeekTasks}
            onTaskComplete={handleTaskCompletion}
            isCurrentWeek={
              nextWeek === currentSystemWeek &&
              nextWeekYear === currentSystemYear
            }
            selectedYear={nextWeekYear}
          />

          {/* Week after next */}
          <WeekTasksCard
            weekNumber={followingWeek}
            tasks={followingWeekTasks}
            onTaskComplete={handleTaskCompletion}
            isCurrentWeek={
              followingWeek === currentSystemWeek &&
              followingWeekYear === currentSystemYear
            }
            selectedYear={followingWeekYear}
          />
        </div>
      )}
    </div>
  );
};
