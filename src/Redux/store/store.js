import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducers/reducerIndex";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "rootReducer",
  storage: storage,
  whitelist: ["auth"], // which reducer want to store
};

const pReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};

const middleWare = [thunk];

const store = createStore(
  pReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

const persistor = persistStore(store);

export { persistor, store };
