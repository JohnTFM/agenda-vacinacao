import React from "react";
import { validateRequired } from "./utils";
import {
  useCreateVacina,
  useUpdateVacina,
  useDeleteVacina,
  useGetVacinas,
} from "./api";
import GenericTable from "./GenericTable";

const VacinaTable = () => {
  const [validationErrors, setValidationErrors] = React.useState({});
  const [dosesValue, setDosesValue] = React.useState(null); // Estado para armazenar o valor de doses

  const vacinaColumns = React.useMemo(
    () => [
      { accessorKey: "id", header: "ID", size: 80, enableEditing: false },
      {
        accessorKey: "titulo",
        header: "Título",
        muiEditTextFieldProps: {
          error: !!validationErrors?.titulo,
          helperText: validationErrors?.titulo,
        },
      },
      {
        accessorKey: "descricao",
        header: "Descrição",
        muiEditTextFieldProps: {
          error: !!validationErrors?.descricao,
          helperText: validationErrors?.descricao,
        },
      },
      {
        accessorKey: "doses",
        header: "Doses",
        muiEditTextFieldProps: {
          type: "number",
          error: !!validationErrors?.doses,
          helperText: validationErrors?.doses,
          onChange: (event) => {
            const newDosesValue = event.target.value;
            setDosesValue(newDosesValue);
          },
        },
      },
      {
        accessorKey: "periodicidade",
        header: "Periodicidade",
        editVariant: "select",
        defaultValue: null,
        editSelectOptions: [
          { label: "Dias", value: "DIARIA" },
          { label: "Semanas", value: "SEMANAL" },
          { label: "Meses", value: "MENSAL" },
          { label: "Anos", value: "ANUAL" },
        ],
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.periodicidade,
          helperText: validationErrors?.periodicidade,
          disabled: dosesValue <= 1,
        },
        Cell: ({ cell }) => {
          const value = cell.getValue();
          switch (value) {
            case "DIARIA":
              return "Dias";
            case "SEMANAL":
              return "Semanas";
            case "MENSAL":
              return "Meses";
            case "ANUAL":
              return "Anos";
            default:
              return "";
          }
        },
      },
      {
        accessorKey: "intervalo",
        header: "Intervalo",
        muiEditTextFieldProps: {
          type: "number",
          error: !!validationErrors?.intervalo,
          helperText: validationErrors?.intervalo,
          disabled: dosesValue <= 1,
        },
      },
    ],
    [dosesValue, validationErrors]
  );

  const {
    mutateAsync: createVacina,
    isPending: isCreatingVacina,
    isError: isCreatingVacinaError,
  } = useCreateVacina();

  const {
    data: fetchedVacinas = [],
    isError: isLoadingVacinasError,
    isFetching: isFetchingVacinas,
    isLoading: isLoadingVacinas,
    refetch: refetchVacinas,
  } = useGetVacinas();

  const {
    mutateAsync: updateVacina,
    isPending: isUpdatingVacina,
    isError: isUpdatingVacinaError,
  } = useUpdateVacina();

  const {
    mutateAsync: deleteVacina,
    isPending: isDeletingVacina,
    isError: isDeletingVacinaError,
  } = useDeleteVacina();

  const hasAsyncError =
    isDeletingVacinaError ||
    isUpdatingVacinaError ||
    isLoadingVacinasError ||
    isCreatingVacinaError;

  const handleCreateVacina = async ({ values, table }) => {
    const newValidationErrors = validateVacina(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createVacina(values);
    table.setCreatingRow(null);
  };

  const handleSaveVacina = async ({ values, table }) => {
    const newValidationErrors = validateVacina(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateVacina(values);
    table.setEditingRow(null);
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Tem certeza que deseja excluir esta vacina?")) {
      deleteVacina(row.original.id);
    }
  };

  function validateVacina(vacina) {
    const validationErrors = {
      titulo: !validateRequired(vacina.titulo) ? "Título é obrigatório" : "",
      descricao: !validateRequired(vacina.descricao)
        ? "Descrição é obrigatória"
        : "",
      doses:
        !validateRequired(vacina.doses) || vacina.doses <= 0
          ? "Doses é obrigatório e deve ser um número positivo"
          : "",
      periodicidade:
        vacina.doses > 1 && !validateRequired(vacina.periodicidade)
          ? "Periodicidade é obrigatória quando a vacina tem mais de uma dose"
          : "",
      intervalo:
        vacina.doses > 1 && !validateRequired(vacina.intervalo)
          ? "Intervalo é obrigatório quando a vacina tem mais de uma dose"
          : "",
    };

    return validationErrors;
  }

  return (
    <GenericTable
      entityName="Vacina"
      columns={vacinaColumns}
      data={fetchedVacinas}
      isLoading={isLoadingVacinas}
      isSaving={isCreatingVacina || isUpdatingVacina || isDeletingVacina}
      showAlertBanner={hasAsyncError}
      createRowHandler={handleCreateVacina}
      saveRowHandler={handleSaveVacina}
      cancelRowHandler={() => setValidationErrors({})}
      deleteRowHandler={openDeleteConfirmModal}
      refetchDataHandler={refetchVacinas}
      isFetching={isFetchingVacinas}
    />
  );
};

export default VacinaTable;
