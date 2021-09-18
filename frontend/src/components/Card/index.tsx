import styled, { css } from 'styled-components'

type Props = {
  bgcolor?: string
}

const Card = styled.div`
  padding: 15px;
  background-color: #202024;
  border-radius: 5px;
  margin: 15px 0;

  background-color: ${(props: Props) => props.bgcolor};

  ${(props: Props) =>
    props.bgcolor &&
    css`
      background-color: ${(global: any) => global.theme[props.bgcolor as string]};
    `}
`

export default Card
