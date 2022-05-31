import React, { useState } from "react";
import { Button, Menu, MenuItem, Stack } from "@mui/material";
import { useConnect, useNetwork } from "wagmi";
import AuthButton from "./AuthButton";


const AuthLogin: React.FC = () => {
    const {
        activeChain,
        chains,
        error,
        isLoading,
        pendingChainId,
        switchNetwork,
    } = useNetwork()
    const [isOpen, setOpen] = useState<null | HTMLElement>(null);

    const handleClose = () => {
        setOpen(null);
    };

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(event.currentTarget);
    };

    const handleConnect = (x: any) => {
        switchNetwork && switchNetwork(x.id)
        handleClose()
    }
        console.log(activeChain);
        
    return (
        <Stack direction="row">
            <Button variant="outlined" onClick={handleOpen}>
                <div>
                    {activeChain?.name ?? activeChain?.id}
                    {activeChain?.unsupported && ' (不支持)'}
                </div>
            </Button>
            <Menu
                keepMounted
                anchorEl={isOpen}
                onClose={handleClose}
                open={Boolean(isOpen)}
            >
                {switchNetwork && (
                    chains.map((x: any) =>
                        x.id === activeChain?.id ? null : (
                            <MenuItem key={x.id} onClick={() => handleConnect(x)}>
                                {x.name}
                                {isLoading && x.id === pendingChainId && ' (切换中)'}
                            </MenuItem>
                        ),
                    )
                )}
            </Menu>
            <AuthButton />
        </Stack>
    )
}

export default AuthLogin;