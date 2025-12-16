import { NewsGrid, NewsListProps } from "./News.Grid";

export function Default({ fields, rendering, params, page }: NewsListProps) {
  return (
    <NewsGrid
      fields={fields}
      rendering={rendering}
      params={params}
      page={page}
    />
  );
}
