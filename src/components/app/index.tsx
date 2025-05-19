import {useCallback, useState} from 'react';
import { useShortcut } from '../hooks/useShortcut.ts';
import './app.css';

function App() {
    const [count, setCount] = useState(0);

    const handleA = useCallback(() => {
        setCount(prev => prev + 1);
    }, []);
    const handleW = useCallback(() => {
        setCount(prev => prev * 2);
    }, []);
    const handleControlC = useCallback(() => {
        setCount(prev => prev * 3);
    }, []);
    const handleCommandShiftX = useCallback(() => {
        setCount(prev => prev * 4);
    }, []);

    useShortcut('a', handleA);
    useShortcut('w', handleW);
    useShortcut('Control+c', handleControlC);
    useShortcut('Command+Shift+x', handleCommandShiftX);

    return (
        <div className="container">
            <button type="button" onClick={() => setCount((prev) => prev + 1)}>
                {`Count: ${count}`}
            </button>
            <button type="button" onClick={() => setCount(0)}>
                Clear
            </button>
            <input type="text" placeholder="Type a shortcut key"/>
            <div contentEditable="true" id="editor">Please type something in here</div>
        </div>
    )
}

export default App
