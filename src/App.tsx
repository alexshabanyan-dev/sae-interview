import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import { ClosuresPage, JsTopicsPage } from "./topics/js/closures";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/topics/js" element={<JsTopicsPage />} />
        <Route path="/topics/js/closures" element={<ClosuresPage />} />
      </Route>
    </Routes>
  );
}
