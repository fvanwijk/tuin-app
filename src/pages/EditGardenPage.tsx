import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useGarden } from '../hooks/useGarden';

export const EditGardenPage = () => {
  const { garden, isLoading, updateGarden, isUpdating, uploadFloorplan, isUploading } = useGarden();
  const navigate = useNavigate();

  const [width, setWidth] = useState<number>(garden?.width || 0);
  const [height, setHeight] = useState<number>(garden?.height || 0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(garden?.floorplan_path || null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (isLoading) {
    return <div className="text-center py-8">Loading garden data...</div>;
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create a preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleClearImage = () => {
    // Clear the selected file
    setSelectedFile(null);

    // Clear the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // If we're showing the existing floorplan image from the database,
    // we'll keep showing it (will be cleared on save)
    if (selectedFile) {
      setPreviewUrl(garden?.floorplan_path || null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const gardenData = {
      id: garden?.id,
      width,
      height,
      user_id: garden?.user_id,
    };

    if (selectedFile) {
      uploadFloorplan(
        { file: selectedFile, garden: gardenData },
        {
          onSuccess: () => {
            navigate('/garden');
          },
        },
      );
    } else {
      updateGarden(gardenData, {
        onSuccess: () => {
          navigate('/garden');
        },
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tuindetails bewerken</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Breedte (meter)</label>
            <Input
              type="number"
              min="0"
              step="0.1"
              value={width}
              onChange={(e) => setWidth(parseFloat(e.target.value))}
              required
              className="w-full max-w-xs"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Lengte (meter)</label>
            <Input
              type="number"
              min="0"
              step="0.1"
              value={height}
              onChange={(e) => setHeight(parseFloat(e.target.value))}
              required
              className="w-full max-w-xs"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Tuinplattegrond</label>
            <div className="flex items-center">
              <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
              <Button type="button" onClick={() => fileInputRef.current?.click()} className="mr-2" variant="outline">
                Bestand kiezen
              </Button>
              <span className="text-sm text-gray-500 mr-2">
                {selectedFile ? selectedFile.name : 'Geen bestand geselecteerd'}
              </span>
              {(selectedFile || previewUrl) && (
                <Button
                  type="button"
                  onClick={handleClearImage}
                  variant="outline"
                  className="text-red-500 border-red-300 hover:bg-red-50"
                >
                  Wissen
                </Button>
              )}
            </div>

            {previewUrl && (
              <div className="mt-4 border rounded-lg overflow-hidden" style={{ maxWidth: '400px' }}>
                <img src={previewUrl} alt="Garden floorplan preview" className="w-full h-auto" />
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isUpdating || isUploading}>
              {isUpdating || isUploading ? 'Bezig met opslaan...' : 'Opslaan'}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate('/garden')}>
              Annuleren
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};
