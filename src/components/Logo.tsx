import type { SVGProps } from 'react';
import { GLOBE_R, MERIDIAN_COUNT, lens, meridian } from '../lib/globe';

const PARALLELS = [55, 104.5, 134.5, 150];

const RING =
  'M155.9-145.4A213.2 81.5-43 1 0-155.9 145.4A213.2 81.5-43 1 0 155.9-145.4Z' +
  'M124.9-133.9A183.1 67.6-47 1 0-124.9 133.9A183.1 67.6-47 1 0 124.9-133.9Z';

const STAR =
  'M-2-30A2 2 0 0 1 2-30C2-18.5 18.5-2 30-2A2 2 0 0 1 30 2C18.5 2 2 18.5 2 30A2 2 0 0 1-2 30' +
  'C-2 18.5-18.5 2-30 2A2 2 0 0 1-30-2C-18.5-2-2-18.5-2-30Z';

function Wordmark(props: SVGProps<SVGTextElement>) {
  return (
    <text x={250} y={292} textAnchor="middle" fontFamily="Cosmic Octo" fontSize={105} {...props}>
      DAYSTROM
    </text>
  );
}

function SparklePair({ x, y, flip }: { x: number; y: number; flip?: boolean }) {
  const maskId = `sparkle-cut-${flip ? 'r' : 'l'}`;
  return (
    <g transform={`translate(${x} ${y})${flip ? ' rotate(180)' : ''}`}>
      <mask id={maskId}>
        <rect x={-40} y={-40} width={100} height={80} fill="white" />
        <path d={STAR} transform="translate(20.5 0)" fill="black" />
      </mask>
      <path d={STAR} mask={`url(#${maskId})`} />
      <path d={STAR} transform="translate(20.5 0)" fill="none" stroke="currentColor" strokeWidth={1.25} />
    </g>
  );
}

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="-80 70 660 360" fill="currentColor" role="img" aria-label="Daystrom" {...props}>
      <mask id="wordmark-halo">
        <rect x={-80} y={70} width={660} height={360} fill="white" />
        <Wordmark fill="black" stroke="black" strokeWidth={12} strokeLinejoin="round" />
      </mask>
      <g mask="url(#wordmark-halo)">
        <g transform="translate(250 250)" fill="none" stroke="currentColor" strokeWidth={2.75}>
          <circle r={GLOBE_R} />
          {PARALLELS.map((k) => (
            <path key={k} d={lens(k)} transform="rotate(90)" />
          ))}
          <path d={`M-${GLOBE_R} 0H${GLOBE_R}`} />
          {Array.from({ length: MERIDIAN_COUNT }, (_, i) => (
            <path key={i} d={meridian(i)} data-meridian={i} />
          ))}
        </g>
        <path d={RING} fillRule="evenodd" transform="translate(224.5 237.4)" />
        <path d={RING} fillRule="evenodd" transform="translate(290.5 267.4)" />
        <SparklePair x={32.5} y={154.5} />
        <SparklePair x={467.5} y={345.5} flip />
      </g>
      <Wordmark fill="black" />
    </svg>
  );
}
