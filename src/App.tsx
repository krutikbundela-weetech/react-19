import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import UseTransitionPage from "./pages/useTransitionPage";
import ActionsPage from "./pages/ActionsPage";
import UseActionStatePage from "./pages/UseActionStatePage";
import UseFormStatusPage from "./pages/UseFormStatusPage";
import UseOptimisticPage from "./pages/UseOptimisticPage";
import RefsAsPropsPage from "./pages/RefsAsPropsPage";
import UseWithPromisesPage from "./pages/UseWithPromisesPage";
import UseWithContextPage from "./pages/UseWithContextPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="use-transition" element={<UseTransitionPage />} />
        <Route path="actions" element={<ActionsPage />} />
        <Route path="use-action-state" element={<UseActionStatePage />} />
        <Route path="use-form-status" element={<UseFormStatusPage />} />
        <Route path="use-optimistic" element={<UseOptimisticPage />} />
        <Route path="refs-as-props" element={<RefsAsPropsPage />} />
        <Route path="use-with-promises" element={<UseWithPromisesPage />} />
        <Route path="use-with-context" element={<UseWithContextPage />} />
      </Route>
    </Routes>
  );
}

export default App;
