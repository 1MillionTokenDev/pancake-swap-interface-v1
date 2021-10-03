import { useEffect } from 'react'
import useGetB1MTBusdLpPrice from 'utils/useGetCakeBusdLpPrice'

const useGetDocumentTitlePrice = () => {
  const b1MTPriceBusd = useGetB1MTBusdLpPrice()

  const b1MTPriceBusdString =
    Number.isNaN(b1MTPriceBusd) || b1MTPriceBusd === 0 || !b1MTPriceBusd
      ? ''
      : ` - $${b1MTPriceBusd.toLocaleString(undefined, {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })}`

  useEffect(() => {
    document.title = `b1MT${b1MTPriceBusdString}`
  }, [b1MTPriceBusdString])
}
export default useGetDocumentTitlePrice
