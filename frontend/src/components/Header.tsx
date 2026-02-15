import { useState, useEffect } from "react";
import { Bell, Clock } from "lucide-react";

interface HeaderProps {
    isConnected: boolean;
}

export default function Header({ isConnected }: HeaderProps) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    };

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <span className="text-sm font-medium text-slate-400 hover:text-white cursor-pointer">
                                Plant Facility
                            </span>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <span className="text-slate-600">/</span>
                                <span className="ml-1 text-sm font-medium text-white md:ml-2">
                                    Production Monitoring
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-1.5 font-mono text-sm text-slate-300 md:flex">
                    <Clock size={16} className="text-blue-400" />
                    <span>{formatDate(time)}</span>
                    <span className="text-slate-600">|</span>
                    <span className="text-white tabular-nums">{formatTime(time)}</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border transition-colors duration-300 ${isConnected
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                        : "border-rose-500/20 bg-rose-500/10 text-rose-400"
                        }`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${isConnected ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}></div>
                        {isConnected ? "SYSTEM ACTIVE" : "OFFLINE"}
                    </div>

                    <button className="relative rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                        <Bell size={20} />
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500"></span>
                    </button>

                    <div className="h-8 w-px bg-slate-800 mx-1"></div>
                </div>
            </div>
        </header>
    );
}
