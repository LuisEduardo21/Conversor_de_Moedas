import {useState} from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {
  Appbar,
  Button,
  Chip,
  Menu,
  Snackbar,
  Text,
  TextInput,
} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

import {useCurrency} from '../../hooks/useCurrency';

import {currencyList} from '../../constants';

import styles from './styles';

export function Home() {
  const {state: currencies, dispatch} = useCurrency();
  console.log('::: Home -> rendering');

  const [entrada, setEntrada] = useState('');
  const [saida, setSaida] = useState({
    valorAtual: 'R$ 0,00',
    outrosResultados: [],
  });

  const [updateInfo, setUpdateInfo] = useState(' ');
  const [moeda, setMoeda] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const {isFetching} = useQuery({
    queryKey: ['getCurrencies'],
    queryFn: async () => {
      const {data} = await axios.get(
        'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,CHF-BRL,CNY-BRL',
      );
      return data;
    },
    onSuccess: monetaryResponse => {
      console.log('Axios: ', monetaryResponse);
      handlerMonetary(monetaryResponse);
    },
    onError: e => {
      console.log('Request error: ' + e.message);
    },
    staleTime: 60 * 60 * 1, // 1 hour
  });

  const handlerMonetary = data => {
    console.log('Monetary', data);
    dispatch({type: 'dolar', payload: data.USDBRL});
    dispatch({type: 'euro', payload: data.EURBRL});
    dispatch({type: 'libra', payload: data.GBPBRL});
    dispatch({type: 'francoSuico', payload: data.CHFBRL});
    dispatch({type: 'yuan', payload: data.CNYBRL});
  };

  const handlerUpdateInfo = date => {
    const dt = date;

    if (!dt) {
      return;
    }

    setUpdateInfo(
      `Atualizado em ${dt.substring(8, 10)}/${dt.substring(
        5,
        7,
      )}/${dt.substring(2, 4)} às ${dt.substring(11, 16)}`,
    );
  };

  const calc = (moedaEscolhida, simboloMoeda) => {
    setSaida(saidaAntiga => ({
      ...saidaAntiga,
      valorAtual: `${simboloMoeda}${entrada} = R$ ${(entrada * moedaEscolhida)
        .toFixed(2)
        .replace('.', ',')}`,
      outrosResultados: [
        ...saidaAntiga.outrosResultados,
        ...(saidaAntiga.valorAtual === 'R$ 0,00'
          ? []
          : [saidaAntiga.valorAtual]),
      ],
    }));
    setShowErrorMessage(false);
  };

  const handlerInputs = () => {
    if (entrada === '' && moeda === '') {
      setErrorMessage('Digite um valor e selecione uma moeda');
    } else if (entrada === '') {
      setShowErrorMessage(true);
      setErrorMessage('Digite um valor');
      return;
    } else if (moeda === '') {
      setErrorMessage('Selecione uma moeda');
      return;
    } else if (entrada < 1) {
      setShowErrorMessage(true);
      setErrorMessage('Digite um valor maior que zero');
      return;
    }

    switch (moeda) {
      case 'usd':
        calc(currencies.dolar.bid, '$');
        handlerUpdateInfo(currencies.dolar.create_date);
        break;
      case 'eur':
        calc(currencies.euro.bid, '€');
        handlerUpdateInfo(currencies.euro.create_date);
        break;
      case 'gbp':
        calc(currencies.libra.bid, '£');
        handlerUpdateInfo(currencies.libra.create_date);
        break;
      case 'chf':
        calc(currencies.francoSuico.bid, '₣');
        handlerUpdateInfo(currencies.francoSuico.create_date);
        break;
      case 'cny':
        calc(currencies.yuan.bid, '¥');
        handlerUpdateInfo(currencies.yuan.create_date);
        break;
      default:
        setSaida(saidaAntiga => ({...saidaAntiga, valorAtual: 'R$ 0,00'}));
        setShowErrorMessage(true);
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Conversor de Moedas" />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Appbar.Action icon="menu" onPress={() => setMenuVisible(true)} />
          }>
          <Menu.Item
            title="Conversor"
            onPress={() => setShowHome(true) & setShowAbout(false)}
            icon={'calculator'}
          />
          <Menu.Item
            title="Sobre"
            onPress={() => setShowAbout(true) & setShowHome(false)}
            icon={'information-outline'}
          />
        </Menu>
      </Appbar.Header>

      {showHome && (
        <View style={styles.container}>
          <TextInput
            onChangeText={setEntrada}
            style={styles.inputs}
            value={entrada.toString()}
            keyboardType="numeric"
            label={'Valor'}
          />

          <View style={styles.inputs}>
            <DropDown
              label={'Moeda'}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={moeda}
              setValue={setMoeda}
              list={currencyList}
            />
          </View>

          <Text style={styles.saida}>{saida.valorAtual}</Text>
          <Text style={styles.update}>{updateInfo}</Text>
          <Button
            onPress={handlerInputs}
            mode="contained"
            style={styles.button}>
            CALCULAR
          </Button>
          <ScrollView showsVerticalScrollIndicator={false}>
            {saida.outrosResultados.map((valor, index) => (
              <Text style={styles.saida2} key={index}>
                {valor}
              </Text>
            ))}
          </ScrollView>
        </View>
      )}
      {showAbout && (
        <View style={styles.container}>
          <Text style={styles.aboutHeader}>Sobre o aplicativo</Text>
          <Text style={styles.aboutText}>
            Este aplicativo é um projeto de informações da cotação utilizadas
            nos cálculos são providas pela AwesomeApi.com.br e são de sua
            responsabilidade.
          </Text>
          <Chip
            style={styles.reactNativeBadge}
            icon="react"
            mode="outlined"
            selectedColor="#15add6">
            Feito com React Native
          </Chip>
        </View>
      )}

      <Snackbar
        visible={showErrorMessage}
        onDismiss={() => setShowErrorMessage(false)}
        action={{
          label: 'Ok',
        }}>
        {errorMessage}
      </Snackbar>

      {isFetching ? <ActivityIndicator color="blue" size="large" /> : null}
    </>
  );
}
