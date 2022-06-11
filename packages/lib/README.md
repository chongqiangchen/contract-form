### @fuordim/contract-form

```
const Element = ({ attributes, abiInputItem }: IRenderElementProps) => {
  const { field, fieldState: { error } } = attributes || {};

  if (
    abiInputItem.type === 'address' ||
    abiInputItem.type === 'uint256' ||
    abiInputItem.type === 'address[]' ||
    abiInputItem.type === 'uint256[]'
  ) {
    return (
      <TextField fullWidth {...field} label={abiInputItem.name} error={error} />
    )
  }

  return <div />
}

<ContractForm
    renderElement={Element}
    abi={contractAbi}
    address={contractAddress}
/>
```