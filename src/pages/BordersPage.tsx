import { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import {
  useBordersQuery,
  useAddBorderMutation,
  useUpdateBorderMutation,
  useDeleteBorderMutation,
  useBorderByIdQuery,
} from "../hooks/useBorders";
import type { BorderData } from "../api/fetchBorders";
import {
  BorderFormDialog,
  DeleteBorderDialog,
} from "../components/borders/BorderDialogs";

export const BordersPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const isNewRoute = location.pathname === "/borders/new";
  const isEditRoute = location.pathname.includes("/edit") && !!id;

  const { data: borders, isLoading, error } = useBordersQuery();
  const { data: borderToEdit } = useBorderByIdQuery(
    isEditRoute ? id : undefined
  );
  const addBorderMutation = useAddBorderMutation();
  const updateBorderMutation = useUpdateBorderMutation();
  const deleteBorderMutation = useDeleteBorderMutation();

  // Only keep the dialog state for delete confirmation, since it doesn't have a dedicated route
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Form states
  const [editingBorder, setEditingBorder] = useState<BorderData | null>(null);
  const [borderToDelete, setBorderToDelete] = useState<BorderData | null>(null);

  // When route changes to /borders/:id/edit and we have the border data, update the editing state
  useEffect(() => {
    if (isEditRoute && borderToEdit) {
      setEditingBorder(borderToEdit);
    }
  }, [isEditRoute, borderToEdit]);

  const openEditDialog = (border: BorderData) => {
    navigate(`/borders/${border.id}/edit`);
  };

  const openDeleteDialog = (border: BorderData) => {
    setBorderToDelete(border);
    setIsDeleteDialogOpen(true);
  };

  const closeAddDialog = () => {
    if (location.pathname === "/borders/new") {
      navigate("/borders");
    }
  };

  const closeEditDialog = () => {
    setEditingBorder(null);
    if (location.pathname.includes("/edit")) {
      navigate("/borders");
    }
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setBorderToDelete(null);
  };

  const handleBorderSubmit = async (data: { name: string; id?: string }) => {
    try {
      if (data.id) {
        // Update existing border
        await updateBorderMutation.mutateAsync({
          name: data.name,
          id: data.id,
        });
        closeEditDialog();
      } else {
        // Add new border
        await addBorderMutation.mutateAsync({ name: data.name });
        closeAddDialog();
      }
    } catch (error) {
      console.error("Failed to save border:", error);
    }
  };

  const handleDeleteBorder = async () => {
    if (!borderToDelete) return;

    try {
      await deleteBorderMutation.mutateAsync(borderToDelete.id!);
      closeDeleteDialog();
    } catch (error) {
      console.error("Failed to delete border:", error);
    }
  };

  return (
    <div className="container p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Borders beheren</h1>
        <Link to="/borders/new">
          <Button>Nieuwe border toevoegen</Button>
        </Link>
      </div>

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
                    onClick={() => openEditDialog(border)}
                  >
                    Bewerken
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                    onClick={() => openDeleteDialog(border)}
                  >
                    Verwijderen
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Form Dialog for Add */}
      <BorderFormDialog
        isOpen={isNewRoute}
        onClose={closeAddDialog}
        onSubmit={handleBorderSubmit}
        isSubmitting={addBorderMutation.isPending}
      />

      {/* Form Dialog for Edit */}
      <BorderFormDialog
        isOpen={isEditRoute}
        onClose={closeEditDialog}
        onSubmit={handleBorderSubmit}
        isSubmitting={updateBorderMutation.isPending}
        border={editingBorder}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteBorderDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDeleteBorder}
        isDeleting={deleteBorderMutation.isPending}
        borderName={borderToDelete?.name}
      />
    </div>
  );
};
