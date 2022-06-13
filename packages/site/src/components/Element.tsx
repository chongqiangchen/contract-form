import { IRenderElementProps } from "react-web3-contract-form";
import { TextField } from "@mui/material";

const Element = ({ attributes, abiInputItem }: IRenderElementProps) => {
  const { field, fieldState: { error } } = attributes || {};

  console.log(abiInputItem);

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

export default Element;  