import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import {
  useBordersQuery,
  useAddBorderMutation,
  useUpdateBorderMutation,
  useDeleteBorderMutation,
} from "../hooks/useBorders";
import type { BorderData } from "../api/fetchBorders";

export const BordersPage = () => {
  const { data: borders, isLoading, error } = useBordersQuery();
  const addBorderMutation = useAddBorderMutation();
  const updateBorderMutation = useUpdateBorderMutation();
  const deleteBorderMutation = useDeleteBorderMutation();

  const [newBorderName, setNewBorderName] = useState("");
  const [editingBorder, setEditingBorder] = useState<BorderData | null>(null);

  const handleAddBorder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBorderName.trim()) return;

    try {
      await addBorderMutation.mutateAsync({ name: newBorderName });
      setNewBorderName("");
    } catch (error) {
      console.error("Failed to add border:", error);
    }
  };

  const handleUpdateBorder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBorder || !editingBorder.name.trim()) return;

    try {
      await updateBorderMutation.mutateAsync(editingBorder);
      setEditingBorder(null);
    } catch (error) {
      console.error("Failed to update border:", error);
    }
  };

  const handleDeleteBorder = async (id: string) => {
    if (window.confirm("Weet je zeker dat je deze border wilt verwijderen?")) {
      try {
        await deleteBorderMutation.mutateAsync(id);
      } catch (error) {
        console.error("Failed to delete border:", error);
      }
    }
  };

  return (
    <div className="container p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Borders beheren</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left column: Add/Edit border form */}
        <div>
          <Card>
            <h2 className="text-xl font-semibold mb-4">
              {editingBorder ? "Border bewerken" : "Nieuwe border toevoegen"}
            </h2>
            <form
              onSubmit={editingBorder ? handleUpdateBorder : handleAddBorder}
            >
              <div className="mb-4">
                <label
                  htmlFor="borderName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Naam
                </label>
                <Input
                  id="borderName"
                  type="text"
                  value={editingBorder ? editingBorder.name : newBorderName}
                  onChange={(e) =>
                    editingBorder
                      ? setEditingBorder({
                          ...editingBorder,
                          name: e.target.value,
                        })
                      : setNewBorderName(e.target.value)
                  }
                  placeholder="Naam van de border"
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={
                    addBorderMutation.isPending ||
                    updateBorderMutation.isPending
                  }
                >
                  {editingBorder ? "Opslaan" : "Toevoegen"}
                </Button>
                {editingBorder && (
                  <Button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                    onClick={() => setEditingBorder(null)}
                  >
                    Annuleren
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </div>

        {/* Right column: List of borders */}
        <div>
          <Card>
            <h2 className="text-xl font-semibold mb-4">Jouw borders</h2>
            {isLoading && <p className="text-gray-600">Borders laden...</p>}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                Er is een fout opgetreden bij het ophalen van de borders.
              </div>
            )}

            {borders && borders.length === 0 && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-4">
                <p>Je hebt nog geen borders toegevoegd.</p>
              </div>
            )}

            {borders && borders.length > 0 && (
              <ul className="divide-y divide-gray-200">
                {borders.map((border) => (
                  <li
                    key={border.id}
                    className="py-3 flex justify-between items-center"
                  >
                    <span className="text-gray-900">{border.name}</span>
                    <div className="flex gap-2">
                      <button
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        onClick={() => setEditingBorder(border)}
                      >
                        Bewerken
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                        onClick={() => handleDeleteBorder(border.id)}
                      >
                        Verwijderen
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
