// src/app/utils/index.ts
import { news } from "@/app/types";

export const removeDuplicateData = (articles: any) => {
  const randomArticle: news[] = articles?.articles;
  const filterArticles = randomArticle.filter(
    (article) => article?.source.id !== null
  );
  return filterArticles;
};
