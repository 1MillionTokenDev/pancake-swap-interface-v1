import { useCurrency } from 'hooks/Tokens'
import { useTradeExactIn } from 'hooks/Trades'
import { tryParseAmount } from 'state/swap/hooks'

const useGetB1MTBusdLpPrice = () => {
  const b1MTAddress = '0x8d67448d4f6231abc070a42a8905084b79e09136'
  const busdAddress = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'
  const inputCurrency = useCurrency(b1MTAddress)
  const outputCurrency = useCurrency(busdAddress)
  const parsedAmount = tryParseAmount('1', inputCurrency ?? undefined)
  const bestTradeExactIn = useTradeExactIn(parsedAmount, outputCurrency ?? undefined)
  const price = bestTradeExactIn?.executionPrice.toSignificant(6)
  return price ? parseFloat(price) : undefined
}

export default useGetB1MTBusdLpPrice
