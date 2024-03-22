import React from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CloseModalButtonProps {
    onClose: () => void;
}

const CloseModalButton: React.FC<CloseModalButtonProps> = ({ onClose }) => {

    return (
        <IconButton
            sx={{
                position: 'absolute',
                top: 30,
                right: 30,
            }}
            onClick={onClose}
            aria-label="Close"
        >
            <CloseIcon />
        </IconButton>
    );
};

export default CloseModalButton;
