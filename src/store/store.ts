// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default to localStorage
import { combineReducers } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import companyReducer from "./companySlice";
import blogReducer from "./blogSlice";
import categoryReducer from "./categorySlice";
import propertyReducer from "./propertySlice";
import testimonialReducer from "./testimonialSlice";
import bannerReducer from "./bannerSlice";
import careerReducer from "./careerSlice";
import aboutUsReducer from "./aboutUsSlice";
import gallaryReducer from "./gallarySlice";
const rootReducer = combineReducers({
  company: companyReducer,
  blog: blogReducer,
  category: categoryReducer,
  property: propertyReducer,
  testimonial: testimonialReducer,
  banner: bannerReducer,
  career: careerReducer,
  aboutUs : aboutUsReducer,
  gallary: gallaryReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["testimonial", "company", "blog", "category"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);

export default store;
