// import { TramSharp } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDrawerContext } from "../../contexts";

interface IMenuLateralProps {
  // Filho = AppRoutes
  children: React.ReactNode;
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  // Acessar o tema base e acessar tdas as propriedades,  do light e dark
  const theme = useTheme();

  // Se a tela for menor que sm(600px)
  //  Passar um valor de entrada, que é o tema
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  // Contexto
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

  return (
    <>
      {/* Menu lateral */}
      <Drawer
        // Sempre aberto
        open={isDrawerOpen}
        // Fechar menu
        onClose={toggleDrawerOpen}
        // Variante
        //  permanent = fixo
        //  persistent = fixo mas ao minimizar, diminui  tudo do lado
        //  temporary = fica por cima (padrao)
        //    Se for menor que sm = temporary, senao = permanent
        variant={smDown ? "temporary" : "permanent"}
      >
        {/* Ocupar todo espaço disponível */}
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {/* Foto */}
            <Avatar
              // Estilos
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRCDuj3qu5VDpQQ3K9RNeXwGK9FjbsK7u0EY2wGKmn0NU1p2CFbe6EEgyXqjX91f256vk&usqp=CAU"
            />
          </Box>
          {/* Divisão */}
          <Divider />

          {/* Opções de menu */}
          <Box
            // Ocupar todo espaço disponivel
            flex={1}
          >
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                  {/* <TramSharp /> */}
                  <Icon>
                    {/* Nome do icone */}
                    home
                  </Icon>
                </ListItemIcon>
                <ListItemText primary="Página inicial" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      {/* Conteúdo centro */}
      <Box
        height="100vh"
        // spacing = funçao que retorna string. Multiplos de 4. Usa mais quando for definir espaços fixos.
        //  32 * 4 = 128px
        marginLeft={smDown ? 0 : theme.spacing(32)}
      >
        {children}
      </Box>
    </>
  );
};
