import React, { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";
import { Box, List } from "@mui/material";
import ListItem from "@mui/material/ListItem";

const ListaServicos = () => {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await fetch("http://localhost:3001/my_services");
        if (!response.ok) {
          throw new Error("Erro ao buscar os serviços");
        }
        const data = await response.json();
        setServicos(data);
        setLoading(false);
      } catch (error) {
        setErro(error.message);
        setLoading(false);
      }
    };

    fetchServicos();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <Box>
      <h1>Servicos disponiveis</h1>
      <List>
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {servicos.map((servico) => (
            <ServiceCard
              key={servico.cod_service}
              titulo={servico.service_name}
              description={servico.service_description}
              price={servico.service_price}
              image={servico.image_url}
              tipo={servico.service_type}
            />
          ))}
        </ListItem>
      </List>
    </Box>
  );
};

export default ListaServicos;
