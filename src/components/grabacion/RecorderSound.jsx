import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

function RecorderSound() {
    const [dots, setDots] = useState('.');

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDots((prevDots) => {
                switch (prevDots) {
                    case '.':
                        return '..';
                    case '..':
                        return '...';
                    default:
                        return '.';
                }
            });
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <div className='flex justify-center items-center gap-5 absolute -top-28 -left-20 md:left-[350%] 2xl:left-[350px]'>
                <div className='w-20 h-20 flex justify-center text-blue-500 items-center text-5xl rounded-full overflow-hidden border'>
                    <FontAwesomeIcon icon={faMicrophone} />
                </div>
                <div className='w-20 h-20 flex justify-start items-center text-xl'>
                    <div className='flex gap-[1px]'>
                        Grabando <span className='font-semibold'>{dots}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RecorderSound;
