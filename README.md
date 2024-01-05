## 開発環境構築

### 1. Styled-Components の設定

- CSS-in-JS のライブラリである styled-components をインストールし、next.config.js で有効化する。<br>
  `npm install styled-components`<br>
  `npm install --save-dev @types/styled-components `

```javascript
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // styledComponentsの有効化
    styledComponents: true,
  },
};

module.exports = nextConfig;
```

- pages/\_document.tsx を以下のように記述することで、SSR でも styled-components が動作する

### 2. ESlintの設定

- Eslint（リンター）、Prettier（フォーマッター）、その他プラグインをインストールする

  - typescript-eslint
  - @typescript-eslint/eslint-plugin
  - @typescript-eslint/parser
  - eslint-prettier
  - eslint-plugin-react
  - eslint-plugin-react-hooks
  - eslint-plugin-import<br>

  `npm install --save-dev prettier eslint typescript-eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-import`

- .eslintrc.jsonで個別にルールを設定する

### 3. Storybook

- Storybookをインストールする<br>
  `npx sb init`
- その他のプラグイン等のライブラリをインストールする<br>
  `npm install --save-dev @storybook/addon-postcss tsconfig-paths-webpack-plugin @babel/plugin-proposal-class-properties @babel/plugin-proposal-private-methods @babel/plugin-proposal-private-property-in-object tsconfig-paths-webpack-plugin @mdx-js/react`
- storybookに対してアセットを配置するために`.storybook/public`を作成する
  `mkdir .storybook/public`

### 4. React Hook Formの導入

- React Hook Formはフォームバリデーションライブラリ
- useFormフック
- register関数、handleSubmit関数、errorsオブジェクトを返す
- register関数：フォームの`<input>`・`<select>`にフックを登録して、状態を管理下に置くことができる
- handleSubmit関数：フォームのonSubmitのイベントハンドラを登録するために使用
- errorsオブジェクト：どの要素にバリデーションエラーが発生しているかを検知するために使用

- react-hook-formのインストール方法
  `npm install react-hook-form`

- コード例

```typescript
import { useForm, SubmitHandler } from 'react-hook-form';

type MyFormData = {
  firstName: string;
  lastName: string;
  category: string;
};

export default function App() {
  const { register, handleSubmit, formState: { errors }, } = useForm<MyFormData>();
  const onSubmit: SubmitHandler<MyFormData> = (data) => {
    console.log(data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName', { required: true })} placeholder="名前" />
      {errors.firstName && <div>名前を入力してください</div>}
      <input {...register('lastName', { required: true })} placeholder="名字" />
      {errors.lastName && <div>名字を入力してください</div>}
      <select {...register('category', { required: true })}>
        <option value="">選択...</option>
        <option value="A">カテゴリA</option>
        <option value="B">カテゴリB</option>
      </select>
      {errors.category && <div>カテゴリを選択してください</div>}
      <input type="submit" />
    </form>
  )
}


```

### 5. SWRの導入

- Vercel社が開発している、データ取得のためのReactHooksライブラリ
- データ取得を効率化でき、コンポーネントはデータの更新を継続的かつ自動的に受け取ることができる
- 特徴
  　- 取得したデータのキャッシュ化
  - 定期的なデータポーリング
  - キャッシュとリクエストの重複排除
  - 画面フォーカス時の再度データの更新
  - ネットワーク回復時の再度データの更新
  - エラーの再試行
  - ページネーションとスクロールポジションの回復
  - React Suspense
- SWRの使用例
- dataにはAPIのレスポンス、errorにはAPIリクエストが失敗したときに値が入るようになっている

```typescript
import useSWR from 'swr';

type User = {
  name: string;
}

const Profile = () => {
  const { data, error } = useSWR<User>('/api/user', fetcher);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>Hello {data.name}!</div>
}

```

### React Content Loaderの導入

- React Content Loaderはローディングのためのプレースホルダーを簡単に作成できるライブラリ
- 以下のコマンドでインストール
  `npm install react-content-loader`<br>
  `npm install --save-dev @types/react-content-loader`

```typescript
import ContentLoader from 'react-content-loader';

const MyLoader = () => (
  <ContentLoader viewBox="0 0 380 70">
    <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
  </ContentLoader>
)
```

### Material Iconsの導入

`npm install @mui/material @mui/icons-material @emotion/react @emotion/styled`

```typescript
import HomeIcon from '@mui/icons-material/Home';

type HomeIconProps = {
  fontSize?: string;
  color?: string;
};

const HomeIconComponent = ({ fontSize, color }: HomeIconProps) => (
  <span style={{ fontSize, color }}>
    <HomeIcon fontSize="inherit" color="inherit" />
  </span>
);

export function HomeIcons() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <HomeIconComponent />
      <HomeIconComponent fontSize="22px" />
      <HomeIconComponent fontSize="33px" />
      <HomeIconComponent color="red" />
      <HomeIconComponent fontSize="22px" color="#3f51b5" />
    </div>
  )
}
```

### 環境変数

- .envファイルにJSON ServerのベースURL、Next.jsのURL Rewrite機能で使用する変数を記述

### テスト環境構築

- ライブラリをインストール
  `npm install --save-dev @testing-library/jest-dom @testing-library/react jest jest-environment-jsdom`
- jest.setup.jsとjest.config.jsをプロジェクトルートに追加

### JSON Serverの設定

- REST APIのダミーエンドポイントを作成するためのツール

## 実装

### APIクライアントの関数

- 認証API
  - 第一引数のcontextはAPIのルートURLを指定する。ルートURLを固定しない理由は静的サイト生成時のリクエストとクライアントサイドからのリクエストを分けるため。
  - 第二引数のparamsはユーザ名とパスワードを受け取る。リクエストが成功した際はレスポンスヘッダのSet-Cookieにトークンが設定されているので、これを利用して認証する。

### 開発環境のためのAPIプロキシ

- オリジン間リソース共有でのCookie送信を避けるために、Next.jsのRewrites機能を使用してプロキシの設定をする。Next.jsのエンドポイントにリクエストを送信すると、json-serverのエンドポイントに変換されてリクエストが送信される。
- `http://nextjs`のホスト`/api/proxy/signin`とリクエストを送った場合、`http://json-server`のホスト`/signin`と変換される
