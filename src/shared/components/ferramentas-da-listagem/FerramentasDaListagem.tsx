import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";

interface IFerramentasDaListagemProps {
  textoDaBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarBotaoNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
  textoDaBusca = "",
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  textoBotaoNovo = "Novo",
  mostrarBotaoNovo = true,
  aoClicarBotaoNovo,
}) => {
  const theme = useTheme();

  return (
    <Box
      // Poder mesclar com propriedades do Card
      // Paper = como se fosse um Box. É um container/div que já tem algumas propriedades
      component={Paper}
      display="flex"
      alignItems="center"
      // Precisa usar o spacing
      height={theme.spacing(5)}
      // Já trabalham com unidade de medida
      marginX={1}
      padding={1}
      paddingX={1}
      gap={1}
    >
      {mostrarInputBusca && (
        <TextField
          size="small"
          placeholder="Pesquisar..."
          value={textoDaBusca}
          // Vai entregar um evento
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {mostrarBotaoNovo && (
          <Button
            color="primary"
            // Desativar sombreamento
            disableElevation
            variant="contained"
            onClick={aoClicarBotaoNovo}
            endIcon={<Icon>add</Icon>}
          >
            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  );
};
