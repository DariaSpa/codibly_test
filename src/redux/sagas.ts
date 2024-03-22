import { all } from 'redux-saga/effects';
import productSaga from './reducers/productSaga';

function* rootSaga() {
    yield all([productSaga()]);
}

export default rootSaga;