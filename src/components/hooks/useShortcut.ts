import { useEffect, useCallback, useRef, useLayoutEffect } from 'react';

export const useShortcut = (
    shortcut: string,
    callback: (event: KeyboardEvent) => void,
    options = { disableTextInputs: true }
) => {
    const callbackRef = useRef(callback);

    useLayoutEffect(() => {
        callbackRef.current = callback;
    });

    const handleKeyDown = useCallback((event: KeyboardEvent | MouseEvent) => {
        const isTextInput =
            event.target instanceof HTMLTextAreaElement ||
            (event.target instanceof HTMLInputElement &&
                (!event.target?.type || event.target?.type === 'text')) ||
            (event.target as HTMLElement)?.isContentEditable;

        if (options.disableTextInputs && isTextInput) {
            return event.stopPropagation()
        }

        const modifierMap = {
            Control: event.ctrlKey,
            Alt: event.altKey,
            Command: event.metaKey,
            Shift: event.shiftKey,
        };

        if (shortcut.includes('+')) {
            const keyArray = shortcut.split('+');
            if (Object.keys(modifierMap).includes(keyArray[0])) {
                const finalKey = keyArray.pop();
                if (keyArray.every((k) => modifierMap[k as keyof typeof modifierMap]) && finalKey === (event as KeyboardEvent).key) {
                    return callbackRef.current(event as KeyboardEvent);
                }
            }
        }

        if (shortcut === (event as KeyboardEvent).key) {
            return callbackRef.current(event as KeyboardEvent);
        }
    }, [options.disableTextInputs, shortcut]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [handleKeyDown]);
};
