'use client';

import Link from 'next/link';
import Image from 'next/image';

interface ComingSoonProps {
  title: string;
  description?: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0A0A', padding: '80px 24px' }}>
      <div className="text-center max-w-2xl">
        <Link href="/" className="inline-block mb-12">
          <Image src="/images/viu-logo.svg" alt="Viu" width={120} height={44} />
        </Link>

        <div
          className="mb-8"
          style={{
            width: '120px',
            height: '120px',
            margin: '0 auto',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFBF00, #FFD700)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg className="w-16 h-16" fill="none" stroke="#0A0A0A" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#FFBF00' }}>
          {title}
        </h1>

        <p className="text-xl md:text-2xl mb-8" style={{ color: '#B3B3B3' }}>
          Coming Soon
        </p>

        {description && (
          <p className="text-base mb-12" style={{ color: '#666', lineHeight: 1.7 }}>
            {description}
          </p>
        )}

        <Link
          href="/"
          className="inline-flex items-center justify-center transition-all"
          style={{
            padding: '14px 32px',
            background: '#FFBF00',
            color: '#0A0A0A',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 600,
            gap: '8px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#FFD700';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FFBF00';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          กลับหน้าหลัก
        </Link>
      </div>
    </div>
  );
}
