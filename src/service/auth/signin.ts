import { User, ApiContext } from "@/types/data";
import { fetcher } from "@/utils";

export type SigninParams = {
  /**
   * ユーザー名
   * サンプルのユーザー名は "user"
   */
  username: string;
  /**
   * パスワード
   * サンプルのパスワードは "password"
   */
  password: string;
};

/**
 * 認証API
 * @param context APIコンテキスト
 * @param params パラメータ
 * @returns ログインユーザー
 */
const signin = async (
  context: ApiContext,
  params: SigninParams
): Promise<User> => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, "")}/auth/signin`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }
  );
};

export default signin;
