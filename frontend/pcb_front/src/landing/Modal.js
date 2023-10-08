import { useEffect } from 'react';

export default function Modal({
                   visible = false,
                   content = '',
                   closeFunc,
               }) {

    const onKeydown = ({key}) => {
        switch (key) {
            case 'Escape':
                closeFunc()
                break
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeydown)
        return () => document.removeEventListener('keydown', onKeydown)
    })


    // если компонент невидим, то не отображаем его
    if (!visible) return null;
    return (content)}