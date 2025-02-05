import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 32px 16px;

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }
`

export default Container
