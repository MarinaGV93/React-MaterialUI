import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { CidadesService } from "../../../shared/services/api/cidades/CidadesService";
import { useDebounce } from "../../../shared/hooks";
import { useFieldArray, useForm } from "react-hook-form";
import { string } from "yup";

type TAutoCompleteOptions = {
  id: number;
  // Nome da Cidade
  label: string;
};

interface IAutoCompleteCidadeProps {
  // Está carregando do lado de fora do componente?
  isExternalLoading?: boolean;
}

// Função que vai ser passada para o componente sem o React.FC
export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({
  isExternalLoading = false,
}) => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm();

  const { debounce } = useDebounce();

  const [opcoes, setOpcoes] = useState<TAutoCompleteOptions[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [busca, setBusca] = useState("");
  const [selectedId, setSelectedId] = useState<Number | undefined>(undefined);

  // Carregar as cidades do backend
  useEffect(() => {
    setIsLoading(true);

    // Impedir que as listagens fiquem consultando o backend o tempo todo
    debounce(() => {
      // Reexecutar a consulta para o backend, dando uma resposta, que pode demorar
      CidadesService.getAll(1, busca)
        // Quando retornar
        // Pega o result
        .then((result) => {
          setIsLoading(false);

          // Mostrar na tela
          // Se for uma instancia de Erro. Deu erro na hora de consultar os registros no BD?
          if (result instanceof Error) {
            // Result é só erro
            // alert(result.message);
          } else {
            // Result é só cidades com total count
            console.log(result);

            setOpcoes(
              result.data.map(
                // Transformar uma lista de cidades em uma lista de linhas nas tabelas
                (cidade) => ({
                  id: cidade.id,
                  // Transformar nome em label
                  label: cidade.nome,
                })
              )
            );
          }
        });
    });
  }, [busca]);

  // Guardar a opção selecionada
  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return undefined;

    // Se tem, buscar a opção selecionada
    const selectedOption = opcoes
      // Encontrar a opção selecionada pelo id selecionado
      .find((opcao) => opcao.id === selectedId);

    return selectedOption;
  }, [selectedId, opcoes]);

  return (
    <Autocomplete
      // Texto do icone de abrir
      openText="Abrir"
      // Texto do icone de fechar
      closeText="Fechar"
      // Sem opções
      noOptionsText="Nenhuma opção"
      // Texto de carregamento
      loadingText="Carregando..."
      // Popup com lista de opções (o texto fica no input)
      disablePortal
      // Dizer qual opção está selecionada
      value={autoCompleteSelectedOption}
      loading={isLoading}
      disabled={isExternalLoading}
      // Icone para o autocomplete
      popupIcon={
        isExternalLoading || isLoading ? (
          <CircularProgress size={28} />
        ) : undefined
      }
      // Quando o texto da input mudar
      onInputChange={(_, newValue) => {
        setBusca(newValue);
      }}
      options={opcoes}
      // Guardar o valor que for selecionado (state)
      onChange={(_, newValue) => {
        setSelectedId(newValue?.id);
        // Ao selecionar, limpar o campo e deixar que pesquisa seja feita novamente. E ao clicar fora da opção, manter selecionado
        setBusca("");
      }}
      // O TextField
      renderInput={(params) => (
        <TextField
          {...params}
          // Texto que vai aparecer no campo
          label="Cidade"
        />
      )}
    />
  );
};
