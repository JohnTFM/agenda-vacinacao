import React from "react";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { MRT_Localization_PT_BR } from "material-react-table/locales/pt-BR";

const GenericTable = ({
  columns,
  data,
  isLoading,
  isSaving,
  showAlertBanner,
  createRowHandler,
  saveRowHandler,
  cancelRowHandler,
  isFetching,
  deleteRowHandler,
  refetchDataHandler,
  entityName,
}) => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      localization={MRT_Localization_PT_BR}
      createDisplayMode="row"
      editDisplayMode="row"
      enableEditing={true}
      getRowId={(row) => row.id}
      muiToolbarAlertBannerProps={
        showAlertBanner
          ? {
              color: "error",
              children: "Ocorreu um erro, tente novamente mais tarde",
            }
          : undefined
      }
      muiTableContainerProps={{
        sx: {
          minHeight: "500px",
        },
      }}
      onCreatingRowCancel={cancelRowHandler}
      onCreatingRowSave={createRowHandler}
      onEditingRowCancel={cancelRowHandler}
      onEditingRowSave={saveRowHandler}
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Tooltip title="Editar">
            <IconButton onClick={() => table.setEditingRow(row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Deletar">
            <IconButton color="error" onClick={() => deleteRowHandler(row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      renderTopToolbarCustomActions={({ table }) => (
        <Box sx={{ display: "flex", gap: "1rem", p: "4px" }}>
          <Button
            variant="contained"
            onClick={() => table.setCreatingRow(true)}
          >
            Adicionar {entityName}
          </Button>
          <Tooltip arrow title="Recarregar dados">
            <IconButton onClick={refetchDataHandler}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      state={{
        isLoading: isLoading,
        isSaving: isSaving,
        showAlertBanner: showAlertBanner,
        showProgressBars: isFetching,
      }}
      initialState={{
        sorting: [
          {
            id: "id",
            desc: false,
          },
        ],
      }}
    />
  );
};

export default GenericTable;
