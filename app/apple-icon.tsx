import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0C4A96 0%, #0158F5 65%, #03B1F7 100%)',
          borderRadius: '38px',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
          fontSize: '64px',
          fontWeight: 800,
          letterSpacing: '-0.04em',
        }}
      >
        CWS
      </div>
    ),
    {
      ...size,
    }
  );
}
