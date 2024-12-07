import React from "react";
import { estadosBrasil, validateRequired } from "./utils";
import {
  useCreateUsuario,
  useUpdateUsuario,
  useDeleteUsuario,
  useGetUsuarios,
  useGetAlergias,
} from "./api";
import GenericTable from "./GenericTable";

const UsuarioTable = () => {
  const [validationErrors, setValidationErrors] = React.useState({});
  const { data: fetchedAlergias = [] } = useGetAlergias();

  const usuarioColumns = React.useMemo(
    () => [
      { accessorKey: "id", header: "ID", size: 80, enableEditing: false },
      {
        accessorKey: "nome",
        header: "Nome",
        muiEditTextFieldProps: {
          error: !!validationErrors?.nome,
          helperText: validationErrors?.nome,
        },
      },
      {
        accessorKey: "dataNascimento",
        header: "Data de Nascimento",
        muiEditTextFieldProps: {
          type: "date",
          error: !!validationErrors?.dataNascimento,
          helperText: validationErrors?.dataNascimento,
        },
      },
      {
        accessorKey: "sexo",
        header: "Sexo",
        editVariant: "select",
        editSelectOptions: [
          { label: "Masculino", value: "M" },
          { label: "Feminino", value: "F" },
        ],
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.sexo,
          helperText: validationErrors?.sexo,
        },
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return value === "M" ? "Masculino" : value === "F" ? "Feminino" : "";
        },
      },
      {
        accessorKey: "logradouro",
        header: "Logradouro",
        muiEditTextFieldProps: {
          error: !!validationErrors?.logradouro,
          helperText: validationErrors?.logradouro,
        },
      },
      {
        accessorKey: "numero",
        header: "Número",
        muiEditTextFieldProps: {
          type: "number",
          error: !!validationErrors?.numero,
          helperText: validationErrors?.numero,
        },
      },
      {
        accessorKey: "setor",
        header: "Setor",
        muiEditTextFieldProps: {
          error: !!validationErrors?.setor,
          helperText: validationErrors?.setor,
        },
      },
      {
        accessorKey: "cidade",
        header: "Cidade",
        muiEditTextFieldProps: {
          error: !!validationErrors?.cidade,
          helperText: validationErrors?.cidade,
        },
      },
      {
        accessorKey: "uf",
        header: "UF",
        editVariant: "select",
        editSelectOptions: estadosBrasil,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.uf,
          helperText: validationErrors?.uf,
        },
      },
      {
        accessorKey: "alergias", // Nome do campo de alergia
        header: "Alergia",
        editVariant: "select",
        editSelectOptions: fetchedAlergias.map((alergia) => ({
          label: alergia.nome, // Ajuste o nome do campo conforme sua API
          value: alergia.id,
        })),
        Cell: ({ cell }) => {
          const alergiaId = cell.getValue();
          const alergia = fetchedAlergias.find((a) => a.id === alergiaId);
          return alergia ? alergia.nome : "Nenhuma alergia";
        },
      },
    ],
    [validationErrors, fetchedAlergias]
  );

  const {
    mutateAsync: createUsuario,
    isPending: isCreatingUsuario,
    isError: isCreatingUsuarioError,
  } = useCreateUsuario();

  const {
    data: fetchedUsuarios = [],
    isError: isLoadingUsuariosError,
    isFetching: isFetchingUsuarios,
    isLoading: isLoadingUsuarios,
    refetch: refetchUsuarios,
  } = useGetUsuarios();

  const {
    mutateAsync: updateUsuario,
    isPending: isUpdatingUsuario,
    isError: isUpdatingUsuarioError,
  } = useUpdateUsuario();

  const {
    mutateAsync: deleteUsuario,
    isPending: isDeletingUsuario,
    isError: isDeletingUsuarioError,
  } = useDeleteUsuario();

  const hasAsyncError =
    isDeletingUsuarioError ||
    isUpdatingUsuarioError ||
    isLoadingUsuariosError ||
    isCreatingUsuarioError;

  const handleCreateUsuario = async ({ values, table }) => {
    const newValidationErrors = validateUsuario(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUsuario(values);
    table.setCreatingRow(null);
  };

  const handleSaveUsuario = async ({ values, table }) => {
    const newValidationErrors = validateUsuario(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUsuario(values);
    table.setEditingRow(null);
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      deleteUsuario(row.original.id);
    }
  };

  function validateUsuario(usuario) {
    return {
      nome: !validateRequired(usuario.nome) ? "Nome é obrigatório" : "",
      dataNascimento: !validateRequired(usuario.dataNascimento)
        ? "Data de nascimento é obrigatória"
        : "",
      sexo: !validateRequired(usuario.sexo) ? "Sexo é obrigatório" : "",
      logradouro: !validateRequired(usuario.logradouro)
        ? "Logradouro é obrigatório"
        : "",
      numero: !validateRequired(usuario.numero) ? "Número é obrigatório" : "",
      setor: !validateRequired(usuario.setor) ? "Setor é obrigatório" : "",
      cidade: !validateRequired(usuario.cidade) ? "Cidade é obrigatória" : "",
      uf: !validateRequired(usuario.uf) ? "UF é obrigatória" : "",
    };
  }

  return (
    <GenericTable
      entityName="Usuário"
      columns={usuarioColumns}
      data={fetchedUsuarios}
      isLoading={isLoadingUsuarios}
      isSaving={isCreatingUsuario || isUpdatingUsuario || isDeletingUsuario}
      showAlertBanner={hasAsyncError}
      createRowHandler={handleCreateUsuario}
      saveRowHandler={handleSaveUsuario}
      cancelRowHandler={() => setValidationErrors({})}
      deleteRowHandler={openDeleteConfirmModal}
      refetchDataHandler={refetchUsuarios}
      isFetching={isFetchingUsuarios}
    />
  );
};

export default UsuarioTable;
