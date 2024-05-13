import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;

  mostrarBotaoSalvar?: boolean;
  mostrarBotaoNovo?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;

  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoSalvarEFecharCarregando?: boolean;

  aoClicarEmSalvar?: () => void;
  aoClicarEmNovo?: () => void;
  aoClicaEmApagar?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmSalvarEFechar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  textoBotaoNovo = "Novo",

  mostrarBotaoSalvar = true,
  mostrarBotaoNovo = true,
  mostrarBotaoApagar = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoSalvarEFechar = false,

  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoNovoCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoSalvarEFecharCarregando = false,

  aoClicarEmSalvar,
  aoClicarEmNovo,
  aoClicaEmApagar,
  aoClicarEmVoltar,
  aoClicarEmSalvarEFechar,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const theme = useTheme();

  return (
    <Box
      component={Paper}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={1}
      gap={1}
    >
      {mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando && (
        <Button
          color="primary"
          disableElevation
          variant="contained"
          startIcon={<Icon>save</Icon>}
          onClick={aoClicarEmSalvar}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Salvar
          </Typography>
        </Button>
      )}

      {/* Indica que o botão está carregando */}
      {mostrarBotaoSalvarCarregando && <Skeleton width={110} height={60} />}

      {mostrarBotaoSalvarEFechar &&
        !mostrarBotaoSalvarEFecharCarregando &&
        !smDown &&
        !mdDown && (
          <Button
            color="primary"
            disableElevation
            variant="outlined"
            startIcon={<Icon>save</Icon>}
            onClick={aoClicarEmSalvarEFechar}
          >
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              Salvar e voltar
            </Typography>
          </Button>
        )}

      {mostrarBotaoSalvarEFecharCarregando && !smDown && (
        <Skeleton width={180} height={60} />
      )}

      {mostrarBotaoApagar && !mostrarBotaoApagarCarregando && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>delete</Icon>}
          onClick={aoClicaEmApagar}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Apagar
          </Typography>
        </Button>
      )}

      {mostrarBotaoApagarCarregando && <Skeleton width={110} height={60} />}

      {mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>add</Icon>}
          onClick={aoClicarEmNovo}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {textoBotaoNovo}
          </Typography>
        </Button>
      )}

      {mostrarBotaoNovoCarregando && !smDown && (
        <Skeleton width={110} height={60} />
      )}

      {/* Mostrar somente quando tiver botoes dos 2 lados */}
      {mostrarBotaoVoltar &&
        (mostrarBotaoNovo ||
          mostrarBotaoApagar ||
          mostrarBotaoSalvar ||
          mostrarBotaoSalvarEFechar) && (
          <Divider variant="middle" orientation="vertical" />
        )}

      {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>arrow_back</Icon>}
          onClick={aoClicarEmVoltar}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Voltar
          </Typography>
        </Button>
      )}
      {mostrarBotaoVoltarCarregando && <Skeleton width={110} height={60} />}
    </Box>
  );
};
