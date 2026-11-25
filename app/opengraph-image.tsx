import { ImageResponse } from 'next/og';
import { getBrandConfig } from '@/lib/content-loader';

export const alt = 'CoWorkingStay — Your best workday starts here.';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const brand = await getBrandConfig();

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(135deg, #0C4A96 0%, #0158F5 60%, #03B1F7 100%)',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                height: '52px',
                width: '52px',
                borderRadius: '14px',
                backgroundColor: 'rgba(255, 255, 255, 0.16)',
                border: '2px solid rgba(255, 255, 255, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 800,
                letterSpacing: '-0.03em',
              }}
            >
              CWS
            </div>
            <span
              style={{
                fontSize: '30px',
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              {brand.identity.name}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              padding: '10px 22px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.14)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              fontSize: '18px',
              fontWeight: 600,
            }}
          >
            Philippines • Coworking Hotels
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '960px',
          }}
        >
          <div
            style={{
              fontSize: '68px',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Your best workday</span>
            <span style={{ color: '#03D2D8' }}>starts here.</span>
          </div>
          <div
            style={{
              fontSize: '28px',
              lineHeight: 1.4,
              color: 'rgba(255, 255, 255, 0.88)',
            }}
          >
            {brand.identity.subTag}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: '24px',
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          <div style={{ display: 'flex', gap: '28px', fontWeight: 600 }}>
            <span>Work &apos;n Wave • Puerto Galera</span>
            <span>Work &apos;n Lake • Cavinti</span>
            <span>Work &apos;n Surf • La Union</span>
          </div>
          <span style={{ fontWeight: 700, color: '#FFFFFF' }}>coworkingstay.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
