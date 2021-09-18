import styled, { CSSProperties } from 'styled-components'

export type TypographyProps = {
  variant?: string
  children: React.ReactNode
  style?: CSSProperties
  color?: string
  component?: string
}

const theme = {
  fonts: {
    h1: '32px',
    h2: '28px',
    h3: '24px',
    h4: '20px',
    h5: '16px',
    h6: '14px',
    p: '14px',
    span: '14px',
    small: '12px',
  },
} as any

const TypographyStyled = styled.p`
  font-size: ${(props: any) => theme.fonts[props.component || props.variant]};
  color: ${(props: any) => props.theme[props.color]};
`

const Typography = ({ variant, children, ...props }: TypographyProps) => (
  <TypographyStyled as={(variant as any) || 'p'} variant={variant || 'p'} {...props}>
    {children}
  </TypographyStyled>
)

export default Typography
