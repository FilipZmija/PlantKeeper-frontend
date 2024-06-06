import PlantProp from "./PlantProp";

export type TPlantCareInfoProps = {
  soliMoisture: number | null;
  desiredMoisture: number | null;
};

export const PlantCareInfo: React.FC<TPlantCareInfoProps> = ({
  soliMoisture,
  desiredMoisture,
}) => (
  <div
    className={`flex justify-center flex-col transition-all duration-300 ${
      false ? "min-w-64 min-h-32" : "min-w-10 min-h-10"
    }`}
  >
    {soliMoisture && <PlantProp name={"Soil moisture"} value={soliMoisture} />}
    {desiredMoisture && (
      <PlantProp name={"Desired moisture"} value={desiredMoisture} />
    )}
    <button className="text-text-green font-bold hover:bg-green bg-green bg-opacity-45 px-3 py-0.5 rounded-md active:scale-95">
      ADJUST
    </button>
  </div>
);
