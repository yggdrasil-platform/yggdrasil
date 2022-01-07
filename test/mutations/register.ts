const register: string = `
  mutation($input: RegisterInput!) {
    register(input: $input) {
      accessToken
    }
  }
`;

export default register;
