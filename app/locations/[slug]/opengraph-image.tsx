import { ImageResponse } from 'next/og';
import { getLocation } from '@/lib/content-loader';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function LocationOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = await getLocation(slug);

  const name = location?.name || 'CoWorkingStay';
  const tagline = location?.tagline || 'Your best workday starts here.';
  const address = location?.address || 'Philippines';
  const status = location?.status || 'Soon';

  const isLake = slug.includes('lake');
  const isSurf = slug.includes('surf');
  const accentColor = isLake ? '#03D2D8' : isSurf ? '#E8704F' : '#03B1F7';

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
          background: 'linear-gradient(135deg, #092E5E 0%, #0C4A96 55%, #0158F5 100%)',
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
          <span
            style={{
              fontSize: '26px',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            CoWorkingStay
          </span>
          <div
            style={{
              display: 'flex',
              padding: '10px 24px',
              borderRadius: '999px',
              backgroundColor: accentColor,
              color: '#FFFFFF',
              fontSize: '18px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {status}
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
              fontSize: '74px',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: '36px',
              fontWeight: 600,
              color: accentColor,
              lineHeight: 1.3,
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: '24px',
            fontSize: '22px',
            color: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          <span>{address}</span>
          <span style={{ fontWeight: 700, color: '#FFFFFF' }}>coworkingstay.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
