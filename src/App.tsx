import { Header } from "./components/layout/Header";
import { SortingPage } from "./pages/SortingPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="p-6">
        <SortingPage />
      </main>
    </div>
  );
}

export default App;
