import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Heading, IconButton, Text, Flex } from '@pancakeswap-libs/uikit'
import { useModal } from 'components/Uikit'
import useI18n from 'hooks/useI18n'
import SettingsModal from './SettingsModal'
import RecentTransactionsModal from './RecentTransactionsModal'
import { SettingsIcon, HistoryIcon } from '../Uikit/components/Svg';

interface PageHeaderProps {
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
}

const StyledPageHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding: 24px;
  div {
    color: #1A888E !important;
  }
`

const Details = styled.div`
  flex: 1;
`

const PageHeader = ({ title, description, children }: PageHeaderProps) => {
  const TranslateString = useI18n()
  const [onPresentSettings] = useModal(<SettingsModal translateString={TranslateString} />)
  const [onPresentRecentTransactions] = useModal(<RecentTransactionsModal translateString={TranslateString} />)

  return (
    <StyledPageHeader>
      <Flex alignItems="center">
        <Details>
          <Heading mb="8px">{title}</Heading>
          {description && (
            <Text color="textSubtle" fontSize="14px">
              {description}
            </Text>
          )}
        </Details>
        <IconButton variant="text" onClick={onPresentSettings} title={TranslateString(1200, 'Settings')}>
          <SettingsIcon height="18px" color="none" />
        </IconButton>
        <IconButton
          variant="text"
          onClick={onPresentRecentTransactions}
          title={TranslateString(1202, 'Recent transactions')}
        >
          <HistoryIcon height="20px" color="none"/>
        </IconButton>
      </Flex>
      {children && <Text mt="16px">{children}</Text>}
    </StyledPageHeader>
  )
}

export default PageHeader
