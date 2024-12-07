

import React from "react";

import { validateRequired } from "./utils";
import {
  useCreateAlergia,
  useUpdateAlergia,
  useDeleteAlergia,
  useGetAlergias,
} from "./api";
import GenericTable from "./GenericTable";

const AlergiaTable = () => {
  const [validationErrors, setValidationErrors] = React.useState({});

  const alergiaColumns = React.useMemo(
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
        accessorKey: "descricao",
        header: "Descrição",
        muiEditTextFieldProps: {
          error: !!validationErrors?.descricao,
          helperText: validationErrors?.descricao,
        },
      },
    ],
    [validationErrors]
  );

  const {
    mutateAsync: createAlergia,
    isPending: isCreatingAlergia,
    isError: isCreatingAlergiaError,
  } = useCreateAlergia();

  const {
    data: fetchedAlergias = [],
    isError: isLoadingAlergiasError,
    isFetching: isFetchingAlergias,
    isLoading: isLoadingAlergias,
    refetch: refetchAlergias,
  } = useGetAlergias();

  const {
    mutateAsync: updateAlergia,
    isPending: isUpdatingAlergia,
    isError: isUpdatingAlergiaError,
  } = useUpdateAlergia();

  const {
    mutateAsync: deleteAlergia,
    isPending: isDeletingAlergia,
    isError: isDeletingAlergiasError,
  } = useDeleteAlergia();

  const hasAsyncError =
    isDeletingAlergiasError ||
    isUpdatingAlergiaError ||
    isLoadingAlergiasError ||
    isCreatingAlergiaError;

  const handleCreateAlergia = async ({ values, table }) => {
    const newValidationErrors = validateAlergia(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createAlergia(values);
    table.setCreatingRow(null);
  };

  const handleSaveAlergia = async ({ values, table }) => {
    const newValidationErrors = validateAlergia(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateAlergia(values);
    table.setEditingRow(null);
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Tem certeza que deseja excluir esta alergia?")) {
      deleteAlergia(row.original.id);
    }
  };

  function validateAlergia(alergia) {
    return {
      nome: !validateRequired(alergia.nome) ? "Nome é obrigatório" : "",
      descricao: !validateRequired(alergia.descricao)
        ? "Descrição é obrigatória"
        : "",
    };
  }

  return (
    <GenericTable
      entityName="Alergia"
      columns={alergiaColumns}
      data={fetchedAlergias}
      isLoading={isLoadingAlergias}
      isSaving={isCreatingAlergia || isUpdatingAlergia || isDeletingAlergia}
      showAlertBanner={hasAsyncError}
      createRowHandler={handleCreateAlergia}
      saveRowHandler={handleSaveAlergia}
      cancelRowHandler={() => setValidationErrors({})}
      deleteRowHandler={openDeleteConfirmModal}
      refetchDataHandler={refetchAlergias}
      isFetching={isFetchingAlergias}
    />
  );
};

export default AlergiaTable;