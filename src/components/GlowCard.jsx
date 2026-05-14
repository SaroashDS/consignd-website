import BorderGlow from './BorderGlow'

export const GLOW_BLUE = '217 91 60'
export const GLOW_ORANGE = '21 89 54'

const BRAND_COLORS = ['#3B82F6', '#60A5FA', '#F26522']

export default function GlowCard({
  children,
  className = '',
  borderRadius = 22,
  glowColor = GLOW_BLUE,
  hover = 'm',
  backgroundColor = 'rgba(2,11,24,0.78)',
  glowRadius = 32,
  glowIntensity = 0.75,
  fillOpacity = 0.35,
  ...rest
}) {
  return (
    <BorderGlow
      className={`glow-glass glow-hover-${hover} ${className}`.trim()}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      glowColor={glowColor}
      glowRadius={glowRadius}
      glowIntensity={glowIntensity}
      coneSpread={28}
      colors={BRAND_COLORS}
      animated={false}
      fillOpacity={fillOpacity}
      {...rest}
    >
      {children}
    </BorderGlow>
  )
}
