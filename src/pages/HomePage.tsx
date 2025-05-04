import { usePlants } from "../hooks/usePlants";

export const HomePage = () => {
  const { data: plants } = usePlants();

  return (
    <div className="container p-4">
      <h1 className="text-5xl font-bold mb-4">Mijn planten</h1>
      <ul className="list-disc list-inside">
        {plants?.map((plant) => (
          <li key={plant.name}>{plant.name}</li>
        ))}
      </ul>
    </div>
  );
};
