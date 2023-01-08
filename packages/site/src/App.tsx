import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import ContractForm, { filterAbiFunction, IRenderGroupItemWrapperProps } from 'react-web3-contract-form';
import { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useContract, useProvider, useSigner } from 'wagmi';
import { Alert, Chip, Grid, IconButton, InputBase, ListItem, Paper, Typography } from '@mui/material';
import AuthLogin from './components/AuthLogin';
import { Account } from './components/Account';
import SearchIcon from '@mui/icons-material/Search';
import Element from './components/Element';
import ABI_BEP20 from "./constants/erc20";
import ABI_ERC721 from "./constants/erc721";
import FormInput from './components/FormInput';
import autoScaleText from './utils/autoScaleText';
import extractObjValues from './utils/extractObjValues';
import { callWithEstimateGas } from './utils/estimateGas';
import { useLogs } from './components/LogsProvider';
import dayjs from 'dayjs';

const RootStyle = styled('div')(() => ({
  padding: '30px',
  width: '100vw'
}))

const DividerTitle = styled(Divider)(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize as string,
  marginBottom: theme.spacing(4)
}));

const SelectItem = styled('div')(({ theme }) => ({
  borderRadius: '4px',
  color: '#fff',
  cursor: 'move',
  listStyle: 'none',
  marginottom: '10px',
  padding: '8px 16px',
  position: 'relative',
}))

const GroupItemWrapper = (props: IRenderGroupItemWrapperProps) => {
  const { children, abiItem, methods, index, address } = props;
  const { data: signer } = useSigner();
  const provider = useProvider();
  const contract = useContract({
    addressOrName: address,
    contractInterface: [abiItem],
    signerOrProvider: signer || provider,
  });
  const { handleSubmit, control } = methods;
  const {addLog} = useLogs();

  const submit = async (e: any) => {
    const values = extractObjValues(e, ['payable']) || [];
    
    const payable = e.payable || 0;
    const isView = abiItem.stateMutability === 'view';

    let r: any = {};

    try {
      r = await callWithEstimateGas(contract, abiItem?.name || '', values, {value: payable})
    } catch (e: any) {
      console.log('error: ', e);
      addLog && addLog({
        status: 'error',
        message: `${dayjs()} - ${abiItem?.name || ''}: ${String(e.message)}`
      });
      return;
    }

    addLog && addLog({
      status: 'success',
      message: `${abiItem?.name || ''}: ${isView ? String(r) : r.hash}`
    });
  };

  const CustomButton = () => {
    if (abiItem?.stateMutability === 'view') {
      return (
        <Button
          color="info"
          variant="contained"
          onClick={handleSubmit(submit)}
          sx={{
            fontSize: autoScaleText(abiItem?.name || '', 14, 40),
          }}
        >
          {abiItem?.name}
        </Button>
      )
    } else if (abiItem?.stateMutability === 'payable') {
      return (
        <>
          <Button
            color="warning"
            variant="contained"
            onClick={handleSubmit(submit)}
            fullWidth
          >
            {abiItem?.name}
          </Button>
          <FormInput
            control={control}
            name="payable"
            label="payable"
          />
        </>
      )
    } else if (abiItem?.stateMutability === 'nonpayable') {
      return (
        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmit(submit)}
          fullWidth
        >
          {abiItem?.name}
        </Button>
      )
    } else {
      return (
        <Button
          color="info"
          variant="contained"
          onClick={handleSubmit(submit)}
        >
          {abiItem?.name}
        </Button>
      );
    }
  }

  return (
    <>
      {index !== 0 && <Divider />}
      <Box my={2} display="flex" flexWrap="wrap" gap={2}>
        <CustomButton />
        {children}
        {/* <Typography>{result}</Typography> */}
      </Box>
    </>
  )
}

const ContractNameSelect = ({ address, abi, onSelect, defaultValue }: any) => {
  const [filterAbi, setFilterAbi] = useState<any[]>([]);
  const [value, setValue] = useState(defaultValue || (filterAbi && filterAbi[0] && filterAbi[0].name || ''));

  const handleChange = (value?: string) => {
    setValue(value || '');
    onSelect && onSelect(value || '');
  }

  useEffect(() => {
    if (abi) {
      setFilterAbi(filterAbiFunction(abi))
    }
  }, [abi])

  return (
    <>
      <Paper
        component="div"
        sx={{ p: '2px 4px', mb: 2, display: 'flex', alignItems: 'center' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="搜索合约方法"
          inputProps={{ 'aria-label': 'search contract function' }}
          onChange={e => {
            if (e.target.value && e.target.value !== '') {
              const abi = filterAbi.filter(item => item.name?.includes(e.target.value));
              setFilterAbi(abi)
            } else {
              setFilterAbi(filterAbiFunction(abi));
            }
          }}
        />
        <IconButton sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Stack 
        direction="column" 
        gap={2}
        sx={{
          maxHeight: 'calc(100vh - 190px)',
          overflowY: 'auto',
        }}
      >
        {
          filterAbi && filterAbi.map((item, index) => {
            if (!item.name) {
              return null;
            }
            return (
              <SelectItem
                key={item.name}
                onClick={e => handleChange(item.name)}
                sx={{
                  background: value === item.name ? '#516391' : '#0e101c',
                  border: value === item.name ? '1px solid #0e101c' : '1px solid #516391',
                }}
              >
                <Stack direction="row">
                  <Typography>{item.name}</Typography>
                </Stack>
              </SelectItem>
            );
          })
        }

      </Stack>
    </>

  )
}

function App() {
  const [selectValue, setSelectValue] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [inputContractAbi, setInputContractAbi] = useState('');
  const [contractAbi, setContractAbi] = useState<any[]>([]);

  const {logs} = useLogs();

  const handleChangeContractAbi = (value: any) => {
    setSelectValue('');
    setTimeout(() => {
      setInputContractAbi(value);
    })
  }

  useEffect(() => {
    if (inputContractAbi) {
      try {
        const abi = JSON.parse(inputContractAbi);
        setContractAbi(abi);
      } catch (error) {
        console.log(error);
      }
    }
  }, [inputContractAbi])

  return (
    <RootStyle>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          marginBottom: '32px'
        }}
      >
        <Box
          sx={{
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          <Account />
        </Box>
        <AuthLogin />
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          padding: '16px 0',
          mb: '16px'
        }}
      >
        <TextField
          label="合约地址"
          sx={{
            flex: 1
          }}
          onChange={e => setContractAddress(e.target.value)}
        />
        <Stack flex={1.5}>
          <TextField
            label="合约ABI"
            multiline
            rows={4}
            value={inputContractAbi}
            onChange={e => handleChangeContractAbi(e.target.value)}
          />
          <Paper
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              listStyle: 'none',
              p: 0.5,
              m: 0,
            }}
            component="ul"
          >
            <ListItem
              sx={{
                width: 'auto',
              }}
            >
              <Chip
                label={'ERC20-TOKEN'}
                onClick={() => handleChangeContractAbi(JSON.stringify(ABI_BEP20, null, 2))}
              />
            </ListItem>
            <ListItem
              sx={{
                width: 'auto',
              }}
            >
              <Chip
                label={'ERC721-NFT'}
                onClick={() => handleChangeContractAbi(JSON.stringify(ABI_ERC721, null, 2))}
              />
            </ListItem>
          </Paper>
        </Stack>
      </Stack>
      <Grid
        container
        spacing={6}
        width={'100%'}
      >
        <Grid item xs={4}>
          <DividerTitle>选择合约方法</DividerTitle>
          <ContractNameSelect
            defaultValue={selectValue}
            abi={contractAbi}
            onSelect={(e: any) => setSelectValue(e)}
            address={contractAddress}
          />
        </Grid>
        <Grid item xs={4}>
          <DividerTitle>当前合约参数</DividerTitle>
          <ContractForm
            customSelect
            selectValue={selectValue}
            renderElement={Element}
            renderGroupItemWrapper={GroupItemWrapper}
            abi={contractAbi}
            address={contractAddress}
          />
        </Grid>
        <Grid item xs={4}>
          <DividerTitle>合约调用日志</DividerTitle>
          <Stack 
            spacing={2}
            sx={{
              maxHeight: 'calc(100vh - 122px)',
              overflowY: 'auto',
            }}
          >
            {logs && logs.map((item, index) => (
              <Alert key={index} severity={item.status || 'info'}>
                <span style={{wordBreak: 'break-all'}}>{item.message}</span>
              </Alert>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </RootStyle>
  )
}

export default App;
