import { StrictMode, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { store, persistor } from "@/store/store";
import { queryClient } from "@/shared/lib/queryClient";
import { ErrorBoundary } from "./ErrorBoundary";
import App from "./App";
import { PageLoader } from "@/shared/components/PageLoader";

export function Providers() {
  return (
    <StrictMode>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <BrowserRouter>
                <Suspense fallback={<PageLoader />}>
                  <App />
                </Suspense>
              </BrowserRouter>
            </PersistGate>
          </Provider>
        </QueryClientProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}
