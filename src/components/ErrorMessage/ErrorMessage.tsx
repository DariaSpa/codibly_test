import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { selectError, setError } from '../../redux/reducers/productSlice';


const ErrorMessage: React.FC = () => {
    const error = useSelector(selectError);

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setError({ show: false, message: '' }));
    };

    return (
        <Snackbar open={error.show} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                {error.message}
            </Alert>
        </Snackbar>
    );
};

export default ErrorMessage;
