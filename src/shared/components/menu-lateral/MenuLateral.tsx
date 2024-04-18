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
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";

interface IMenuLateralProps {
  // Filho = AppRoutes
  children: React.ReactNode;
}

interface IListItemLinkProps {
  // Texto do menu
  label: string;

  // Nome do icone
  icon: string;

  // Caminho da rota
  to: string;

  // Ao clicar, fechar menu
  // Também pode ser undefined
  onClick: (() => void) | undefined;
}

// Receber algumas propriedades das opções de menu
const ListItemLink: React.FC<IListItemLinkProps> = ({
  label,
  icon,
  to,
  onClick,
}) => {
  const navigate = useNavigate();

  // Para resolver e deixar algumas configurações disponíveis
  //  Recebe por parametro a rota
  const resolvedPath = useResolvedPath(to);

  // Resolver de saber se a rota está selecionada ou não
  const match = useMatch({ path: resolvedPath.pathname, end: false });
  // Se for diferente de nulo, significa que encontrou a rota

  const handleClick = () => {
    // Ao clicar, navegue para outra tela
    navigate(to);

    // Fechar menu
    //  onClick && onClick();
    //  if (onClick) onClick();
    // Se a função for undefined, não faz nada, senão, executa a função
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={onClick}>
      {/* Uma opção de menu */}
      <ListItemIcon>
        {/* <TramSharp /> */}
        <Icon>
          {/* Nome do icone */}
          {/* home */}
          {icon}
        </Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  // Acessar o tema base e acessar tdas as propriedades,  do light e dark
  const theme = useTheme();

  // Se a tela for menor que sm(600px)
  //  Passar um valor de entrada, que é o tema
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  // Contexto
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();

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
              {drawerOptions.map((drawerOptions) => (
                <ListItemLink
                  // Sempre informar quando está usando dentro de um map
                  key={drawerOptions.path}
                  label={drawerOptions.label}
                  icon={drawerOptions.icon}
                  to={drawerOptions.path}
                  // Não altere o valor toda vez que clicar
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>

      {/* Conteúdo centro */}
      <Box
        height="100vh"
        // spacing = funçao que retorna string. Multiplos de 4. Usa mais quando for definir espaços fixos.
        //  28 * 4 = 112px
        marginLeft={smDown ? 0 : theme.spacing(28)}
      >
        {children}
      </Box>
    </>
  );
};
