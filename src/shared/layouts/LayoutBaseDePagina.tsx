import {
  Box,
  Icon,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDrawerContext } from "../contexts";

interface ILayoutBaseDePaginaProps {
  children: React.ReactNode;
  titulo: string;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({
  children,
  titulo,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();

  // Se o theme estiver embaixo do useMediaQuery:
  //   const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    // gap = Espaçamento entre os itens.
    //  multiplicado por 8. 1 * 8 = 8
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        display="flex"
        // Centralizar verticalmente
        alignItems="center"
        padding={1}
        height={theme.spacing(12)}
        gap={1}
      >
        {/* Menu lateral (hamburguer) */}
        {/* Se a tela for menor que sm */}
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        {/* variant = h1, h2, ..., subtitle1,...
            component = igual do HTML. Não muda na estilização, somente para semantica
        */}
        <Typography variant="h5" component="b">
          {titulo}
        </Typography>
      </Box>
      <Box>Barra de ferramentas</Box>
      <Box>{children}</Box>
    </Box>
  );
};
