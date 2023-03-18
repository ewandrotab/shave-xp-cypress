///  <reference types="cypress"/>

import loginPage from "../support/pages/login";
import shaversPage from "../support/pages/shavers";
describe("Login", () => {
  context("Quando submeto o formulário", () => {
    it("Deve logar com sucesso", () => {
      const user = {
        name: "Ewandro",
        email: "ewandro@gmail.com",
        password: "pwd123",
      };

      loginPage.acessar();
      loginPage.preencherFormulario(user);
      loginPage.submeterFormulario();

      shaversPage.header.validaUsuarioLogado(user.name);
    });

    it("Não deve logar com a senha incorreta", () => {
      const user = {
        name: "Ewandro",
        email: "ewandro@gmail.com",
        password: "abc123",
      };

      const message =
        "Ocorreu um erro ao fazer login, verifique suas credenciais.";

      loginPage.acessar();
      loginPage.preencherFormulario(user);
      loginPage.submeterFormulario();

      loginPage.mensagemAlertaLogin(message);
    });

    it("Não deve logar com usuário inexistente", () => {
      const user = {
        name: "Ewandro",
        email: "ewandro404@gmail.com",
        password: "pwd123",
      };

      const message =
        "Ocorreu um erro ao fazer login, verifique suas credenciais.";

      loginPage.acessar();
      loginPage.preencherFormulario(user);
      loginPage.submeterFormulario();

      loginPage.mensagemAlertaLogin(message);
    });
  });

  context("Campos Obrigatórios", () => {
    it("E-mail é obrigatório", () => {
      const user = {
        password: "pwd123",
      };
      loginPage.acessar();
      loginPage.preencherFormulario(user);
      loginPage.submeterFormulario();

      loginPage.mensagemAlertaCampo("E-mail é obrigatório");
    });

    it("Senha é obrigatória", () => {
      const user = {
        email: "ewandro@gmail.com",
      };
      loginPage.acessar();
      loginPage.preencherFormulario(user);
      loginPage.submeterFormulario();

      loginPage.mensagemAlertaCampo("Senha é obrigatória");
    });
  });

  context("Senha muita curta", () => {
    const passwords = [1, 12, 123, 1234, 12345];
    passwords.forEach((pass) => {
      const user = {
        email: "ewandro@gmail.com",
        password: pass,
      };
      it(`Não deve logar com a senha: ${pass}`, () => {
        loginPage.acessar();
        loginPage.preencherFormulario(user);
        loginPage.submeterFormulario();
        loginPage.mensagemAlertaCampo("Pelo menos 6 caracteres");
      });
    });
  });

  context("E-mail no formato incorreto", () => {
    const emails = [
      "ewandro&gmail.com",
      "ewandro.com.br",
      "@gmail.com",
      "@",
      "ewandro@",
      "123456",
      "@$%@#$%@#",
      "xpto123",
    ];
    emails.forEach((email) => {
      const user = {
        email: email,
        password: "pwd123",
      };
      it(`Não deve logar com a senha: ${email}`, () => {
        loginPage.acessar();
        loginPage.preencherFormulario(user);
        loginPage.submeterFormulario();
        loginPage.mensagemAlertaCampo("Informe um email válido");
      });
    });
  });
});
