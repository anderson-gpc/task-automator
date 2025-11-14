import { Typography, Card } from "antd";

const { Paragraph, Link, Title } = Typography;

export const InfoContent = (
  <Typography style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <Paragraph>
      Para utilizar todas as funcionalidades, é necessário inserir e salvar seu
      token de acesso pessoal do GitHub. Ele é utilizado para integrar com a API
      e habilitar recursos avançados.
    </Paragraph>

    <Paragraph>
      Todas as suas informações são totalmente asseguradas e tratadas de forma
      criptografada, garantindo sua privacidade e segurança.
    </Paragraph>

    <Card size="small">
      <Title level={5} style={{ margin: 0 }}>Gerenciar tokens</Title>
      <Paragraph style={{ marginTop: 8 }}>
        <Link
          href="https://docs.github.com/pt/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens"
          target="_blank"
        >
          Documentação oficial do GitHub
        </Link>
      </Paragraph>
    </Card>

    <Card size="small">
      <Title level={5} style={{ margin: 0 }}>Criar novo token</Title>
      <Paragraph style={{ marginTop: 8 }}>
        <Link
          href="https://github.com/settings/personal-access-tokens"
          target="_blank"
        >
          Página de criação de token
        </Link>
      </Paragraph>
    </Card>
  </Typography>
);
