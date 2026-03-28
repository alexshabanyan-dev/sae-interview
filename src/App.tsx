import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import { ClosuresPage, JsTopicsPage } from "./topics/js/closures";
import { EventLoopPage } from "./topics/js/eventLoop/EventLoopPage";
import { PromisesPage } from "./topics/js/promises/PromisesPage";
import { ThisBindingPage } from "./topics/js/thisBinding/ThisBindingPage";
import { NetworkTopicsPage } from "./topics/browser/NetworkTopicsPage";
import { HttpProtocolPage } from "./topics/browser/http/HttpProtocolPage";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/topics/browser" element={<NetworkTopicsPage />} />
        <Route path="/topics/browser/http" element={<HttpProtocolPage />} />
        <Route path="/topics/js" element={<JsTopicsPage />} />
        <Route path="/topics/js/closures" element={<ClosuresPage />} />
        <Route path="/topics/js/event-loop" element={<EventLoopPage />} />
        <Route path="/topics/js/this" element={<ThisBindingPage />} />
        <Route path="/topics/js/promises" element={<PromisesPage />} />
      </Route>
    </Routes>
  );
}
