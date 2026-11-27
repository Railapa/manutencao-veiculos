export type Vehicle = {
  id: number,
  marca: string,
  modelo: string,
  ano: number | null,
  km_atual: number | null
}

export type Maintenance = {
  id: number,
  veiculo_id: number,
  servico: string,
  data_servico: string,
  km: number | null,
  custo: number | null
}