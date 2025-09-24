# APP GymPass2

GymPass2 Style app

## RFs (Requisitos Funcionais)

- [ ] **#01** Deve ser possível se cadastrar ;
- [ ] **#02** Deve ser possível se autenticar;
- [ ] **#03** Deve ser possível obter o perfil de um usuário logado;
- [ ] **#04** Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] **#05** Deve ser possível o usuário obter seu historico de check-ins;
- [ ] **#06** Deve ser possível o usuário buscar academias próximas;
- [ ] **#07** Deve ser possível o usuário buscar academias pelo nome;
- [ ] **#08** Deve ser possível o usuário realizar check-in em uma academia;
- [ ] **#09** Deve ser possível validar o check-in de um usário;
- [ ] **#10** Deve ser possível cadastrar uma academia;

## RNs (Regras de Negocios)

- [ ] O usuã́rio não deve poder se cadastrar com e-mail duplicado;
- [ ] O usuário deve conseguir se cadastrar com o gmail;
- [ ] O usuário não deve conseguir fazer 2+ check-ins no mesmo dia;
- [ ] O usuário não deve conseguir fazer check-in a +100m da academia;
- [ ] O check-in só pode ser válidado em até 20min após criado;
- [ ] O check-in só pode ser válidade por administradores;
- [ ] A academia só pode ser cadastrada por aministradores;

## RNFs (Requisitos Não Funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em PostgreeSQL;
- [ ] Todas as listas de dados precisam ser páginadas, com padrão de 20 items por página;
- [ ] O usuário deve ser identificado por um JWT

## Anotação

- Criar perfil para cada academia igual um blog, com feed e tudo mais
