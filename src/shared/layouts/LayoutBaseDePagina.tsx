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
import { ReactNode } from "react";

interface ILayoutBaseDePaginaProps {
  children: React.ReactNode;
  titulo: string;
  barraDeFerramentas?: ReactNode;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({
  children,
  titulo,
  barraDeFerramentas,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

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
        gap={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
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
        <Typography
          component="b"
          // Se o texto tiver grande, não deixa que passe o elemento, cortando o texto (desaparecer)
          overflow="hidden"
          // Não quebrar linha
          whiteSpace="nowrap"
          // Que apareça '...' no final do texto
          textOverflow="ellipsis"
          variant={smDown ? "h5" : mdDown ? "h4" : "h3"}
        >
          {titulo}
        </Typography>
      </Box>

      {barraDeFerramentas && <Box>{barraDeFerramentas}</Box>}

      {/* overFlow = permitir que quando o children tiver uma altura muito grande com muitos componentes filhos, permite que a div (box) tenha scroll */}
      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
