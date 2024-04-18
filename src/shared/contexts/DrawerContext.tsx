// Para menu lateral
import React, { createContext, useCallback, useContext, useState } from "react";

interface IDrawerContextProps {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  drawerOptions: IDrawerOption[];
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}

interface IDrawerOption {
  path: string;
  icon: string;
  label: string;
}

const DrawerContext = createContext({} as IDrawerContextProps);

interface IAppThemeProviderProps {
  children: React.ReactNode;
}

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider: React.FC<IAppThemeProviderProps> = ({
  children,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Repassar as opçoes no contexto
  // Passar a interface como parametro de tipagem com uma lista
  const [drawerOptions, setIsDrawerOptions] = useState<IDrawerOption[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen);
  }, []);

  // Novas opçoes de menu
  const handleSetDrawerOptions = useCallback(
    (newDrawerOptions: IDrawerOption[]) => {
      setIsDrawerOptions(newDrawerOptions);
    },
    []
  );

  return (
    // Prover as propriedades para os filhos com os values = os atributos
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        drawerOptions,
        toggleDrawerOpen,
        setDrawerOptions: handleSetDrawerOptions,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
