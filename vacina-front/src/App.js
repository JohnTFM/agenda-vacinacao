import React from "react";
import { Tabs, Tab, Box, Container, AppBar } from "@mui/material";

import AlergiaTable from "./AlergiaTable";
import UsuarioTable from "./UsuarioTable";
import AgendamentoTable from "./AgendamentoTable";
import VacinaTable from "./VacinaTable";

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="menu de abas"
          textColor="secondary"
          indicatorColor="secondary"
          variant="fullWidth"
        >
          <Tab label="Alergia" />
          <Tab label="Usuário" />
          <Tab label="Vacina" />
          <Tab label="Agendamento" />
        </Tabs>
      </AppBar>
      <Box sx={{ paddingTop: 6 }}>
        {value === 0 && <AlergiaTable />}
        {value === 1 && <UsuarioTable />}
        {value === 2 && <VacinaTable />}
        {value === 3 && <AgendamentoTable />}
      </Box>
    </Container>
  );
}

export default App;
