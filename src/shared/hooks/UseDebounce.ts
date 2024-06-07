// Impedir que as listagens fiquem consultando o backend o tempo todo

import { useCallback, useRef } from "react";

// Pesquisa acontecer depois de 1s que parar de digitar
// delay = Enquanto tiver usando o debounce, mudar o timeout
// notDelayInFirstTime = nao tenha delay na primeira vez
export const useDebounce = (delay = 300, notDelayInFirstTime = true) => {
  // Ao entrar a primeira vez, ja realizar a consulta
  const isFirstTime = useRef(notDelayInFirstTime);
  // Se a função for executada antes do timeout, cancela o timeout
  const debouncing = useRef<NodeJS.Timeout>();

  const debounce = useCallback(
    (func: () => void) => {
      // Se for true
      if (isFirstTime.current) {
        // Depois  virar false
        isFirstTime.current = false;
        // Excutar funçao
        func();
      } else {
        // Se tiver um timeout cadastrado
        if (debouncing.current) {
          // Cancelar o timeout
          clearTimeout(debouncing.current);
        }
        // Se nao, adiciona um novo
        debouncing.current = setTimeout(() => func(), delay);
      }
    },
    [delay]
  );

  return { debounce };
};
