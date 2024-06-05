export type TPlant = {
  id: number;
  name: string;
  apiId?: string;
  commonName?: string;
  avaibility?: string;
  lightTolerated?: string;
  lightIdeal?: string;
  temperatureMax?: number;
  temperatureMin?: number;
  watering?: string;
  climat?: string;
  img?: string;
};

export type TOwnedPlant = {
  id: number;
  name: string;
  commonName: string | null;
  lastWatered: string | null;
  lastTransplanted: string | null;
  soliMoisture: string | null;
  desiredMoisture: string | null;
  wateringType: string;
  plantId: number;
  image: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  plant: TPlant;
};
