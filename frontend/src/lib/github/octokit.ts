"use server";

import { Octokit } from "@octokit/rest";

enum RequestTypes {
  Verify = 0,
  Followers = 1,
  Following = 2,
  DeleteFollowing = 3,
  Issues = 4,
}

export const octokitClient = async (
  request: RequestTypes,
  token: string,
  login: string,
  userDelete?: string
): Promise<any> => {
  try {
    let query: string = "";

    switch (request) {
      case RequestTypes.Verify:
        query = `GET /user`;
        break;
      case RequestTypes.Followers:
        query = `GET /users/${login}/followers`;
        break;
      case RequestTypes.Following:
        query = `GET /users/${login}/following`;
        break;
      case RequestTypes.DeleteFollowing:
        if (!userDelete) throw new Error("userDelete requirido");
        query = `DELETE /user/following/${userDelete}`;
        break;
      case RequestTypes.Issues:
        query = `GET /user/issues`;
        break;
      default:
        throw new Error("Request type desconhecido");
    }

    return await new Octokit({ auth: token }).request(query);
  } catch (error: any) {
    let message = "Erro desconhecido";

    if (error instanceof Error) {
      message = error.stack?.split("\n")[0] || error.message;
    }

    console.warn(message);
    return null;
  }
};
