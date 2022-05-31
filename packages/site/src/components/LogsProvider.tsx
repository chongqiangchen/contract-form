import React, {useState} from 'react';

interface Log {
    status: 'success' | 'error' | 'info';
    message: string;
}

interface LogsContextProps {
    logs: Log[];
    addLog: (log: Log) => void;
    clearLog: () => void;
}

const LogsContext = React.createContext<LogsContextProps | null>(null);

const useLogsProvider = () => {
    const [logs, setLogs] = useState<any[]>([
        {
            status: 'success',
            message: '操作成功',
        },
        {
            status: 'error',
            message: '操作失败',
        }
    ]);

    const addLog = (log: any) => {
        setLogs([log, ...logs]);
    };

    const clearLog = () => {
        setLogs([]);
    };

    return {
        logs,
        addLog,
        clearLog,
    };
}

const LogsProvider = ({ children }: { children: React.ReactNode }) => {
    const { logs, addLog, clearLog } = useLogsProvider();

    return (
        <LogsContext.Provider value={{ logs, addLog, clearLog }}>
            {children}
        </LogsContext.Provider>
    );
}


export const useLogs = () => {
    return React.useContext(LogsContext) as LogsContextProps;
}

export default LogsProvider;

