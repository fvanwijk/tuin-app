import { useQuery } from "@tanstack/react-query";
import { supabase } from "./lib/supabase/client";

function App() {
  const { data: plants } = useQuery({
    queryKey: ["plants"],
    queryFn: async () => await supabase.from("plants").select(),
    select: ({ data }) => data,
  });

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
}
export default App;
