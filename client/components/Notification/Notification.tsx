import * as React from 'react';
import { Snackbar } from 'material-ui';

type Vertical = 'top' | 'bottom';
type Horizontal = 'left' | 'right' | 'center';

interface NotificationProps {
    open: boolean,
    vertical: Vertical,
    horizontal: Horizontal,
    message: string,
    close: (e: React.SyntheticEvent<any>, reason: string) => void
}

export const Notification = ({ open, vertical, horizontal, message, close }: NotificationProps) => (
    <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        SnackbarContentProps={{
            'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{message}</span>}
        autoHideDuration={5000}
        onClose={close}
    />
) 