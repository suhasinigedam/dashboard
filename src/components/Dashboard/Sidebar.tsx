import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "../../store";
import { setActiveWidget, type WidgetType } from "../../store/widgetsSlice";
import { useNavigate, useParams } from "react-router-dom";

const WIDGETS: { id: WidgetType; label: string }[] = [
  { id: "crypto", label: "Crypto" },
  { id: "weather", label: "Weather" },
  { id: "tasks", label: "Task List" },
];

const Sidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { widgetId } = useParams<{ widgetId?: WidgetType }>();
  const activeWidget = useSelector(
    (state: RootState) => state.widgets.activeWidget
  );

  // Keep Redux in sync with current route
  useEffect(() => {
    if (widgetId && widgetId !== activeWidget) {
      dispatch(setActiveWidget(widgetId));
    }
  }, [widgetId, dispatch, activeWidget]);

  const handleClick = (widget: WidgetType) => {
    navigate(`/dashboard/${widget}`);
    dispatch(setActiveWidget(widget));
  };

  return (
    <aside className="w-64 dark:bg-gray-800 dark:text-white text-black h-screen p-6 fixed border-r border-gray-300 dark:border-gray-700">
      <nav>
        <ul className="space-y-4">
          {WIDGETS.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => handleClick(id)}
                className={`dark:text-gray-300 dark:bg-gray-800 text-gray-800 bg-gray-100 w-full text-left px-3 py-2 rounded ${
                  widgetId === id
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "hover:bg-gray-700"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
