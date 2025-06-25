import { Suspense, lazy, type JSX } from "react";
import { useParams } from "react-router-dom";
import type { WidgetType } from "../../store/widgetsSlice";

const CryptoWidget = lazy(() => import("../Widgets/CryptoWidget"));
const WeatherWidget = lazy(() => import("../Widgets/WeatherWidget"));
const TaskListWidget = lazy(() => import("../Widgets/TaskListWidget"));

const widgetComponentsMap: Record<WidgetType, JSX.Element> = {
  weather: <WeatherWidget key="weather" />,
  crypto: <CryptoWidget key="crypto" />,
  tasks: <TaskListWidget key="tasks" />,
};

const Dashboard = () => {
  const { widgetId } = useParams<{ widgetId: WidgetType }>();
  const widget = widgetId && widgetComponentsMap[widgetId];

  return (
    <main className="mt-2 pt-2 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-6">
      <Suspense fallback={<div>Loading widget...</div>}>
        {widget ? widget : <p>Widget not found</p>}
      </Suspense>
    </main>
  );
};

export default Dashboard;
