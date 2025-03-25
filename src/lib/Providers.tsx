"use client";

import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster position="top-right" richColors />
          {children}
        </PersistGate>
      </Provider>
    </div>
  );
};

export default Providers;
