import * as React from "react";
import { useConnect, useDisconnect } from "wagmi";
import { Button, ButtonProps, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

interface AuthButtonProps extends ButtonProps { }

const AuthButton: React.FunctionComponent<AuthButtonProps> = (props) => {
    const {
        activeConnector,
        connect,
        connectors,
        error,
        isConnecting,
        pendingConnector,
    } = useConnect()
    const { disconnect } = useDisconnect()
    const [isOpen, setOpen] = useState<null | HTMLElement>(null);

    const handleClose = () => {
        setOpen(null);
    };

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(event.currentTarget);
    };

    const handleConnect = (x: any) => {
        connect(x)
        handleClose()
    }

    React.useEffect(() => {
        if (error) {
            console.error(error);
        }
    }, [error])

    if (!activeConnector) {
        return (
            <>
                <Button
                    {...props}
                    onClick={handleOpen}
                >
                    Connect Wallet
                </Button>
                <Menu
                    keepMounted
                    anchorEl={isOpen}
                    onClose={handleClose}
                    open={Boolean(isOpen)}
                >
                    {
                        connectors
                            .map((x) => (
                                <MenuItem disabled={!x.ready} key={x.name} onClick={() => handleConnect(x)}>
                                    {x.name}
                                    {!x.ready && " (unsupported)"}
                                    {isConnecting && x.id === pendingConnector?.id && ' (connecting)'}
                                </MenuItem>
                            ))
                    }
                </Menu>
            </>
        );
    }

    return <Button {...props} onClick={() => disconnect()}>Discount</Button>;
}

export default AuthButton;