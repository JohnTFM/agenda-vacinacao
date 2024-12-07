import React from "react";
import { validateRequired } from "./utils";
import {
  useCreateAgendamento,
  useUpdateAgendamento,
  useDeleteAgendamento,
  useGetAgendamentos,
  useGetVacinas,
  useGetUsuarios,
} from "./api";
import GenericTable from "./GenericTable";

const AgendamentoTable = () => {
  const [validationErrors, setValidationErrors] = React.useState({});

  const { data: fetchedVacinas = [] } = useGetVacinas();
  const { data: fetchedUsuarios = [] } = useGetUsuarios();
  const {
    data: fetchedAgendamentos = [],
    isError: isLoadingAgendamentosError,
    isFetching: isFetchingAgendamentos,
    isLoading: isLoadingAgendamentos,
    refetch: refetchAgendamentos,
  } = useGetAgendamentos();

  const agendamentoColumns = React.useMemo(
    () => [
      { accessorKey: "id", header: "ID", size: 80, enableEditing: false },
      {
        accessorKey: "data",
        header: "Data",
        muiEditTextFieldProps: {
          type: "date",
          error: !!validationErrors?.data,
          helperText: validationErrors?.data,
        },
      },
      {
        accessorKey: "hora",
        header: "Hora",
        muiEditTextFieldProps: {
          type: "time",
          error: !!validationErrors?.hora,
          helperText: validationErrors?.hora,
        },
      },
      {
        accessorKey: "situacao",
        header: "Situação",
        editVariant: "select",
        editSelectOptions: [
          { label: "Agendado", value: "AGENDADA" },
          { label: "Realizado", value: "REALIZADO" },
          { label: "Cancelado", value: "CANCELADO" },
        ],
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.situacao,
          helperText: validationErrors?.situacao,
        },
      },
      {
        accessorKey: "observacoes",
        header: "Observações",
        muiEditTextFieldProps: {
          error: !!validationErrors?.observacoes,
          helperText: validationErrors?.observacoes,
        },
      },
      {
        accessorKey: "vacina",
        header: "Vacina",
        editVariant: "select",
        editSelectOptions: fetchedVacinas.map((vacina) => ({
          label: vacina.titulo,
          value: vacina.id,
        })),
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.vacina,
          helperText: validationErrors?.vacina,
        },
        Cell: ({ cell }) => {
          const cellValue = cell.getValue();
          const vacina = fetchedVacinas.find(
            (vacina) => vacina.id === cellValue.id
          );
          return vacina ? vacina.titulo : "";
        },
      },
      {
        accessorKey: "usuario",
        header: "Usuário",
        editVariant: "select",
        editSelectOptions: fetchedUsuarios.map((usuario) => ({
          label: usuario.nome,
          value: usuario.id,
        })),
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.usuario,
          helperText: validationErrors?.usuario,
        },
        Cell: ({ cell }) => {
          const cellValue = cell.getValue();
          console.log(cellValue);
          const usuario = fetchedUsuarios.find(
            (usuario) => usuario.id === cellValue.id
          );
          return usuario ? usuario.nome : ""; // Aqui você deve renderizar o nome do usuário
        },
      },
    ],
    [validationErrors, fetchedUsuarios, fetchedVacinas]
  );

  const {
    mutateAsync: createAgendamento,
    isPending: isCreatingAgendamento,
    isError: isCreatingAgendamentoError,
  } = useCreateAgendamento();

  const {
    mutateAsync: updateAgendamento,
    isPending: isUpdatingAgendamento,
    isError: isUpdatingAgendamentoError,
  } = useUpdateAgendamento();

  const {
    mutateAsync: deleteAgendamento,
    isPending: isDeletingAgendamento,
    isError: isDeletingAgendamentoError,
  } = useDeleteAgendamento();

  const hasAsyncError =
    isDeletingAgendamentoError ||
    isUpdatingAgendamentoError ||
    isLoadingAgendamentosError ||
    isCreatingAgendamentoError;

  const handleCreateAgendamento = async ({ values, table }) => {
    const newValidationErrors = validateAgendamento(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createAgendamento(values);
    table.setCreatingRow(null);
  };

  const handleSaveAgendamento = async ({ values, table }) => {
    const newValidationErrors = validateAgendamento(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateAgendamento(values);
    table.setEditingRow(null);
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Tem certeza que deseja excluir este agendamento?")) {
      deleteAgendamento(row.original.id);
    }
  };

  function validateAgendamento(agendamento) {
    return {
      data: !validateRequired(agendamento.data) ? "Data é obrigatória" : "",
      hora: !validateRequired(agendamento.hora) ? "Hora é obrigatória" : "",
      situacao: !validateRequired(agendamento.situacao)
        ? "Situação é obrigatória"
        : "",
      vacina: !validateRequired(agendamento.vacina)
        ? "Vacina é obrigatória"
        : "",
      usuario: !validateRequired(agendamento.usuario)
        ? "Usuário é obrigatório"
        : "",
    };
  }

  return (
    <GenericTable
      entityName="Agendamento"
      columns={agendamentoColumns}
      data={fetchedAgendamentos}
      isLoading={isLoadingAgendamentos}
      isSaving={
        isCreatingAgendamento || isUpdatingAgendamento || isDeletingAgendamento
      }
      showAlertBanner={hasAsyncError}
      createRowHandler={handleCreateAgendamento}
      saveRowHandler={handleSaveAgendamento}
      cancelRowHandler={() => setValidationErrors({})}
      deleteRowHandler={openDeleteConfirmModal}
      refetchDataHandler={refetchAgendamentos}
      isFetching={isFetchingAgendamentos}
    />
  );
};

export default AgendamentoTable;
