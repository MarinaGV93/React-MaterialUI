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
  useTheme,
} from "@mui/material";

interface IMenuLateralProps {
  // Filho = AppRoutes
  children: React.ReactNode;
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  // Acessar o tema base e acessar tdas as propriedades,  do light e dark
  const theme = useTheme();

  return (
    <>
      {/* Menu lateral */}
      <Drawer
        // Sempre aberto
        //  open={true}
        // Variante
        //  permanent = fixo
        //  persistent = fixo mas ao minimizar, diminui  tudo do lado
        //  temporary = fica por cima (padrao)
        variant="permanent"
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
        marginLeft={theme.spacing(32)}
      >
        {children}
      </Box>
    </>
  );
};
