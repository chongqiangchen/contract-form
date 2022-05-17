import ContractForm from '@fuordim/contract-form';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import ABI_BEP20 from "./erc20";
import { IABISelectProps, IRenderElementProps, IRenderGroupWrapperProps } from '@fuordim/contract-form/types/interfaces/component';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import styled from '@emotion/styled';
import { useAccount, useContract, useProvider, useSigner } from 'wagmi';
import { Connect } from './components/Connect';
import { Account } from './components/Account';
import { NetworkSwitcher } from './components/NetworkSwitcher';
import { Typography } from '@mui/material';

const RootStyle = styled('div')(() => ({
  padding: '30px',
}))

const Element = ({ attributes, abiInputItem }: IRenderElementProps) => {
  const { field, fieldState: { error } } = attributes || {};

  if (abiInputItem.type === 'address' || abiInputItem.type === 'uint256') {
    return (
      <TextField {...field} label={abiInputItem.name} error={error} />
    )
  }

  return <div />
}

const GroupItemWrapper = (props: IRenderGroupWrapperProps) => {
  const { children, abiItem, methods, index } = props;
  const {data: signer} = useSigner();
  const provider = useProvider();
  const [result, setResult] = useState<any>('');

  const contract = useContract({
    addressOrName: "0x965F527D9159dCe6288a2219DB51fc6Eef120dD1",
    contractInterface: [abiItem],
    signerOrProvider: signer || provider,
  });

  const { handleSubmit } = methods;

  const submit = async (e: any) => {
    const values = Object.values(e) || [];
    const r = await contract[abiItem?.name || ''](...values);
    console.log(r);
    setResult(String(r));
  }

  return (
    <>
      {index !== 0 && <Divider />}
      <Box my={2} display="flex" gap={2}>
        <Button variant="contained" onClick={handleSubmit(submit)}>{abiItem.name}</Button>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          {children}
        </Stack>
        <Typography>{result}</Typography>
      </Box>
    </>
  )
}

const ContractNameSelect = ({ abi, onSelect }: IABISelectProps) => {
  const [value, setValue] = useState(abi && abi[0].name || '');

  const handleChange = (event: SelectChangeEvent<any>, child: React.ReactNode) => {
    setValue(event.target.value);
    onSelect && onSelect(event.target.value);
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="contract-name-select-label">Contract Name</InputLabel>
      <Select
        labelId="contract-name-select-label"
        id="contract-name-select"
        value={value}
        label="Contract Name"
        onChange={handleChange}
      >
        {
          abi && abi.map((item, index) => {
            if (!item.name) {
              return null;
            }
            return (<MenuItem key={item.name + index} value={item.name}>{item.name}</MenuItem>);
          })
        }
      </Select>
    </FormControl>
  )
}

function App() {
  const { data } = useAccount();

  return (
    <RootStyle>
      <Connect />
      <Box>
        {data && (
          <>
            <Account />
            <NetworkSwitcher />
          </>
        )}
      </Box>
      <Divider />
      <ContractForm
        openAbiSelect
        renderElement={Element}
        renderGroupWrapper={GroupItemWrapper}
        renderABISelect={ContractNameSelect}
        abi={ABI_BEP20}
      />
    </RootStyle>
  )
}

export default App
