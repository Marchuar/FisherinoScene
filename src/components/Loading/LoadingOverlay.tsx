import { Html, useProgress } from "@react-three/drei";

function LoadingOverlay() {
    const { active, progress } = useProgress();

    return active ? (
        <Html fullscreen>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 0, 0, 0.8)',
                flexDirection: 'column',
                color: 'white',
            }}>
                <div style={{
                    width: '300px',
                    height: '10px',
                    background: '#333',
                    borderRadius: '5px',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #00ff88, #0088ff)',
                        transition: 'width 0.2s ease'
                    }}></div>
                </div>
                <p style={{ marginTop: '10px', fontSize: '14px' }}>{progress.toFixed(0)}%</p>
            </div>
        </Html>
    ) : null;
}

export default LoadingOverlay;