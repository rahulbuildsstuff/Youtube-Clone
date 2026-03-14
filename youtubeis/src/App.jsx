import Header from './Components/Header';
import Body from './Components/Body';
import VideoContainer from './Components/VideoContainer';
import WatchPage from './Components/WatchPage';
import SearchResults from './Components/SearchResults';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Layout with Header always visible
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AppLayout = () => {
  const theme = useSelector((store) => store.app.theme);

  // Sync Redux theme to DOM so Tailwind dark: classes apply
  useEffect(() => {
    const root = document.documentElement;
    const isDark = (theme || "light").toLowerCase() === "dark";
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f]">
      <Header />
      <Outlet />
    </div>
  );
};


// HomePage shows Body/sidebar + VideoContainer
const HomePage = () => {
  return (
    <div className="flex overflow-x-hidden">
      <Body />             {/* Sidebar / menu */}
      <VideoContainer />   {/* Main content */}
    </div>
  );
};

// App routing
function App() {

  const approuter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "watch", element: <WatchPage /> },
        { path: "results", element: <SearchResults /> }
      ]
    }
  ]);

  return <RouterProvider router={approuter} />;
}

export default App;
