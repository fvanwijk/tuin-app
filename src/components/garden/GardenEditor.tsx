import { Garden } from '../../api/fetchGarden';
import { GardenDrawMode } from './GardenDrawMode';
import { GardenEditMode } from './GardenEditMode';
import { GardenViewMode } from './GardenViewMode';
import { GardenMode } from './GardenVisualization';

interface GardenEditorProps {
  floorplanUrl: string;
  garden: Garden;
  mode: GardenMode;
}

export const GardenEditor: React.FC<GardenEditorProps> = ({ floorplanUrl, garden, mode }) => {
  if (mode === 'view') {
    return <GardenViewMode floorplanUrl={floorplanUrl} garden={garden} />;
  }

  if (mode === 'edit') {
    return <GardenEditMode floorplanUrl={floorplanUrl} garden={garden} />;
  }

  // Draw mode is the default fallback
  return <GardenDrawMode floorplanUrl={floorplanUrl} garden={garden} />;
};
