import { useAccount, useEnsName } from 'wagmi'
import { shortName } from '../utils/shortName'

export function Account() {
  const { data: accountData } = useAccount()
  const { data: ensNameData } = useEnsName({ address: accountData?.address })

  return (
    <div>
      {ensNameData ?? shortName(accountData?.address || '')}
      {ensNameData ? ` (${shortName(accountData?.address || '')})` : null}
    </div>
  )
}