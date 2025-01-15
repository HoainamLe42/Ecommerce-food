import { CSSProperties, useState } from 'react';

interface CustomCSSProperties extends CSSProperties {
    '--i'?: string;
    '--j'?: string;
}

const Test = () => {
    const [container, setContainer] = useState<boolean>(false);

    return (
        <div className="test-2025">
            <div
                onClick={() => setContainer(!container)}
                className={`container-test ${container ? 'newyear' : ''}`}
            >
                <div
                    className="text"
                    style={{ '--j': '0' } as CustomCSSProperties}
                >
                    <span style={{ '--i': '0' } as CustomCSSProperties}>2</span>
                    <span style={{ '--i': '1' } as CustomCSSProperties}>3</span>
                    <span style={{ '--i': '2' } as CustomCSSProperties}>4</span>
                    <span style={{ '--i': '3' } as CustomCSSProperties}>5</span>
                </div>
                <div
                    className="text"
                    style={{ '--j': '1' } as CustomCSSProperties}
                >
                    <span style={{ '--i': '0' } as CustomCSSProperties}>0</span>
                    <span style={{ '--i': '1' } as CustomCSSProperties}>1</span>
                    <span style={{ '--i': '2' } as CustomCSSProperties}>2</span>
                    <span style={{ '--i': '3' } as CustomCSSProperties}>3</span>
                </div>
                <div
                    className="text"
                    style={{ '--j': '2' } as CustomCSSProperties}
                >
                    <span style={{ '--i': '0' } as CustomCSSProperties}>2</span>
                    <span style={{ '--i': '1' } as CustomCSSProperties}>3</span>
                    <span style={{ '--i': '2' } as CustomCSSProperties}>4</span>
                    <span style={{ '--i': '3' } as CustomCSSProperties}>5</span>
                </div>
                <div
                    className="text"
                    style={{ '--j': '3' } as CustomCSSProperties}
                >
                    <span style={{ '--i': '0' } as CustomCSSProperties}>4</span>
                    <span style={{ '--i': '1' } as CustomCSSProperties}>3</span>
                    <span style={{ '--i': '2' } as CustomCSSProperties}>6</span>
                    <span style={{ '--i': '3' } as CustomCSSProperties}>5</span>
                </div>
            </div>

            {/* <h2
                onClick={() => {
                    setH2(!h2);
                    setContainer(!container);
                }}
                className={`${h2 ? 'active' : ''}`}
            >
                Happy New Year
            </h2>
            <div className="glowing">
                <span style={{ '--i': '1' } as CustomCSSProperties}></span>
                <span style={{ '--i': '2' } as CustomCSSProperties}></span>
                <span style={{ '--i': '3' } as CustomCSSProperties}></span>
            </div>

            <div className="glowing">
                <span style={{ '--i': '1' } as CustomCSSProperties}></span>
                <span style={{ '--i': '2' } as CustomCSSProperties}></span>
                <span style={{ '--i': '3' } as CustomCSSProperties}></span>
            </div>

            <div className="glowing">
                <span style={{ '--i': '1' } as CustomCSSProperties}></span>
                <span style={{ '--i': '2' } as CustomCSSProperties}></span>
                <span style={{ '--i': '3' } as CustomCSSProperties}></span>
            </div>

            <div className="glowing">
                <span style={{ '--i': '1' } as CustomCSSProperties}></span>
                <span style={{ '--i': '2' } as CustomCSSProperties}></span>
                <span style={{ '--i': '3' } as CustomCSSProperties}></span>
            </div> */}
        </div>
    );
};

export default Test;
