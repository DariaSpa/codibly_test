import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import productReducer from '../redux/reducers/productSlice';
import rootSaga from '../redux/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        product: productReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
