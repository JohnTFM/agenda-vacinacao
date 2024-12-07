import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function sleep(ms = 100) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const api = axios.create({
  baseURL: "http://localhost:8080/api/",
});

// CRUD Alergias

export function useGetAlergias() {
  return useQuery({
    queryKey: ["alergias"],
    queryFn: async () => {
      const response = await api.get("/alergias");
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
}

export function useUpdateAlergia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (alergia) => {
      const response = await api.put(`alergias/${alergia.id}`, alergia);
      return response.data;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["alergias"] }),
  });
}

export function useDeleteAlergia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (alergiaId) => {
      await api.delete(`alergias/${alergiaId}`);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["alergias"] }),
  });
}

export function useCreateAlergia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (alergia) => {
      const response = await api.post("/alergias", alergia);
      return response.data;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["alergias"] }),
  });
}

// CRUD Usuarios

export function useGetUsuarios() {
  return useQuery({
    queryKey: ["usuarios"],
    queryFn: async () => {
      const response = await api.get("/usuarios");
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
}

export function useCreateUsuario() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (usuario) => {
      const formattedUsuario = {
        ...usuario,
        alergias: usuario.alergias ? [usuario.alergias] : undefined,
      };

      const response = await api.post("/usuarios", formattedUsuario);
      return response.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });
}

export function useUpdateUsuario() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (usuario) => {
      const formattedUsuario = {
        ...usuario,
        alergias: usuario.alergias ? [{ id: usuario.alergias }] : undefined,
      };
      const response = await api.put(
        `/usuarios/${usuario.id}`,
        formattedUsuario
      );
      return response.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });
}

export function useDeleteUsuario() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (usuarioId) => {
      await api.delete(`/usuarios/${usuarioId}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });
}

// Vacinas

export function useGetVacinas() {
  return useQuery({
    queryKey: ["vacinas"],
    queryFn: async () => {
      const response = await api.get("/vacinas");
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
}

export function useUpdateVacina() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (vacina) => {
      let body = vacina;
      const oneDose = Number(vacina.doses) === 1;

      if (oneDose) {
        body = { ...vacina, intervalo: null, periodicidade: null };
      }

      const response = await api.put(`/vacinas/${vacina.id}`, body);
      return response.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["vacinas"] });
    },
  });
}

export function useDeleteVacina() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (vacinaId) => {
      await api.delete(`/vacinas/${vacinaId}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["vacinas"] });
    },
  });
}

export function useCreateVacina() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (vacina) => {
      let body = vacina;
      const oneDose = Number(vacina.doses) === 1;

      if (oneDose) {
        body = { ...vacina, intervalo: null, periodicidade: null };
      }

      const response = await api.post("/vacinas", body);
      return response.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["vacinas"] });
    },
  });
}

export function useGetAgendamentos() {
  return useQuery({
    queryKey: ["agendas"],
    queryFn: async () => {
      const response = await api.get("/agendas");
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
}

export function useCreateAgendamento() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (agendamento) => {
      const body = {
        ...agendamento,
        usuario: { id: agendamento.usuario },
        vacina: { id: agendamento.vacina },
        dataSituacao: null,
      };
      const response = await api.post("/agendas", body);
      return response.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["agendas"] });
    },
  });
}

export function useUpdateAgendamento() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (agendamento) => {
      const body = {
        ...agendamento,
        usuario: { id: agendamento.usuario.id },
        vacina: { id: agendamento.vacina.id },
        dataSituacao: null,
      };
      const response = await api.put(`/agendas/${agendamento.id}`, body);
      return response.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["agendas"] });
    },
  });
}

export function useDeleteAgendamento() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (agendamentoId) => {
      await api.delete(`/agendas/${agendamentoId}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["agendas"] });
    },
  });
}
