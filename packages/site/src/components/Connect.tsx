import { Button } from '@mui/material'
import { useConnect, useDisconnect } from 'wagmi'

export function Connect() {
  const {
    activeConnector,
    connect,
    connectors,
    error,
    isConnecting,
    pendingConnector,
  } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div>
      <div>
        {activeConnector && (
          <Button onClick={() => disconnect()}>
            Disconnect from {activeConnector.name}
          </Button>
        )}

        {connectors
          .filter((x) => x.ready && x.id !== activeConnector?.id)
          .map((x) => (
            <Button key={x.id} onClick={() => connect(x)}>
              {x.name}
              {isConnecting && x.id === pendingConnector?.id && ' (connecting)'}
            </Button>
          ))}
      </div>

      {error && <div>{error.message}</div>}
    </div>
  )
}