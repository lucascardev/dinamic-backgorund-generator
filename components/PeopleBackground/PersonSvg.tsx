import React from 'react';
import { PersonData } from '@/lib/people-data';

interface PersonSvgProps {
  person: PersonData;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const PersonSvg: React.FC<PersonSvgProps> = ({
  person,
  className = '',
  width = '100%',
  height = '100%',
}) => {
  const {
    facing,
    skinColor,
    hairColor,
    outfitColor,
    hairStyle,
    outfitType,
    accessory,
    lipsColor = '#FF0055',
  } = person;

  const isLeft = facing === 'left';
  const isFront = facing === 'front';

  // Transform flip for left facing profile across x=100
  const scaleX = isLeft ? -1 : 1;
  const translateX = isLeft ? 100 : 0;

  // Render front vs profile outfit paths
  const renderOutfit = () => {
    if (isFront) {
      switch (outfitType) {
        case 'v_neck':
          return (
            <g fill={outfitColor}>
              <path d="M 0 160 L 0 92 C 16 80 28 74 36 72 L 50 88 L 64 72 C 72 74 84 80 100 92 L 100 160 Z" />
              <path
                d="M 36 72 L 50 88 L 64 72"
                fill="none"
                stroke="rgba(0,0,0,0.15)"
                strokeWidth="1.5"
              />
            </g>
          );
        case 'collar':
          return (
            <g fill={outfitColor}>
              <path d="M 0 160 L 0 92 C 16 80 28 74 36 72 L 50 82 L 64 72 C 72 74 84 80 100 92 L 100 160 Z" />
              <path
                d="M 36 72 L 44 82 L 50 76 Z"
                fill={outfitColor}
                stroke="rgba(0,0,0,0.2)"
                strokeWidth="1"
              />
              <path
                d="M 64 72 L 56 82 L 50 76 Z"
                fill={outfitColor}
                stroke="rgba(0,0,0,0.2)"
                strokeWidth="1"
              />
            </g>
          );
        case 'turtleneck':
          return (
            <g fill={outfitColor}>
              <rect x="36" y="56" width="28" height="18" rx="2" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
              <path d="M 0 160 L 0 92 C 16 80 28 74 36 72 L 64 72 C 72 74 84 80 100 92 L 100 160 Z" />
            </g>
          );
        case 'hoodie':
          return (
            <g fill={outfitColor}>
              <path d="M 0 160 L 0 92 C 16 80 28 74 34 74 C 42 82 58 82 66 74 C 72 74 84 80 100 92 L 100 160 Z" />
              <path
                d="M 30 74 C 36 90 64 90 70 74 C 62 96 38 96 30 74 Z"
                opacity={0.9}
                stroke="rgba(0,0,0,0.15)"
                strokeWidth="1"
              />
              <path
                d="M 42 82 L 42 100 M 58 82 L 58 100"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity={0.7}
              />
            </g>
          );
        case 'round_neck':
        default:
          return (
            <g fill={outfitColor}>
              <path d="M 0 160 L 0 92 C 16 80 28 74 36 72 C 40 78 60 78 64 72 C 72 74 84 80 100 92 L 100 160 Z" />
            </g>
          );
      }
    } else {
      // Profile view outfit paths (facing right)
      switch (outfitType) {
        case 'v_neck':
          return (
            <g fill={outfitColor}>
              <path d="M 0 160 L 0 88 C 16 76 28 74 38 74 L 42 74 L 48 86 L 52 74 L 54 74 C 68 76 84 80 100 88 L 100 160 Z" />
              <path
                d="M 42 74 L 48 86 L 52 74"
                fill="none"
                stroke="rgba(0,0,0,0.15)"
                strokeWidth="1.5"
              />
            </g>
          );
        case 'collar':
          return (
            <g fill={outfitColor}>
              <path d="M 0 160 L 0 88 C 16 76 28 74 38 74 L 44 74 L 48 82 L 52 74 L 54 74 C 68 76 84 80 100 88 L 100 160 Z" />
              <path
                d="M 40 74 L 48 82 L 46 72 Z"
                fill={outfitColor}
                stroke="rgba(0,0,0,0.2)"
                strokeWidth="1"
              />
            </g>
          );
        case 'turtleneck':
          return (
            <g fill={outfitColor}>
              <path d="M 36 56 L 54 56 L 54 74 L 36 74 Z" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
              <path d="M 0 160 L 0 88 C 16 76 28 74 38 74 L 54 74 C 68 76 84 80 100 88 L 100 160 Z" />
            </g>
          );
        case 'hoodie':
          return (
            <g fill={outfitColor}>
              <path d="M 0 160 L 0 88 C 16 76 28 74 36 74 C 42 80 48 80 54 74 C 68 76 84 80 100 88 L 100 160 Z" />
              <path
                d="M 32 74 C 38 86 50 86 54 74 C 50 90 34 90 32 74 Z"
                opacity={0.9}
                stroke="rgba(0,0,0,0.15)"
                strokeWidth="1"
              />
            </g>
          );
        case 'round_neck':
        default:
          return (
            <g fill={outfitColor}>
              <path d="M 0 160 L 0 88 C 16 76 28 74 38 74 C 42 77 48 77 54 74 C 68 76 84 80 100 88 L 100 160 Z" />
            </g>
          );
      }
    }
  };

  return (
    <svg
      viewBox="0 0 100 160"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMax meet"
      className={`select-none overflow-visible w-full h-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={isLeft ? `translate(${translateX}, 0) scale(${scaleX}, 1)` : undefined}>
        {/* --- 1. BACK HAIR LAYER (Behind Head and Body) --- */}
        {hairStyle === 'long_wavy' && (
          <path
            d={
              isFront
                ? 'M 8 40 C 0 62 0 110 6 150 L 94 150 C 100 110 100 62 92 40 C 78 12 22 12 8 40 Z'
                : 'M 2 38 C -4 65 -2 110 4 150 L 84 150 C 90 110 90 65 78 38 C 68 12 18 12 2 38 Z'
            }
            fill={hairColor}
          />
        )}
        {hairStyle === 'dreads' && (
          <g fill={hairColor}>
            <path d="M 8 38 C 0 62 -2 110 4 150 L 30 150 L 22 38 Z" />
            <path d="M 16 34 C 8 62 6 110 12 150 L 38 150 L 30 34 Z" />
            <path d="M 62 36 C 70 62 72 110 66 150 L 94 150 C 100 110 94 62 80 36 Z" />
          </g>
        )}
        {hairStyle === 'ponytail' && (
          <path
            d={
              isFront
                ? 'M 10 34 C -4 44 -8 72 -2 98 C 6 102 18 90 20 72 C 18 54 14 42 10 34 Z'
                : 'M 32 26 C 18 24 8 38 2 58 C 8 62 20 54 24 44 C 26 38 28 32 32 26 Z'
            }
            fill={hairColor}
          />
        )}

        {/* --- 2. HEAD AND NECK SKIN BASE --- */}
        {isFront ? (
          /* Front View: Clean Neck + Oval Head */
          <g>
            <path d="M 38 50 L 62 50 L 62 94 L 38 94 Z" fill={skinColor} />
            <ellipse cx="50" cy="38" rx="20" ry="24" fill={skinColor} />
            <ellipse cx="28" cy="40" rx="3.5" ry="5.5" fill={skinColor} />
            <ellipse cx="72" cy="40" rx="3.5" ry="5.5" fill={skinColor} />
            <path d="M 44 52 Q 50 56 56 52" fill={lipsColor} />
          </g>
        ) : (
          /* Profile View: CLEAN ANATOMICAL PROFILE */
          <g>
            <path
              d="
                M 38 94
                L 38 60
                C 34 46 32 36 38 26
                C 42 14 58 14 66 24
                C 70 28 72 34 71 38
                C 73 40 77 42 74 46
                C 71 48 73 50 70 52
                C 69 54 71 58 66 60
                L 66 94
                Z
              "
              fill={skinColor}
            />
            {/* Profile Ear */}
            <ellipse cx="42" cy="42" rx="4" ry="5.5" fill={skinColor} />
            {/* Profile Lip accent */}
            <path d="M 71 48 C 73 50 73 51 70 52 Z" fill={lipsColor} />
          </g>
        )}

        {/* --- 3. OUTFIT / TORSO LAYER --- */}
        {renderOutfit()}

        {/* --- 4. FACIAL HAIR (Beard / Mustache) --- */}
        {accessory === 'mustache' && (
          <path
            d={isFront ? 'M 43 48 Q 50 51 57 48 Q 50 45 43 48 Z' : 'M 64 47 Q 72 50 75 48 Q 70 45 64 47 Z'}
            fill={hairColor}
          />
        )}
        {accessory === 'beard' && (
          <path
            d={
              isFront
                ? 'M 28 40 C 28 62 38 68 50 68 C 62 68 72 62 72 40 C 66 50 58 54 50 54 C 42 54 34 50 28 40 Z'
                : 'M 38 38 C 38 56 46 66 66 62 C 72 60 76 54 74 46 C 70 52 64 54 54 54 C 44 54 40 48 38 38 Z'
            }
            fill={hairColor}
          />
        )}

        {/* --- 5. FRONT / TOP HAIR STYLES (Organically contoured curves, no floating circles) --- */}
        <g fill={hairColor}>
          {hairStyle === 'buzzcut' && (
            <path
              d={
                isFront
                  ? 'M 28 36 C 26 14 38 10 50 10 C 62 10 74 14 72 36 C 66 25 50 23 28 25 Z'
                  : 'M 36 42 C 31 26 40 11 54 11 C 66 11 68 20 66 27 C 58 24 46 25 36 38 Z'
              }
            />
          )}

          {hairStyle === 'fade' && (
            <path
              d={
                isFront
                  ? 'M 28 34 C 26 8 38 4 50 4 C 62 4 74 8 72 34 C 66 22 50 20 28 24 Z'
                  : 'M 36 40 C 31 18 42 4 56 4 C 68 4 70 18 67 27 C 58 21 46 23 36 36 Z'
              }
            />
          )}

          {hairStyle === 'pompadour' && (
            <path
              d={
                isFront
                  ? 'M 28 36 C 22 -6 38 -12 50 -12 C 62 -12 78 -6 72 36 C 64 22 50 18 28 26 Z'
                  : 'M 36 40 C 31 16 42 -8 56 -8 C 70 -8 73 12 68 26 C 58 22 46 22 36 36 Z'
              }
            />
          )}

          {hairStyle === 'side_part' && (
            <path
              d={
                isFront
                  ? 'M 28 36 C 26 10 38 6 50 6 C 62 6 74 10 72 36 C 64 22 48 20 28 26 Z'
                  : 'M 36 42 C 32 18 42 8 54 8 C 68 8 70 18 68 27 C 58 22 46 22 36 38 Z'
              }
            />
          )}

          {hairStyle === 'short_crop' && (
            <path
              d={
                isFront
                  ? 'M 28 36 C 26 12 38 8 50 8 C 62 8 74 12 72 36 C 66 25 50 23 28 26 Z'
                  : 'M 36 42 C 32 18 42 8 54 8 C 66 8 70 18 68 27 C 58 22 46 22 36 38 Z'
              }
            />
          )}

          {hairStyle === 'spikes' && (
            <path
              d={
                isFront
                  ? 'M 28 36 L 24 18 L 32 22 L 38 4 L 48 16 L 55 2 L 62 18 L 72 10 L 72 36 Q 50 24 28 26 Z'
                  : 'M 36 38 L 28 18 L 36 20 L 42 4 L 50 16 L 58 2 L 64 18 L 70 12 L 68 28 Q 50 22 36 38 Z'
              }
            />
          )}

          {hairStyle === 'man_bun' && (
            <path
              d={
                isFront
                  ? 'M 28 36 C 26 14 38 10 50 10 C 62 10 74 14 72 36 C 65 25 50 23 28 26 Z M 43 10 C 43 -2 57 -2 57 10 Z'
                  : 'M 36 40 C 31 18 42 10 54 10 C 66 10 70 18 68 28 C 58 22 46 20 36 38 Z M 36 10 C 36 -2 48 -2 48 10 Z'
              }
            />
          )}

          {hairStyle === 'cap' && (
            <g>
              <path
                d={
                  isFront
                    ? 'M 22 36 C 20 10 36 6 50 6 C 64 6 78 10 78 36 Z'
                    : 'M 32 40 C 26 12 40 4 56 4 C 68 4 72 18 69 32 Z'
                }
              />
              <path
                d={
                  isFront
                    ? 'M 16 36 Q 50 28 84 36 L 86 41 Q 50 33 14 41 Z'
                    : 'M 52 28 Q 72 25 92 30 L 90 35 Q 70 31 50 33 Z'
                }
                fill={outfitColor}
              />
            </g>
          )}

          {hairStyle === 'afro' && (
            <path
              d={
                isFront
                  ? 'M 26 36 C 16 30 16 14 32 6 C 42 0 58 0 68 6 C 84 14 84 30 74 36 C 68 26 58 22 50 22 C 42 22 32 26 26 36 Z'
                  : 'M 36 42 C 20 36 22 12 40 4 C 54 -2 70 4 74 22 C 68 24 58 22 48 22 C 40 22 38 32 36 42 Z'
              }
            />
          )}

          {hairStyle === 'dreads' && (
            <path
              d={
                isFront
                  ? 'M 26 36 C 24 16 38 10 50 10 C 62 10 76 16 74 36 C 64 26 50 24 26 28 Z'
                  : 'M 34 40 C 30 18 42 10 54 10 C 66 10 70 18 68 28 C 58 24 46 22 34 40 Z'
              }
            />
          )}

          {hairStyle === 'slick' && (
            <path
              d={
                isFront
                  ? 'M 28 36 C 26 14 38 10 50 10 C 62 10 74 14 72 36 C 65 25 50 23 28 26 Z'
                  : 'M 36 40 C 31 18 42 10 54 10 C 66 10 70 18 68 28 C 58 24 46 22 36 40 Z'
              }
            />
          )}

          {hairStyle === 'long_wavy' && (
            <path
              d={
                isFront
                  ? 'M 24 38 C 22 18 38 10 50 10 C 62 10 78 18 76 38 C 72 26 62 20 50 20 C 38 20 28 26 24 38 Z'
                  : 'M 28 40 C 25 16 42 8 58 8 C 68 8 72 18 70 30 C 62 22 48 18 36 24 C 30 28 28 34 28 40 Z'
              }
            />
          )}

          {hairStyle === 'bun' && (
            <path
              d={
                isFront
                  ? 'M 28 36 C 26 14 38 10 50 10 C 62 10 74 14 72 36 C 64 26 50 24 28 26 Z M 40 10 C 40 -2 60 -2 60 10 Z'
                  : 'M 36 40 C 31 18 42 10 54 10 C 66 10 70 18 68 28 C 58 24 46 22 36 38 Z M 34 8 C 34 -4 48 -4 48 8 Z'
              }
            />
          )}

          {hairStyle === 'pixie' && (
            <path
              d={
                isFront
                  ? 'M 27 36 C 24 14 42 8 50 8 C 58 8 76 14 73 36 C 64 26 50 24 27 26 Z'
                  : 'M 36 40 C 31 18 42 10 54 10 C 66 10 70 18 68 28 C 58 24 46 22 36 38 Z'
              }
            />
          )}

          {hairStyle === 'curly_bob' && (
            <path
              d={
                isFront
                  ? 'M 24 38 C 18 34 16 26 22 20 C 20 12 28 6 38 8 C 44 2 56 2 62 8 C 72 6 80 12 78 20 C 84 26 82 34 76 38 C 68 26 58 22 50 22 C 42 22 32 26 24 38 Z'
                  : 'M 28 40 C 22 34 22 24 28 18 C 28 10 38 4 50 4 C 62 4 72 10 72 20 C 76 26 74 34 68 38 C 62 26 50 22 38 24 C 32 28 30 34 28 40 Z'
              }
            />
          )}

          {hairStyle === 'ponytail' && (
            <path
              d={
                isFront
                  ? 'M 28 36 C 26 14 38 10 50 10 C 62 10 74 14 72 36 C 64 26 50 24 28 26 Z'
                  : 'M 36 40 C 31 18 42 10 54 10 C 66 10 70 18 68 28 C 58 24 46 22 36 38 Z'
              }
            />
          )}
        </g>
      </g>
    </svg>
  );
};
